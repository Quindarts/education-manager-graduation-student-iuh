import{r as g,j as i,B as n,P as d,a as r,I as a,ai as o,aJ as u,ah as y,T as v}from"./index-NapbxlsL.js";import{T as b}from"./Table-TbsIed3h.js";import{a as T,b as f,T as p}from"./TabPanel-RkIgX_6D.js";import{a as j}from"./Tabs-IDt9DQ5z.js";import{u as L}from"./useQueryGroupLecturer-YqNk0Zqv.js";import"./Table-WHKjjRLK.js";import"./KeyboardArrowRight-5D6Ejjzb.js";import"./index-UQJd2y-u.js";import"./Stack-ScuxqrBn.js";import"./index-qC6u9U62.js";import"./useQueryLecturerTerm-aT1-fx4u.js";import"./useParams-vd7i9Ic6.js";function P(l){const{groupLecturer:s}=l,[h,c]=g.useState("1"),e=s.typeGroup,x=(m,t)=>{c(t)};return i.jsx(n,{sx:{width:"100%",typography:"h4"},children:i.jsxs(T,{value:h,children:[i.jsx(n,{sx:{borderBottom:1,borderColor:"primary.main"},children:i.jsxs(f,{onChange:x,"aria-label":"lab API tabs example",children:[i.jsx(j,{label:"Thông tin chung",value:"1"}),i.jsx(j,{label:"Danh sách giảng viên",value:"2"})]})}),i.jsx(p,{value:"1",children:e==="REVIEWER"?i.jsxs(d,{elevation:2,sx:{px:10,py:6},children:[i.jsxs(r,{variant:"h6",color:"primary",children:[i.jsx(a,{icon:"el:list-alt"}),"Danh sách đề tài chấm điểm của nhóm"]}),i.jsxs(n,{mx:4,my:4,children:[i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 1: Xây dựng Website bán vé tàu online"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 2:Tìm hiểu công nghệ WPF và ứng dụng xây dựng game ghép hình cho trẻ em"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 3: Tạo ra ứng dụng về du lịch và dịch vụ bán sản phẩm."})]}),i.jsxs(n,{my:4,children:[i.jsxs(r,{variant:"h6",color:"primary",children:[i.jsx(a,{icon:"tdesign:time"})," Thời gian chấm phản biện"]}),i.jsxs(n,{mx:4,children:[i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 1: 13h Ngay 19/7/2024"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 2: 14h Ngay 19/7/2024"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 3: 16h Ngay 19/7/2024"})]})]}),i.jsxs(n,{my:4,children:[i.jsxs(r,{variant:"h6",color:"primary",children:[i.jsx(a,{icon:"ph:link-bold"}),"Link phòng trực tuyến"]}),i.jsx(o,{label:"Đề tài số 1",placeholder:"https://zoom.us/fr",value:"https://zoom.us/fr"}),i.jsx(o,{label:"Đề tài số 2",placeholder:"https://zoom.us/fr",value:"https://zoom.us/fr"})," ",i.jsx(o,{label:"Đề tài số 3",placeholder:"https://zoom.us/fr",value:"https://zoom.us/fr"})]}),i.jsx(n,{})]}):i.jsxs(d,{elevation:2,sx:{px:10,py:6},children:[i.jsxs(r,{variant:"h6",color:"primary",children:[i.jsx(a,{icon:"el:list-alt"}),"Danh sách đề tài chấm điểm của nhóm"]}),i.jsxs(n,{mx:4,my:4,children:[i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 1: Xây dựng Website bán vé tàu online"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 2:Tìm hiểu công nghệ WPF và ứng dụng xây dựng game ghép hình cho trẻ em"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 3: Tạo ra ứng dụng về du lịch và dịch vụ bán sản phẩm."})]}),i.jsxs(n,{my:4,children:[i.jsxs(r,{variant:"h6",color:"primary",children:[i.jsx(a,{icon:"tdesign:time"})," Thời gian chấm"]}),i.jsxs(n,{mx:4,children:[i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 1: 13h Ngay 19/7/2024"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 2: 14h Ngay 19/7/2024"}),i.jsx(r,{variant:"body1",color:"initial",children:"Đề tài 3: 16h Ngay 19/7/2024"})]})]}),i.jsxs(n,{my:4,children:[i.jsxs(r,{variant:"h6",color:"primary",children:[i.jsx(a,{icon:"ic:sharp-meeting-room"}),"Phòng chấm"]}),i.jsx(o,{label:"Thông tin phòng",placeholder:"A2.03",value:"A2.03"})]}),i.jsx(n,{})]})}),i.jsx(p,{value:"2",children:i.jsx(b,{groupType:e,rows:s.members})})]})})}function R(){var t;const{pathname:l}=u(),s=l.split("/"),h=`${s[s.length-1]}`,{handleGetGroupLecturerById:c}=L(),{data:e,isLoading:x,isFetching:m}=c(h);return i.jsx(d,{sx:{py:20,px:10},elevation:1,children:x||m?i.jsx(y,{}):i.jsxs(i.Fragment,{children:[i.jsx(v,{children:(t=e==null?void 0:e.groupLecturer)==null?void 0:t.name}),i.jsx(n,{my:4,children:i.jsx(P,{groupLecturer:e==null?void 0:e.groupLecturer})})]})})}export{R as default};