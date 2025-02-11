import typing as t

from superduper import CFG
from superduper.base.annotations import trigger
from superduper.components.component import Component
from superduper.components.schema import Schema

if t.TYPE_CHECKING:
    from superduper.base.datalayer import Datalayer
    from superduper.components.dataset import Dataset, RemoteData

DEFAULT_PRIMARY_ID = 'id'


class Table(Component):
    """
    A component that represents a table in a database.

    :param schema: The schema of the table
    :param primary_id: The primary id of the table
    :param data: Data to insert post creation
    """

    type_id: t.ClassVar[str] = 'table'

    schema: Schema
    primary_id: str = DEFAULT_PRIMARY_ID
    data: t.Union['Dataset', 'RemoteData', None] = None

    def postinit(self):
        """Post initialization method."""
        fields = {}
        fields.update(self.schema.fields)
        schema_version = self.schema.version

        # TODO make globally configurable
        if '_fold' not in self.schema.fields:
            fields.update({'_fold': 'str'})

        self.schema = Schema(
            self.schema.identifier,
            fields={**fields},
            db=self.db,
        )
        self.schema.version = schema_version
        super().postinit()

    def cleanup(self, db):
        """Cleanup the table, on removal of the component.

        :param db: The Datalayer instance
        """
        if self.identifier.startswith(CFG.output_prefix):
            db.databackend.drop_table(self.identifier)

    def on_create(self, db: 'Datalayer'):
        """Create the table, on creation of the component.

        :param db: The Datalayer instance
        """
        assert self.schema is not None, "Schema must be set"
        if db.databackend.in_memory:
            if self.identifier.startswith(CFG.output_prefix):
                db.databackend.in_memory_tables[
                    self.identifier
                ] = db.databackend.create_table_and_schema(self.identifier, self.schema)

        try:
            db.databackend.create_table_and_schema(self.identifier, self.schema)
        except Exception as e:
            if 'already exists' in str(e):
                pass
            else:
                raise e

    @trigger('apply', requires='data')
    def add_data(self):
        if isinstance(self.data, Component):
            data = self.data.data
        else:
            data = self.data
        if data:
            self.db[self.identifier].insert(data)
