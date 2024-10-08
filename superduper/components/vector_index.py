import dataclasses as dc
import itertools
import typing as t

import numpy as np
import tqdm
from overrides import override

from superduper import CFG, logging
from superduper.backends.base.query import Query
from superduper.base.datalayer import Datalayer, DBEvent
from superduper.base.document import Document
from superduper.base.event import Event
from superduper.components.component import Component
from superduper.components.datatype import DataType
from superduper.components.listener import Listener
from superduper.components.model import Mapping, ModelInputType
from superduper.ext.utils import str_shape
from superduper.jobs.job import FunctionJob
from superduper.misc.annotations import component
from superduper.misc.special_dicts import MongoStyleDict
from superduper.vector_search.base import VectorIndexMeasureType, VectorItem
from superduper.vector_search.update_tasks import copy_vectors, delete_vectors

KeyType = t.Union[str, t.List, t.Dict]

T = t.TypeVar('T')


def ibatch(iterable: t.Iterable[T], batch_size: int) -> t.Iterator[t.List[T]]:
    """Batch an iterable into chunks of size `batch_size`.

    :param iterable: the iterable to batch
    :param batch_size: the number of groups to write
    """
    iterator = iter(iterable)
    while True:
        batch = list(itertools.islice(iterator, batch_size))
        if not batch:
            break
        yield batch


def backfill_vector_search(db, vi, searcher):
    """
    Backfill vector search from model outputs of a given vector index.

    :param db: Datalayer instance.
    :param vi: Identifier of vector index.
    :param searcher: FastVectorSearch instance to load model outputs as vectors.
    """
    from superduper.components.datatype import _BaseEncodable

    logging.info(f"Loading vectors of vector-index: '{vi.identifier}'")

    if vi.indexing_listener.select is None:
        raise ValueError('.select must be set')

    outputs_key = vi.indexing_listener.outputs
    query = db[outputs_key].select()

    logging.info(str(query))
    id_field = '_source'

    progress = tqdm.tqdm(desc='Loading vectors into vector-table...')
    notfound = 0
    found = 0
    for record_batch in ibatch(
        db.execute(query),
        CFG.cluster.vector_search.backfill_batch_size,
    ):
        items = []
        for record in record_batch:
            id = record[id_field]
            assert not isinstance(vi.indexing_listener.model, str)
            try:
                h = record[outputs_key]
            except KeyError:
                notfound += 1
                continue
            else:
                found += 1
            if isinstance(h, _BaseEncodable):
                h = h.unpack()
            items.append(VectorItem.create(id=str(id), vector=h))
        if items:
            searcher.add(items)
        progress.update(len(items))

    if notfound:
        logging.warn(
            f'{notfound} document/rows were missing outputs ',
            'key hence skipping vector loading for those.',
        )

    searcher.post_create()
    logging.info(f'Loaded {found} vectors into vector index succesfully')


class VectorIndex(Component):
    """
    A component carrying the information to apply a vector index.

    :param indexing_listener: Listener which is applied to created vectors
    :param compatible_listener: Listener which is applied to vectors to be compared
    :param measure: Measure to use for comparison
    :param metric_values: Metric values for this index
    """

    type_id: t.ClassVar[str] = 'vector_index'

    indexing_listener: Listener
    compatible_listener: t.Optional[Listener] = None
    measure: VectorIndexMeasureType = VectorIndexMeasureType.cosine
    metric_values: t.Optional[t.Dict] = dc.field(default_factory=dict)

    @override
    def on_load(self, db: Datalayer) -> None:
        """
        On load hook to perform indexing and compatible listenernd compatible listener.

        Automatically loads the listeners if they are not already loaded.

        :param db: A DataLayer instance
        """
        if isinstance(self.indexing_listener, str):
            self.indexing_listener = t.cast(
                Listener, db.load('listener', self.indexing_listener)
            )

        if isinstance(self.compatible_listener, str):
            self.compatible_listener = t.cast(
                Listener, db.load('listener', self.compatible_listener)
            )

        # Backfill vectors into vi
        searcher = db.fast_vector_searchers[self]
        if not searcher.is_initialized():
            backfill_vector_search(db, self, searcher=searcher.searcher)
            searcher.initialize()

    def __hash__(self):
        return hash((self.type_id, self.identifier))

    def __eq__(self, other: Component):
        if isinstance(other, Component):
            return (
                self.identifier == other.identifier and self.type_id and other.type_id
            )
        return False

    def get_vector(
        self,
        like: Document,
        models: t.List[str],
        keys: KeyType,
        db: t.Any = None,
        outputs: t.Optional[t.Dict] = None,
    ):
        """Peform vector search.

        Perform vector search with query `like` from outputs in db
        on `self.identifier` vector index.

        :param like: The document to compare against
        :param models: List of models to retrieve outputs
        :param keys: Keys available to retrieve outputs of model
        :param db: A datalayer instance.
        :param outputs: (optional) update `like` with outputs

        """
        document = MongoStyleDict(like.unpack())
        if outputs is not None:
            document.update(outputs)
            assert not isinstance(self.indexing_listener, str)
        available_keys = list(document.keys())

        key: t.Optional[t.Any] = None
        model_name: t.Optional[str] = None
        for m, k in zip(models, keys):
            if isinstance(k, str):
                if k in available_keys:
                    model_name, key = m, k
            elif isinstance(k, (tuple, list)):
                if all([i in available_keys for i in list(k)]):
                    model_name, key = m, k
            elif isinstance(k, dict):
                if all([i in available_keys for i in k.values()]):
                    model_name, key = m, k

        if not key:
            try:
                assert isinstance(keys, list)
                kix = keys.index('_base')
                model_name, key = models[kix], keys[kix]
            except ValueError:
                raise Exception(
                    f'Keys in provided {like} don\'t match'
                    f'VectorIndex keys: {keys}, with model: {models}'
                )

        model = db.models[model_name]
        data = Mapping(key, model.signature)(document)
        args, kwargs = model.handle_input_type(data, model.signature)
        return (
            model.predict(*args, **kwargs),
            model.identifier,
            key,
        )

    def get_nearest(
        self,
        like: Document,
        db: t.Any,
        id_field: str = '_id',
        outputs: t.Optional[t.Dict] = None,
        ids: t.Optional[t.Sequence[str]] = None,
        n: int = 100,
    ) -> t.Tuple[t.List[str], t.List[float]]:
        """Get nearest results in this vector index.

        Given a document, find the nearest results in this vector index, returned as
        two parallel lists of result IDs and scores.

        :param like: The document to compare against
        :param db: The datalayer to use
        :param id_field: Identifier field
        :param outputs: An optional dictionary
        :param ids: A list of ids to match
        :param n: Number of items to return
        """
        models, keys = self.models_keys
        if len(models) != len(keys):
            raise ValueError(f'len(model={models}) != len(keys={keys})')
        within_ids = ids or ()

        if isinstance(like, dict) and id_field in like:
            return db.fast_vector_searchers[self.identifier].find_nearest_from_id(
                str(like[id_field]), within_ids=within_ids, limit=n
            )
        h = self.get_vector(
            like=like,
            models=models,
            keys=keys,
            db=db,
            outputs=outputs,
        )[0]

        searcher = db.fast_vector_searchers[self.identifier]
        return searcher.find_nearest_from_array(h, within_ids=within_ids, n=n)

    def cleanup(self, db: Datalayer):
        """Clean up the vector index.

        :param db: The datalayer to cleanup
        """
        db.fast_vector_searchers[self.identifier].drop(db)

    @override
    def post_create(self, db: "Datalayer") -> None:
        """Post-create hook.

        :param db: Data layer instance.
        """
        db.compute.queue.declare_component(self)

    @property
    def models_keys(self) -> t.Tuple[t.List[str], t.List[ModelInputType]]:
        """Return a list of model and keys for each listener."""
        assert not isinstance(self.indexing_listener, str)
        assert not isinstance(self.compatible_listener, str)

        if self.compatible_listener:
            listeners = [self.indexing_listener, self.compatible_listener]
        else:
            listeners = [self.indexing_listener]

        models = [w.model.identifier for w in listeners]
        keys = [w.key for w in listeners]
        return models, keys

    @property
    def dimensions(self) -> int:
        """Get dimension for vector database.

        This dimension will be used to prepare vectors in the vector database.
        """
        assert not isinstance(self.indexing_listener, str)
        assert not isinstance(self.indexing_listener.model, str)
        if shape := getattr(self.indexing_listener.model.datatype, 'shape', None):
            return shape[-1]
        raise ValueError('Couldn\'t get shape of model outputs from model encoder')

    def trigger_ids(self, query: Query, primary_ids: t.Sequence):
        """Get trigger IDs.

        Only the ids returned by this function will trigger the vector_index.

        :param query: Query object.
        :param primary_ids: Primary IDs.
        """
        if not isinstance(self.indexing_listener.select, Query):
            return []

        if self.indexing_listener.outputs != query.table:
            return []

        select = self.db[self.indexing_listener.outputs]
        ids = self.db.databackend.check_ready_ids(
            select, [self.indexing_listener.outputs], primary_ids
        )
        return ids

    def _create_vector_sync_job(self, db, callable, deps, ids, job_id=None):
        job = FunctionJob(
            callable=callable,
            args=[],
            kwargs=dict(
                vector_index=self.identifier,
                ids=ids,
                query=db[self.indexing_listener.outputs].dict().encode(),
            ),
        )
        job(db=db, dependencies=deps)
        return [job]

    @override
    def run_jobs(
        self,
        db: Datalayer,
        dependencies: t.Sequence[str] = (),
        events: t.List = [],
        overwrite: bool = False,
        event_type: str = DBEvent.insert,
    ) -> t.Sequence[t.Any]:
        """Run jobs for the vector index.

        :param db: The DB instance to process
        :param dependencies: A list of dependencies
        :param events: List of events.
        :param event_type: Type of event.
        """
        if event_type in [DBEvent.insert, DBEvent.upsert]:
            callable = copy_vectors
        elif type == DBEvent.delete:
            callable = delete_vectors
        else:
            return []

        assert self.indexing_listener.select is not None

        dependencies = {*self.indexing_listener.model.jobs(db), *dependencies}

        component_events, db_events = Event.chunk_by_type(events)

        # Create a startup job
        jobs = []
        for event in component_events:
            jobs += [
                self._create_vector_sync_job(
                    db=db,
                    callable=callable,
                    ids=event.id,
                    deps=dependencies,
                    job_id=event.uuid,
                )
            ]

        # Create db events
        if not db_events:
            return jobs

        jobs += [
            self._create_vector_sync_job(
                db=db,
                callable=callable,
                ids=[event.id for event in db_events],
                deps=dependencies,
            )
        ]
        return jobs

    @override
    def schedule_jobs(
        self,
        db: Datalayer,
        dependencies: t.Sequence[str] = (),
    ) -> t.Sequence[t.Any]:
        """Schedule jobs for the vector index.

        :param db: The DB instance to process
        :param dependencies: A list of dependencies
        """
        assert self.indexing_listener.select is not None

        outputs = db[self.indexing_listener.outputs]
        ids = db.execute(outputs.select_ids)
        ids = [str(id[outputs.primary_id]) for id in ids]
        if not ids:
            return []

        event = Event(
            dest={'type_id': self.type_id, 'identifier': self.identifier},
            event_type=DBEvent.insert,
            id=ids,
            from_type='COMPONENT',
            dependencies=dependencies,
        )

        db.compute.broadcast([event])
        return [event.uuid]


class EncodeArray:
    """Class to encode an array.

    :param dtype: Datatype of array
    """

    def __init__(self, dtype):
        self.dtype = dtype

    def __call__(self, x, info: t.Optional[t.Dict] = None):
        """Encode an array.

        :param x: The array to encode
        :param info: Optional info
        """
        x = np.asarray(x)
        if x.dtype != self.dtype:
            raise TypeError(f'dtype was {x.dtype}, expected {self.dtype}')
        return memoryview(x).tobytes()


class DecodeArray:
    """Class to decode an array.

    :param dtype: Datatype of array
    """

    def __init__(self, dtype):
        self.dtype = dtype

    def __call__(self, bytes, info: t.Optional[t.Dict] = None):
        """Decode an array.

        :param bytes: The bytes to decode
        :param info: Optional info
        """
        return np.frombuffer(bytes, dtype=self.dtype).tolist()


@component(
    {'name': 'shape', 'type': 'int'},
    {'name': 'identifier', 'type': 'str'},
)
def vector(shape, identifier: t.Optional[str] = None):
    """Create an encoder for a vector (list of ints/ floats) of a given shape.

    :param shape: The shape of the vector
    :param identifier: The identifier of the vector
    """
    if isinstance(shape, int):
        shape = (shape,)

    identifier = identifier or f'vector[{str_shape(shape)}]'
    return DataType(
        identifier=identifier,
        shape=shape,
        encoder=None,
        decoder=None,
        encodable='native',
    )


@component()
def sqlvector(shape, bytes_encoding: t.Optional[str] = None):
    """Create an encoder for a vector (list of ints/ floats) of a given shape.

    This is used for compatibility with SQL databases, as the default vector

    :param shape: The shape of the vector
    :param bytes_encoding: The encoding of the bytes
    """
    return DataType(
        identifier=f'sqlvector[{str_shape(shape)}]',
        shape=shape,
        encoder=EncodeArray(dtype='float64'),
        decoder=DecodeArray(dtype='float64'),
        bytes_encoding=bytes_encoding,
    )
