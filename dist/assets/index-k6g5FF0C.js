import{l as K,k as X,r as p,s as d,bl as Y,bm as z,U as n,e as l,P,m as H,F as V,b as Z,K as q,j as r,n as f,o as G,a0 as J,ab as O,R as Q,bn as oo,E as ao,I as eo,B as ro}from"./index-wQ8JwfM2.js";function io(a){return X("MuiDialog",a)}const lo=K("MuiDialog",["root","scrollPaper","scrollBody","container","paper","paperScrollPaper","paperScrollBody","paperWidthFalse","paperWidthXs","paperWidthSm","paperWidthMd","paperWidthLg","paperWidthXl","paperFullWidth","paperFullScreen"]),k=lo,so=p.createContext({}),no=so,to=["aria-describedby","aria-labelledby","BackdropComponent","BackdropProps","children","className","disableEscapeKeyDown","fullScreen","fullWidth","maxWidth","onBackdropClick","onClose","open","PaperComponent","PaperProps","scroll","TransitionComponent","transitionDuration","TransitionProps"],co=d(Y,{name:"MuiDialog",slot:"Backdrop",overrides:(a,o)=>o.backdrop})({zIndex:-1}),po=a=>{const{classes:o,scroll:e,maxWidth:i,fullWidth:s,fullScreen:u}=a,m={root:["root"],container:["container",`scroll${n(e)}`],paper:["paper",`paperScroll${n(e)}`,`paperWidth${n(String(i))}`,s&&"paperFullWidth",u&&"paperFullScreen"]};return G(m,io,o)},uo=d(z,{name:"MuiDialog",slot:"Root",overridesResolver:(a,o)=>o.root})({"@media print":{position:"absolute !important"}}),mo=d("div",{name:"MuiDialog",slot:"Container",overridesResolver:(a,o)=>{const{ownerState:e}=a;return[o.container,o[`scroll${n(e.scroll)}`]]}})(({ownerState:a})=>l({height:"100%","@media print":{height:"auto"},outline:0},a.scroll==="paper"&&{display:"flex",justifyContent:"center",alignItems:"center"},a.scroll==="body"&&{overflowY:"auto",overflowX:"hidden",textAlign:"center","&::after":{content:'""',display:"inline-block",verticalAlign:"middle",height:"100%",width:"0"}})),xo=d(P,{name:"MuiDialog",slot:"Paper",overridesResolver:(a,o)=>{const{ownerState:e}=a;return[o.paper,o[`scrollPaper${n(e.scroll)}`],o[`paperWidth${n(String(e.maxWidth))}`],e.fullWidth&&o.paperFullWidth,e.fullScreen&&o.paperFullScreen]}})(({theme:a,ownerState:o})=>l({margin:32,position:"relative",overflowY:"auto","@media print":{overflowY:"visible",boxShadow:"none"}},o.scroll==="paper"&&{display:"flex",flexDirection:"column",maxHeight:"calc(100% - 64px)"},o.scroll==="body"&&{display:"inline-block",verticalAlign:"middle",textAlign:"left"},!o.maxWidth&&{maxWidth:"calc(100% - 64px)"},o.maxWidth==="xs"&&{maxWidth:a.breakpoints.unit==="px"?Math.max(a.breakpoints.values.xs,444):`max(${a.breakpoints.values.xs}${a.breakpoints.unit}, 444px)`,[`&.${k.paperScrollBody}`]:{[a.breakpoints.down(Math.max(a.breakpoints.values.xs,444)+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.maxWidth&&o.maxWidth!=="xs"&&{maxWidth:`${a.breakpoints.values[o.maxWidth]}${a.breakpoints.unit}`,[`&.${k.paperScrollBody}`]:{[a.breakpoints.down(a.breakpoints.values[o.maxWidth]+32*2)]:{maxWidth:"calc(100% - 64px)"}}},o.fullWidth&&{width:"calc(100% - 64px)"},o.fullScreen&&{margin:0,width:"100%",maxWidth:"100%",height:"100%",maxHeight:"none",borderRadius:0,[`&.${k.paperScrollBody}`]:{margin:0,maxWidth:"100%"}})),ho=p.forwardRef(function(o,e){const i=H({props:o,name:"MuiDialog"}),s=V(),u={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{"aria-describedby":m,"aria-labelledby":B,BackdropComponent:M,BackdropProps:$,children:j,className:w,disableEscapeKeyDown:W=!1,fullScreen:S=!1,fullWidth:R=!1,maxWidth:T="sm",onBackdropClick:C,onClose:x,open:D,PaperComponent:F=P,PaperProps:y={},scroll:_="paper",TransitionComponent:I=J,transitionDuration:v=u,TransitionProps:N}=i,A=Z(i,to),c=l({},i,{disableEscapeKeyDown:W,fullScreen:S,fullWidth:R,maxWidth:T,scroll:_}),h=po(c),b=p.useRef(),E=t=>{b.current=t.target===t.currentTarget},U=t=>{b.current&&(b.current=null,C&&C(t),x&&x(t,"backdropClick"))},g=q(B),L=p.useMemo(()=>({titleId:g}),[g]);return r.jsx(uo,l({className:f(h.root,w),closeAfterTransition:!0,components:{Backdrop:co},componentsProps:{backdrop:l({transitionDuration:v,as:M},$)},disableEscapeKeyDown:W,onClose:x,open:D,ref:e,onClick:U,ownerState:c},A,{children:r.jsx(I,l({appear:!0,in:D,timeout:v,role:"presentation"},N,{children:r.jsx(mo,{className:f(h.container),onMouseDown:E,ownerState:c,children:r.jsx(xo,l({as:F,elevation:24,role:"dialog","aria-describedby":m,"aria-labelledby":g},y,{className:f(h.paper,y.className),ownerState:c,children:r.jsx(no.Provider,{value:L,children:j})}))})}))}))}),bo=ho,go=O(bo)`
  .MuiDialog-container {
    .MuiDialog-paper {
      align-items: center;
      width: 96%;
      max-height:94vh;
      border-top: 6px solid #1349BD ;

      margin: auto;

      &::-webkit-scrollbar {
        width: 8px !important;
      }

      &::-webkit-scrollbar-thumb {
        background-color: 'primary.main';
        border-radius: 10px;
      }

      //Close icon
      .modal_header {
        padding: 20px;
        .icon_close {
          margin-left: 380px;
          cursor: pointer;

        }
      }
      .modal__body {
        width: 100%;
      }
    }
  }
`,fo=Q.forwardRef(function(o,e){return r.jsx(oo,{ref:e,...o})}),Wo=a=>{const{onClose:o,open:e,children:i,...s}=a;return r.jsx(r.Fragment,{children:r.jsxs(go,{TransitionComponent:fo,open:e,onClose:o,...s,children:[r.jsx(ao,{onClick:o,sx:{position:"absolute",right:0},color:"primary",children:r.jsx(eo,{icon:"line-md:close-small"})}),r.jsx(ro,{mt:4,className:"modal__body",children:i})]})})};export{bo as M,Wo as a,k as d};
