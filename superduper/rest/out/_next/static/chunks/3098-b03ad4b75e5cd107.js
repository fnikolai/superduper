"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3098],{23098:function(e,t,r){r.d(t,{VY:function(){return S},fC:function(){return F},xz:function(){return H},zt:function(){return z}});var n=r(7653),o=r(46196),i=r(94492),l=r(99933),a=r(97256),u=r(17321),s=r(51209),c=(r(20153),r(65622)),d=r(78378),p=r(8828),f=r(47178),x=r(3336),h=r(27573),[v,g]=(0,l.b)("Tooltip",[s.D7]),y=(0,s.D7)(),b="TooltipProvider",w="tooltip.open",[m,C]=v(b),T=e=>{let{__scopeTooltip:t,delayDuration:r=700,skipDelayDuration:o=300,disableHoverableContent:i=!1,children:l}=e,[a,u]=n.useState(!0),s=n.useRef(!1),c=n.useRef(0);return n.useEffect(()=>{let e=c.current;return()=>window.clearTimeout(e)},[]),(0,h.jsx)(m,{scope:t,isOpenDelayed:a,delayDuration:r,onOpen:n.useCallback(()=>{window.clearTimeout(c.current),u(!1)},[]),onClose:n.useCallback(()=>{window.clearTimeout(c.current),c.current=window.setTimeout(()=>u(!0),o)},[o]),isPointerInTransitRef:s,onPointerInTransitChange:n.useCallback(e=>{s.current=e},[]),disableHoverableContent:i,children:l})};T.displayName=b;var E="Tooltip",[k,M]=v(E),L=e=>{let{__scopeTooltip:t,children:r,open:o,defaultOpen:i=!1,onOpenChange:l,disableHoverableContent:a,delayDuration:c}=e,d=C(E,e.__scopeTooltip),p=y(t),[x,v]=n.useState(null),g=(0,u.M)(),b=n.useRef(0),m=null!=a?a:d.disableHoverableContent,T=null!=c?c:d.delayDuration,M=n.useRef(!1),[L=!1,R]=(0,f.T)({prop:o,defaultProp:i,onChange:e=>{e?(d.onOpen(),document.dispatchEvent(new CustomEvent(w))):d.onClose(),null==l||l(e)}}),j=n.useMemo(()=>L?M.current?"delayed-open":"instant-open":"closed",[L]),_=n.useCallback(()=>{window.clearTimeout(b.current),b.current=0,M.current=!1,R(!0)},[R]),P=n.useCallback(()=>{window.clearTimeout(b.current),b.current=0,R(!1)},[R]),D=n.useCallback(()=>{window.clearTimeout(b.current),b.current=window.setTimeout(()=>{M.current=!0,R(!0),b.current=0},T)},[T,R]);return n.useEffect(()=>()=>{b.current&&(window.clearTimeout(b.current),b.current=0)},[]),(0,h.jsx)(s.fC,{...p,children:(0,h.jsx)(k,{scope:t,contentId:g,open:L,stateAttribute:j,trigger:x,onTriggerChange:v,onTriggerEnter:n.useCallback(()=>{d.isOpenDelayed?D():_()},[d.isOpenDelayed,D,_]),onTriggerLeave:n.useCallback(()=>{m?P():(window.clearTimeout(b.current),b.current=0)},[P,m]),onOpen:_,onClose:P,disableHoverableContent:m,children:r})})};L.displayName=E;var R="TooltipTrigger",j=n.forwardRef((e,t)=>{let{__scopeTooltip:r,...l}=e,a=M(R,r),u=C(R,r),c=y(r),p=n.useRef(null),f=(0,i.e)(t,p,a.onTriggerChange),x=n.useRef(!1),v=n.useRef(!1),g=n.useCallback(()=>x.current=!1,[]);return n.useEffect(()=>()=>document.removeEventListener("pointerup",g),[g]),(0,h.jsx)(s.ee,{asChild:!0,...c,children:(0,h.jsx)(d.WV.button,{"aria-describedby":a.open?a.contentId:void 0,"data-state":a.stateAttribute,...l,ref:f,onPointerMove:(0,o.M)(e.onPointerMove,e=>{"touch"===e.pointerType||v.current||u.isPointerInTransitRef.current||(a.onTriggerEnter(),v.current=!0)}),onPointerLeave:(0,o.M)(e.onPointerLeave,()=>{a.onTriggerLeave(),v.current=!1}),onPointerDown:(0,o.M)(e.onPointerDown,()=>{x.current=!0,document.addEventListener("pointerup",g,{once:!0})}),onFocus:(0,o.M)(e.onFocus,()=>{x.current||a.onOpen()}),onBlur:(0,o.M)(e.onBlur,a.onClose),onClick:(0,o.M)(e.onClick,a.onClose)})})});j.displayName=R;var[_,P]=v("TooltipPortal",{forceMount:void 0}),D="TooltipContent",O=n.forwardRef((e,t)=>{let r=P(D,e.__scopeTooltip),{forceMount:n=r.forceMount,side:o="top",...i}=e,l=M(D,e.__scopeTooltip);return(0,h.jsx)(c.z,{present:n||l.open,children:l.disableHoverableContent?(0,h.jsx)(A,{side:o,...i,ref:t}):(0,h.jsx)(I,{side:o,...i,ref:t})})}),I=n.forwardRef((e,t)=>{let r=M(D,e.__scopeTooltip),o=C(D,e.__scopeTooltip),l=n.useRef(null),a=(0,i.e)(t,l),[u,s]=n.useState(null),{trigger:c,onClose:d}=r,p=l.current,{onPointerInTransitChange:f}=o,x=n.useCallback(()=>{s(null),f(!1)},[f]),v=n.useCallback((e,t)=>{let r=e.currentTarget,n={x:e.clientX,y:e.clientY},o=function(e,t){let r=Math.abs(t.top-e.y),n=Math.abs(t.bottom-e.y),o=Math.abs(t.right-e.x),i=Math.abs(t.left-e.x);switch(Math.min(r,n,o,i)){case i:return"left";case o:return"right";case r:return"top";case n:return"bottom";default:throw Error("unreachable")}}(n,r.getBoundingClientRect());s(function(e){let t=e.slice();return t.sort((e,t)=>e.x<t.x?-1:e.x>t.x?1:e.y<t.y?-1:e.y>t.y?1:0),function(e){if(e.length<=1)return e.slice();let t=[];for(let r=0;r<e.length;r++){let n=e[r];for(;t.length>=2;){let e=t[t.length-1],r=t[t.length-2];if((e.x-r.x)*(n.y-r.y)>=(e.y-r.y)*(n.x-r.x))t.pop();else break}t.push(n)}t.pop();let r=[];for(let t=e.length-1;t>=0;t--){let n=e[t];for(;r.length>=2;){let e=r[r.length-1],t=r[r.length-2];if((e.x-t.x)*(n.y-t.y)>=(e.y-t.y)*(n.x-t.x))r.pop();else break}r.push(n)}return(r.pop(),1===t.length&&1===r.length&&t[0].x===r[0].x&&t[0].y===r[0].y)?t:t.concat(r)}(t)}([...function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:5,n=[];switch(t){case"top":n.push({x:e.x-r,y:e.y+r},{x:e.x+r,y:e.y+r});break;case"bottom":n.push({x:e.x-r,y:e.y-r},{x:e.x+r,y:e.y-r});break;case"left":n.push({x:e.x+r,y:e.y-r},{x:e.x+r,y:e.y+r});break;case"right":n.push({x:e.x-r,y:e.y-r},{x:e.x-r,y:e.y+r})}return n}(n,o),...function(e){let{top:t,right:r,bottom:n,left:o}=e;return[{x:o,y:t},{x:r,y:t},{x:r,y:n},{x:o,y:n}]}(t.getBoundingClientRect())])),f(!0)},[f]);return n.useEffect(()=>()=>x(),[x]),n.useEffect(()=>{if(c&&p){let e=e=>v(e,p),t=e=>v(e,c);return c.addEventListener("pointerleave",e),p.addEventListener("pointerleave",t),()=>{c.removeEventListener("pointerleave",e),p.removeEventListener("pointerleave",t)}}},[c,p,v,x]),n.useEffect(()=>{if(u){let e=e=>{let t=e.target,r={x:e.clientX,y:e.clientY},n=(null==c?void 0:c.contains(t))||(null==p?void 0:p.contains(t)),o=!function(e,t){let{x:r,y:n}=e,o=!1;for(let e=0,i=t.length-1;e<t.length;i=e++){let l=t[e].x,a=t[e].y,u=t[i].x,s=t[i].y;a>n!=s>n&&r<(u-l)*(n-a)/(s-a)+l&&(o=!o)}return o}(r,u);n?x():o&&(x(),d())};return document.addEventListener("pointermove",e),()=>document.removeEventListener("pointermove",e)}},[c,p,u,d,x]),(0,h.jsx)(A,{...e,ref:a})}),[N,B]=v(E,{isInside:!1}),A=n.forwardRef((e,t)=>{let{__scopeTooltip:r,children:o,"aria-label":i,onEscapeKeyDown:l,onPointerDownOutside:u,...c}=e,d=M(D,r),f=y(r),{onClose:v}=d;return n.useEffect(()=>(document.addEventListener(w,v),()=>document.removeEventListener(w,v)),[v]),n.useEffect(()=>{if(d.trigger){let e=e=>{let t=e.target;(null==t?void 0:t.contains(d.trigger))&&v()};return window.addEventListener("scroll",e,{capture:!0}),()=>window.removeEventListener("scroll",e,{capture:!0})}},[d.trigger,v]),(0,h.jsx)(a.XB,{asChild:!0,disableOutsidePointerEvents:!1,onEscapeKeyDown:l,onPointerDownOutside:u,onFocusOutside:e=>e.preventDefault(),onDismiss:v,children:(0,h.jsxs)(s.VY,{"data-state":d.stateAttribute,...f,...c,ref:t,style:{...c.style,"--radix-tooltip-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-tooltip-content-available-width":"var(--radix-popper-available-width)","--radix-tooltip-content-available-height":"var(--radix-popper-available-height)","--radix-tooltip-trigger-width":"var(--radix-popper-anchor-width)","--radix-tooltip-trigger-height":"var(--radix-popper-anchor-height)"},children:[(0,h.jsx)(p.A4,{children:o}),(0,h.jsx)(N,{scope:r,isInside:!0,children:(0,h.jsx)(x.f,{id:d.contentId,role:"tooltip",children:i||o})})]})})});O.displayName=D;var Y="TooltipArrow";n.forwardRef((e,t)=>{let{__scopeTooltip:r,...n}=e,o=y(r);return B(Y,r).isInside?null:(0,h.jsx)(s.Eh,{...o,...n,ref:t})}).displayName=Y;var z=T,F=L,H=j,S=O}}]);