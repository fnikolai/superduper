"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4529],{90206:function(e,t,r){r.d(t,{u:function(){return n}});function n(e,[t,r]){return Math.min(r,Math.max(t,e))}},3864:function(e,t,r){r.d(t,{B:function(){return i}});var n=r(7653),o=r(27573),a=r(94492),u=r(8828);function i(e){let t=e+"CollectionProvider",[r,i]=function(e,t=[]){let r=[],a=()=>{let t=r.map(e=>n.createContext(e));return function(r){let o=r?.[e]||t;return n.useMemo(()=>({[`__scope${e}`]:{...r,[e]:o}}),[r,o])}};return a.scopeName=e,[function(t,a){let u=n.createContext(a),i=r.length;function l(t){let{scope:r,children:a,...l}=t,c=r?.[e][i]||u,s=n.useMemo(()=>l,Object.values(l));return(0,o.jsx)(c.Provider,{value:s,children:a})}return r=[...r,a],l.displayName=t+"Provider",[l,function(r,o){let l=o?.[e][i]||u,c=n.useContext(l);if(c)return c;if(void 0!==a)return a;throw Error(`\`${r}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let r=()=>{let r=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=r.reduce((t,{useScope:r,scopeName:n})=>{let o=r(e)[`__scope${n}`];return{...t,...o}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return r.scopeName=t.scopeName,r}(a,...t)]}(t),[l,c]=r(t,{collectionRef:{current:null},itemMap:new Map}),s=e=>{let{scope:t,children:r}=e,a=n.useRef(null),u=n.useRef(new Map).current;return(0,o.jsx)(l,{scope:t,itemMap:u,collectionRef:a,children:r})};s.displayName=t;let f=e+"CollectionSlot",d=n.forwardRef((e,t)=>{let{scope:r,children:n}=e,i=c(f,r),l=(0,a.e)(t,i.collectionRef);return(0,o.jsx)(u.g7,{ref:l,children:n})});d.displayName=f;let p=e+"CollectionItemSlot",m="data-radix-collection-item",v=n.forwardRef((e,t)=>{let{scope:r,children:i,...l}=e,s=n.useRef(null),f=(0,a.e)(t,s),d=c(p,r);return n.useEffect(()=>(d.itemMap.set(s,{ref:s,...l}),()=>void d.itemMap.delete(s))),(0,o.jsx)(u.g7,{[m]:"",ref:f,children:i})});return v.displayName=p,[{Provider:s,Slot:d,ItemSlot:v},function(t){let r=c(e+"CollectionConsumer",t);return n.useCallback(()=>{let e=r.collectionRef.current;if(!e)return[];let t=Array.from(e.querySelectorAll("[".concat(m,"]")));return Array.from(r.itemMap.values()).sort((e,r)=>t.indexOf(e.ref.current)-t.indexOf(r.ref.current))},[r.collectionRef,r.itemMap])},i]}},21004:function(e,t,r){r.d(t,{gm:function(){return a}});var n=r(7653);r(27573);var o=n.createContext(void 0);function a(e){let t=n.useContext(o);return e||t||"ltr"}},56007:function(e,t,r){r.d(t,{ck:function(){return A},fC:function(){return F},Pc:function(){return g}});var n=r(7653),o=r(46196),a=r(3864),u=r(94492),i=r(27573),l=r(17321),c=r(78378),s=r(523),f=r(47178),d=r(21004),p="rovingFocusGroup.onEntryFocus",m={bubbles:!1,cancelable:!0},v="RovingFocusGroup",[b,h,w]=(0,a.B)(v),[x,g]=function(e,t=[]){let r=[],o=()=>{let t=r.map(e=>n.createContext(e));return function(r){let o=r?.[e]||t;return n.useMemo(()=>({[`__scope${e}`]:{...r,[e]:o}}),[r,o])}};return o.scopeName=e,[function(t,o){let a=n.createContext(o),u=r.length;function l(t){let{scope:r,children:o,...l}=t,c=r?.[e][u]||a,s=n.useMemo(()=>l,Object.values(l));return(0,i.jsx)(c.Provider,{value:s,children:o})}return r=[...r,o],l.displayName=t+"Provider",[l,function(r,i){let l=i?.[e][u]||a,c=n.useContext(l);if(c)return c;if(void 0!==o)return o;throw Error(`\`${r}\` must be used within \`${t}\``)}]},function(...e){let t=e[0];if(1===e.length)return t;let r=()=>{let r=e.map(e=>({useScope:e(),scopeName:e.scopeName}));return function(e){let o=r.reduce((t,{useScope:r,scopeName:n})=>{let o=r(e)[`__scope${n}`];return{...t,...o}},{});return n.useMemo(()=>({[`__scope${t.scopeName}`]:o}),[o])}};return r.scopeName=t.scopeName,r}(o,...t)]}(v,[w]),[y,C]=x(v),M=n.forwardRef((e,t)=>(0,i.jsx)(b.Provider,{scope:e.__scopeRovingFocusGroup,children:(0,i.jsx)(b.Slot,{scope:e.__scopeRovingFocusGroup,children:(0,i.jsx)(R,{...e,ref:t})})}));M.displayName=v;var R=n.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:r,orientation:a,loop:l=!1,dir:v,currentTabStopId:b,defaultCurrentTabStopId:w,onCurrentTabStopIdChange:x,onEntryFocus:g,preventScrollOnEntryFocus:C=!1,...M}=e,R=n.useRef(null),N=(0,u.e)(t,R),j=(0,d.gm)(v),[I=null,F]=(0,f.T)({prop:b,defaultProp:w,onChange:x}),[A,D]=n.useState(!1),E=(0,s.W)(g),T=h(r),P=n.useRef(!1),[S,k]=n.useState(0);return n.useEffect(()=>{let e=R.current;if(e)return e.addEventListener(p,E),()=>e.removeEventListener(p,E)},[E]),(0,i.jsx)(y,{scope:r,orientation:a,dir:j,loop:l,currentTabStopId:I,onItemFocus:n.useCallback(e=>F(e),[F]),onItemShiftTab:n.useCallback(()=>D(!0),[]),onFocusableItemAdd:n.useCallback(()=>k(e=>e+1),[]),onFocusableItemRemove:n.useCallback(()=>k(e=>e-1),[]),children:(0,i.jsx)(c.WV.div,{tabIndex:A||0===S?-1:0,"data-orientation":a,...M,ref:N,style:{outline:"none",...e.style},onMouseDown:(0,o.M)(e.onMouseDown,()=>{P.current=!0}),onFocus:(0,o.M)(e.onFocus,e=>{let t=!P.current;if(e.target===e.currentTarget&&t&&!A){let t=new CustomEvent(p,m);if(e.currentTarget.dispatchEvent(t),!t.defaultPrevented){let e=T().filter(e=>e.focusable);_([e.find(e=>e.active),e.find(e=>e.id===I),...e].filter(Boolean).map(e=>e.ref.current),C)}}P.current=!1}),onBlur:(0,o.M)(e.onBlur,()=>D(!1))})})}),N="RovingFocusGroupItem",j=n.forwardRef((e,t)=>{let{__scopeRovingFocusGroup:r,focusable:a=!0,active:u=!1,tabStopId:s,...f}=e,d=(0,l.M)(),p=s||d,m=C(N,r),v=m.currentTabStopId===p,w=h(r),{onFocusableItemAdd:x,onFocusableItemRemove:g}=m;return n.useEffect(()=>{if(a)return x(),()=>g()},[a,x,g]),(0,i.jsx)(b.ItemSlot,{scope:r,id:p,focusable:a,active:u,children:(0,i.jsx)(c.WV.span,{tabIndex:v?0:-1,"data-orientation":m.orientation,...f,ref:t,onMouseDown:(0,o.M)(e.onMouseDown,e=>{a?m.onItemFocus(p):e.preventDefault()}),onFocus:(0,o.M)(e.onFocus,()=>m.onItemFocus(p)),onKeyDown:(0,o.M)(e.onKeyDown,e=>{if("Tab"===e.key&&e.shiftKey){m.onItemShiftTab();return}if(e.target!==e.currentTarget)return;let t=function(e,t,r){var n;let o=(n=e.key,"rtl"!==r?n:"ArrowLeft"===n?"ArrowRight":"ArrowRight"===n?"ArrowLeft":n);if(!("vertical"===t&&["ArrowLeft","ArrowRight"].includes(o))&&!("horizontal"===t&&["ArrowUp","ArrowDown"].includes(o)))return I[o]}(e,m.orientation,m.dir);if(void 0!==t){if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();let o=w().filter(e=>e.focusable).map(e=>e.ref.current);if("last"===t)o.reverse();else if("prev"===t||"next"===t){var r,n;"prev"===t&&o.reverse();let a=o.indexOf(e.currentTarget);o=m.loop?(r=o,n=a+1,r.map((e,t)=>r[(n+t)%r.length])):o.slice(a+1)}setTimeout(()=>_(o))}})})})});j.displayName=N;var I={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function _(e){let t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=document.activeElement;for(let n of e)if(n===r||(n.focus({preventScroll:t}),document.activeElement!==r))return}var F=M,A=j},84132:function(e,t,r){r.d(t,{VY:function(){return D},aV:function(){return F},fC:function(){return _},xz:function(){return A}});var n=r(7653),o=r(46196),a=r(99933),u=r(56007),i=r(65622),l=r(78378),c=r(21004),s=r(47178),f=r(17321),d=r(27573),p="Tabs",[m,v]=(0,a.b)(p,[u.Pc]),b=(0,u.Pc)(),[h,w]=m(p),x=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,onValueChange:o,defaultValue:a,orientation:u="horizontal",dir:i,activationMode:p="automatic",...m}=e,v=(0,c.gm)(i),[b,w]=(0,s.T)({prop:n,onChange:o,defaultProp:a});return(0,d.jsx)(h,{scope:r,baseId:(0,f.M)(),value:b,onValueChange:w,orientation:u,dir:v,activationMode:p,children:(0,d.jsx)(l.WV.div,{dir:v,"data-orientation":u,...m,ref:t})})});x.displayName=p;var g="TabsList",y=n.forwardRef((e,t)=>{let{__scopeTabs:r,loop:n=!0,...o}=e,a=w(g,r),i=b(r);return(0,d.jsx)(u.fC,{asChild:!0,...i,orientation:a.orientation,dir:a.dir,loop:n,children:(0,d.jsx)(l.WV.div,{role:"tablist","aria-orientation":a.orientation,...o,ref:t})})});y.displayName=g;var C="TabsTrigger",M=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,disabled:a=!1,...i}=e,c=w(C,r),s=b(r),f=j(c.baseId,n),p=I(c.baseId,n),m=n===c.value;return(0,d.jsx)(u.ck,{asChild:!0,...s,focusable:!a,active:m,children:(0,d.jsx)(l.WV.button,{type:"button",role:"tab","aria-selected":m,"aria-controls":p,"data-state":m?"active":"inactive","data-disabled":a?"":void 0,disabled:a,id:f,...i,ref:t,onMouseDown:(0,o.M)(e.onMouseDown,e=>{a||0!==e.button||!1!==e.ctrlKey?e.preventDefault():c.onValueChange(n)}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&c.onValueChange(n)}),onFocus:(0,o.M)(e.onFocus,()=>{let e="manual"!==c.activationMode;m||a||!e||c.onValueChange(n)})})})});M.displayName=C;var R="TabsContent",N=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:o,forceMount:a,children:u,...c}=e,s=w(R,r),f=j(s.baseId,o),p=I(s.baseId,o),m=o===s.value,v=n.useRef(m);return n.useEffect(()=>{let e=requestAnimationFrame(()=>v.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,d.jsx)(i.z,{present:a||m,children:r=>{let{present:n}=r;return(0,d.jsx)(l.WV.div,{"data-state":m?"active":"inactive","data-orientation":s.orientation,role:"tabpanel","aria-labelledby":f,hidden:!n,id:p,tabIndex:0,...c,ref:t,style:{...e.style,animationDuration:v.current?"0s":void 0},children:n&&u})}})});function j(e,t){return"".concat(e,"-trigger-").concat(t)}function I(e,t){return"".concat(e,"-content-").concat(t)}N.displayName=R;var _=x,F=y,A=M,D=N}}]);