"use strict";(self.webpackChunknewdocs=self.webpackChunknewdocs||[]).push([[3159],{84113:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>d,toc:()=>c});var r=t(85893),s=t(11151);const o={sidebar_position:2},i="Inserting data",d={id:"docs/walkthrough/inserting_data",title:"Inserting data",description:"After configuring and connecting, you're ready to insert some data.",source:"@site/content/docs/walkthrough/inserting_data.md",sourceDirName:"docs/walkthrough",slug:"/docs/walkthrough/inserting_data",permalink:"/docs/docs/walkthrough/inserting_data",draft:!1,unlisted:!1,editUrl:"https://github.com/SuperDuperDB/superduperdb/tree/main/docs/content/docs/walkthrough/inserting_data.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Setting up tables and encodings",permalink:"/docs/docs/walkthrough/data_encodings_and_schemas"},next:{title:"Selecting data",permalink:"/docs/docs/walkthrough/selecting_data"}},a={},c=[{value:"SuperDuperDB data insertion",id:"superduperdb-data-insertion",level:2},{value:"MongoDB",id:"mongodb",level:3},{value:"SQL",id:"sql",level:3}];function l(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"inserting-data",children:"Inserting data"}),"\n",(0,r.jsx)(n.p,{children:"After configuring and connecting, you're ready to insert some data."}),"\n",(0,r.jsxs)(n.p,{children:["In SuperDuperDB, data may be inserted using the SuperDuperDB connection ",(0,r.jsx)(n.code,{children:"db"}),",\nor using a third-parth client."]}),"\n",(0,r.jsx)(n.h2,{id:"superduperdb-data-insertion",children:"SuperDuperDB data insertion"}),"\n",(0,r.jsxs)(n.p,{children:["Here's a guide to using ",(0,r.jsx)(n.code,{children:"db"})," to insert data."]}),"\n",(0,r.jsx)(n.h3,{id:"mongodb",children:"MongoDB"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from superduperdb.backends.mongodb import Collection\n\ndb.execute(\n    Collection('<collection-name>')\n        .insert_many([Document(record) for record in records])\n)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"records"})," may be any dictionaries supported by MongoDB, as well as dictionaries\ncontaining items which may converted to ",(0,r.jsx)(n.code,{children:"bytes"})," strings."]}),"\n",(0,r.jsx)(n.h3,{id:"sql",children:"SQL"}),"\n",(0,r.jsx)(n.p,{children:"Similarly"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from superduperdb.backends.ibis import Table\n\ndb.execute(\n    Table('<table-name>')\n        .insert([Document(record) for record in records])\n)\n"})}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"records"})," must conform in their keys to the columns set by the ",(0,r.jsx)(n.code,{children:"Schema"})," set."]}),"\n",(0,r.jsxs)(n.p,{children:["Similarly, you may also use ",(0,r.jsx)(n.code,{children:"pandas"})," dataframes:"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-python",children:"from superduperdb.backends.ibis import Table\nimport pandas\n\ndb.execute(\n    Table('<table-name>')\n        .insert(pandas.DataFrame(records))\n)\n"})})]})}function u(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},11151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>i});var r=t(67294);const s={},o=r.createContext(s);function i(e){const n=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);