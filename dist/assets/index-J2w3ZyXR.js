import{aB as g,r as p,j as e,B as r,ak as j,a5 as y,ba as C,I as x,a as d,E as v,P as T,T as b,ah as w,bb as L}from"./index-NapbxlsL.js";import{T as G,a as P}from"./Table-WHKjjRLK.js";import{t as N}from"./groupLecturer.validation-KscKIZ_D.js";import{C as E}from"./KeyboardArrowRight-5D6Ejjzb.js";import{u as k}from"./useQueryGroupLecturer-YqNk0Zqv.js";import"./index-UQJd2y-u.js";import"./Stack-ScuxqrBn.js";function A(o){const{handleTypeGroupLecturer:i}=o,s=g(),[t,a]=p.useState("reviewer");return p.useEffect(()=>{i(t)},[t]),e.jsx(r,{mb:4,display:"flex",flexWrap:"wrap",gap:2,children:e.jsxs(r,{flex:1,justifyContent:"end",display:"flex",gap:2,width:"full",children:[e.jsx(j,{value:t,onChange:l=>{a(l.target.value)},options:[{name:"Nhóm giảng viên Phản biện",_id:"reviewer"},{name:"Nhóm giảng viên Poster",_id:"report_poster"},{name:"Nhóm giảng viên Hội đồng",_id:"report_council"}]}),e.jsxs(y,{size:"small",onClick:()=>s(C.GROUP_LECTURER.CREATE),color:"error",type:"button",variant:"contained",children:[e.jsx(x,{icon:"lets-icons:add-round",width:20}),"Tạo Nhóm giảng viên"]})]})})}function S(o){const{rows:i,totalItems:s,totalPages:t,page:a,handelChangePage:l,...h}=o,c=g(),u=[{headerName:"Tên nhóm",field:"name",flex:1,headerAlign:"center",align:"center",renderCell:n=>e.jsx(r,{children:e.jsx(d,{variant:"body1",fontWeight:"bold",color:"primary.main",children:n.row.name})})},{headerName:"Loại nhóm",field:"name2",headerAlign:"center",flex:1,align:"center",renderCell:n=>e.jsx(r,{children:e.jsx(E,{label:N(n.row.type.toLowerCase())})})},{headerName:"Thành viên",field:"name3",headerAlign:"center",flex:1,renderCell:n=>e.jsx(r,{children:n.row.members.map((m,f)=>e.jsxs(r,{component:"div",my:2,children:[e.jsxs(d,{component:"span",children:[" ",m.username]}),"--",e.jsxs(d,{component:"span",width:100,color:"initial",children:["GV",f+1,": ",m.fullName]})]}))})},{headerName:"",field:"name8",flex:1,headerAlign:"center",align:"center",renderCell:n=>e.jsx(r,{display:"flex",gap:6,children:e.jsx(P,{title:"Chi tiết nhóm giảng viên",children:e.jsx(v,{color:"primary",onClick:()=>c(`/group-lecturers/details/${n.row.id}`),children:e.jsx(x,{icon:"flat-color-icons:view-details"})})})})}];return e.jsx(r,{children:e.jsx(G,{rows:i,sx:{bgcolor:"white"},rowHeight:100,columns:u,totalItems:1,totalPages:1,checkboxSelection:!0,page:1,handleChangePage:()=>{},disableColumnMenu:!0,disableColumnFilter:!0,disableColumnSelector:!0})})}function H(){const[o,i]=p.useState(""),s=u=>{i(u)},{handleGetAllGroupLecturerByTypeGroup:t}=k(),{data:a,isSuccess:l,isLoading:h,isFetching:c}=t(o);return e.jsxs(T,{sx:{py:10,px:10},elevation:1,children:[e.jsx(b,{icon:"quill:list",mb:0,mt:2,children:"Danh sách nhóm giảng viên"}),e.jsx(A,{handleTypeGroupLecturer:s}),e.jsx(r,{width:"full",my:4,children:h||c?e.jsx(w,{}):e.jsx(S,{rows:L(a==null?void 0:a.groupLecturers)})})]})}export{H as default};