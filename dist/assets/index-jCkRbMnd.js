import{ao as F,aM as V,ad as O,aj as P,aN as W,ax as R,ay as x,b1 as X,az as i,aw as v,u as D,b2 as M,b3 as J,b4 as z,r as C,b5 as Y,ab as Z,j as t,B as m,a5 as w,I as f,P as G,T as ee,a as j,aX as te,b6 as re,b7 as ne}from"./index-NapbxlsL.js";import{a as ae}from"./index-qC6u9U62.js";import{Q as se}from"./useQueryLecturer-I1hzz5cM.js";import{a as ie,b as oe,c as ce,l as le,d as ue,e as de,r as he}from"./apiStudent-jSxWDoLW.js";import{u as ye}from"./useParams-vd7i9Ic6.js";import{a as pe}from"./Table-WHKjjRLK.js";var _=(e=>(e.getAllStudent="getAllStudent",e.getStudentById="getStudentById",e.searchStudentByField="searchStudentByField",e.managerActionStudent="managerActionStudent",e))(_||{});const De=()=>{const{enqueueSnackbar:e}=F(),r=V(a=>a.studentSlice),{paramTotalPage:n}=r,{termStore:d}=O(),{majorStore:h}=P(),T=h.currentMajor.id,S=d.currentTerm.id,{getQueryField:s,setTotalPage:c}=ye(),l=W();return{paramTotalPage:n,studentStore:r,onResetPassword:()=>x(a=>he(a),{onSuccess(a){a.success&&e("Cấp lại mật khẩu thành công",{variant:"success"})},onError(a){a.status===404?e(a.message,{variant:"error"}):e("Cập nhật mật khẩu thất bại",{variant:"error"})}}),onLockOnlyStudent:a=>x(p=>le(a,p),{onSuccess(p){p.success&&(e("sinh viên thành công!",{variant:"success"}),i.invalidateQueries({queryKey:["getAllStudent",S,T,s("limit"),s("page"),s("searchField"),s("keywords")]}),i.invalidateQueries({queryKey:["get-student-by-id",a]}))}}),handleGetStudentById:a=>R(["getStudentById",a],()=>oe(a),{enabled:!!a,cacheTime:1e3*(60*1)}),onUpdateStudent:a=>x(p=>ce(a,p),{onSuccess(p){p.student&&e("Cập nhật sinh viên thành công",{variant:"success"}),i.invalidateQueries({queryKey:["getAllStudent",S,T,s("limit"),s("page"),s("searchField"),s("keywords")]}),i.invalidateQueries({queryKey:["getStudentById",a]})},onError(){e("Cập nhật sinh viên thất bại, thử lại",{variant:"error"})}}),onCreateStudent:()=>x(a=>ue(a),{onSuccess(a){a.success&&(e("Tạo sinh viên thành công",{variant:"success"}),i.invalidateQueries({queryKey:["getAllStudent",S,T,s("limit"),s("page"),s("searchField"),s("keywords")]}))},onError(){e("Tạo sinh viên thất bại, thử lại",{variant:"error"})}}),handleGetAllStudent:()=>R(["getAllStudent",S,T,s("limit"),s("page"),s("searchField"),s("keywords")],()=>ie(S,T,s("limit"),s("page"),s("searchField"),s("keywords")),{onSuccess(a){const p=a.params?a.params.totalPage:0;l(X(p)),c(p)},staleTime:1e3*(60*10),refetchInterval:1e3*(60*20),keepPreviousData:!0}),onDeleteStudent:()=>x(a=>de(a),{onSuccess(a){a.success&&(e("Xóa sinh viên ra khỏi học kì.",{variant:"success"}),i.invalidateQueries({queryKey:["getAllStudent",S,T,s("limit"),s("page"),s("searchField"),s("keywords")]}))},onError(){e("Tạo sinh viên thất bại, thử lại",{variant:"error"})}})}},ge=e=>{let r=["B","KB","MB","GB","TB","PB"],n=0;for(n;e>1024;n++)e/=1024;return e.toFixed(1)+" "+r[n]};var ve=(e=>(e.SESSION_HOST="SESSION_HOST",e.ADVISOR="ADVISOR",e.REVIEWER="REVIEWER",e))(ve||{});const me=async e=>v.get(`/api/v1/evaluations/${e}`),Te=async(e,r)=>v.get(`/api/v1/evaluations?termId=${e}&type=${r}`),Se=async e=>v.post("api/v1/evaluations",e),xe=async(e,r)=>v.put(`api/v1/evaluations/${e}`,r),Be=async e=>v.delete(`api/v1/evaluations/${e}`);var H=(e=>(e.getEvaluationByType="getEvaluationByType",e.getEvaluationById="getEvaluationById",e))(H||{});const Ue=()=>{const{enqueueSnackbar:e}=F(),{lecturerStore:r}=D();return{handleGetEvalutationByType:(c,l)=>R(["getEvaluationByType",c,l],()=>Te(c,l),{staleTime:1e3}),handleUiRender:()=>{const c=r.currentRoleRender;var l=[];return c===M.HEAD_COURSE||c===M.HEAD_LECTURER?l.push("all"):l.push("readOnly"),l},handleGetEvaluationById:c=>R(["getEvaluationById",c],()=>me(c),{enabled:!!c}),onUpdateEvaluationById:(c,l,y)=>x(k=>xe(y,k),{onSuccess(){e("Cập nhật tiêu chí đánh giá thành công",{variant:"success"}),i.invalidateQueries({queryKey:["getEvaluationByType",c,l]}),i.invalidateQueries({queryKey:["getEvaluationById",y]})},onError(){e("Cập nhật tiêu chí đánh giá thất bại",{variant:"error"})}}),onDeleteEvaluationById:(c,l,y)=>x(()=>Be(y),{onSuccess(){e("Xóa tiêu chí đánh giá thành công",{variant:"success"}),i.invalidateQueries({queryKey:["getEvaluationByType",c,l]})},onError(){e("Xóa tiêu chí đánh giá thất bại",{variant:"error"})}}),onCreateEvaluation:(c,l)=>x(y=>Se(y),{onSuccess(){e("Tạo tiêu chí đánh giá thành công",{variant:"success"}),i.invalidateQueries({queryKey:["getEvaluationByType",c,l]})},onError(){e("Tạo tiêu chí đánh giá thất bại",{variant:"error"})}})}},fe=async e=>v.get(`/api/v1/topics/${e}`),je=async(e,r)=>v.get(`/api/v1/topics?termId=${e}&majorId=${r}`),Ee=async(e,r)=>v.get(`/api/v1/topics?lecturerId=${e}&termId=${r}`),be=async(e,r)=>v.post(`/api/v1/topics?termId=${r}`,e),ke=async(e,r)=>v.put(`/api/v1/topics/${e}`,r),Ie=async(e,r)=>v.put(`/api/v1/topics/${e}/status`,r),Ae=async e=>v.delete(`/api/v1/topics/${e}`);var L=(e=>(e.create="create",e.update="update",e.getAll="getAll",e.getById="getById",e.delete="delete",e))(L||{});const K=(e,r)=>{let n="";switch(e){case"create":n="Tạo "+r+" thành công";break;case"update":n="Cập nhật "+r+" thành công";break;case"getAll":break;case"getById":break;case"delete":n="Xóa "+r+" thành công";break}return n};var Q=(e=>(e.getAllTopicByTermMajor="getAllTopicByTermMajor",e.getAllTopic="getAllTopic",e.getTopicById="getTopicById",e.getAllTopicByLecturerTerm="getAllTopicByLecturerTerm",e))(Q||{});const $e=()=>{const{enqueueSnackbar:e}=F(),r=V(o=>o.topicSlice),{termStore:n}=O(),{majorStore:d}=P(),{lecturerStore:h}=D();return{topicStore:r,handleTopicsByTermByMajor:()=>R(["getAllTopicByTermMajor",n.currentTerm.id,d.currentMajor.id],()=>je(n.currentTerm.id,d.currentMajor.id),{staleTime:1/0}),handleTopicsByLecturerByTerm:()=>R(["getAllTopicByLecturerTerm",h.me.user.id,n.currentTerm.id],()=>Ee(h.me.user.id,n.currentTerm.id),{staleTime:1/0,onSuccess(o){}}),handleUiRender:()=>{const o=h.currentRoleRender;var u=[];return o===M.HEAD_LECTURER?(u.push("all"),u.push("crud")):o===M.LECTURER?u.push("crud"):u.push("readOnly"),u},handleTopicById:o=>R(["getTopicById",o],()=>fe(o)),onCreateTopicByToken:()=>x(o=>be(o,n.currentTerm.id),{onSuccess(){e(K(L.create,"Đề tài"),{variant:"success"}),i.invalidateQueries({queryKey:["getAllTopicByTermMajor",n.currentTerm.id,d.currentMajor.id]}),i.invalidateQueries({queryKey:["getAllTopicByLecturerTerm",h.me.user.id,n.currentTerm.id]})},onError(){e("Tạo đề tài thất bại",{variant:"error"})}}),onUpdateTopicById:o=>x(u=>ke(o,u),{onSuccess(){e(K(L.update,"Đề tài"),{variant:"success"}),i.invalidateQueries({queryKey:["getAllTopicByTermMajor",n.currentTerm.id,d.currentMajor.id]}),i.invalidateQueries({queryKey:["getAllTopicByLecturerTerm",h.me.user.id,n.currentTerm.id]}),i.invalidateQueries({queryKey:["getTopicById",o]}),i.invalidateQueries({queryKey:["getAllTopicByLecturerTerm",h.me.user.id,n.currentTerm.id]})},onError(){e("Cập nhật tài thất bại vui lòng thử lại sau",{variant:"error"})}}),onDeleteTopicById:()=>x(o=>Ae(o),{onSuccess(){e(K(L.delete,"Đề tài"),{variant:"success"}),i.invalidateQueries({queryKey:["getAllTopicByTermMajor",n.currentTerm.id,d.currentMajor.id]}),i.invalidateQueries({queryKey:["getAllTopicByLecturerTerm",h.me.user.id,n.currentTerm.id]})},onError(){e("Xóa đề tài thất bại vui lòng thử lại sau",{variant:"error"})}}),onUpdateStatusTopic:o=>x(u=>Ie(o,u),{onSuccess(){e(K(L.update,"Đề tài"),{variant:"success"}),i.invalidateQueries({queryKey:["getAllTopicByTermMajor",n.currentTerm.id,d.currentMajor.id]}),i.invalidateQueries({queryKey:["getTopicById",o]})},onError(){e("Cập nhật đề tài thất bại vui lòng thử lại sau",{variant:"error"})}})}},Ce=["xlsx","xls","csv"];var Re=(e=>(e.STUDENT="students",e.LECTURER="lecturers",e.TOPIC="topics",e.EVALUATION="evaluations",e))(Re||{});const U=J.create({headers:{"Content-Type":"multipart/form-data"}});U.interceptors.request.use(e=>{const r=z("accessToken");return r&&(e.headers.Authorization=`Bearer ${r}`),e},e=>Promise.reject(e));U.interceptors.response.use(e=>e.data,async e=>{const r=e.config;if(e.response.data.status===401&&e.response.data.success===!1){r._retry=!0;try{const n=z("refreshToken"),d=await v.post("/api/v1/lecturers/refresh-token",{refreshToken:n});return localStorage.setItem("accessToken",JSON.stringify(d.accessToken)),r.headers.Authorization=`Bearer ${d.accessToken}`,v(r)}catch(n){return Promise.reject(n)}}return Promise.reject(e.response.data)});const Le=(e,r,n,d,h)=>{const[T,S]=C.useState(!1),[s,c]=C.useState(!1),[l,y]=C.useState(""),[k,E]=C.useState(""),[o,u]=C.useState(),{enqueueSnackbar:B}=F(),[q,a]=C.useState(0),p=b=>{const g=b.name.split("."),I=g[g.length-1];return Ce.includes(I)};return{importExcel:async b=>{const g=b.target.files[0];y(g.name),E(ge(g.size));const I=new FileReader;c(!1),S(!0),g?(u(g),p(g)?I.readAsBinaryString(g):B("File tải lên không đúng định dạng Excel, CSV file",{variant:"error"})):B("Đã có lỗi khi tải lên, vui lòng thử lại sau...",{variant:"error"})},setFileName:y,setTotalSize:E,setCurrentFile:u,setValueLoading:a,savedFileToDatabase:async b=>{const g={file:b,termId:r,majorId:n},I={termId:r,file:b,type:h};return U.post(`${Y.BASE_URL}/api/v1/${e}/import`,e!=="evaluations"?g:I,{headers:{"Content-Type":"multipart/form-data"},onUploadProgress:A=>{a(A.progress)}}).then(async function(A){A.success&&(e==="lecturers"&&(B("Lưu danh sách giảng viên từ excel file thành công",{variant:"success"}),i.invalidateQueries([se.getAllLecturer,n,10,1,"username",""])),e==="evaluations"&&(B("Lưu danh sách tiêu chí từ excel file thành công",{variant:"success"}),i.invalidateQueries({queryKey:[H.getEvaluationByType,r,h]})),e==="students"&&(B("Lưu danh sách sinh viên từ excel file thành công",{variant:"success"}),i.invalidateQueries({queryKey:[_.getAllStudent,r,n,10,1,"username",""]})),e==="topics"&&(B("Lưu danh sách Đề tài từ excel file thành công",{variant:"success"}),i.invalidateQueries({queryKey:[Q.getAllTopicByTermMajor,r,n]}),i.invalidateQueries({queryKey:[Q.getAllTopicByLecturerTerm,d.id,r]})))}).catch(function(A){B(A.message,{variant:"error"})})},currentFile:o,success:s,loading:T,fileName:l,valueLoading:q,totalSize:k}};function qe(e){return t.jsxs(m,{sx:{display:"flex",alignItems:"center"},children:[t.jsx(m,{sx:{width:"100%",mr:1},children:t.jsx(ne,{variant:"determinate",...e})}),t.jsx(m,{sx:{minWidth:35},children:t.jsx(j,{variant:"body2",color:"text.secondary",children:`${Math.round(e.value)}%`})})]})}const we=Z("input")({clip:"rect(0 0 0 0)",clipPath:"inset(50%)",height:"100%",overflow:"hidden",position:"absolute",bottom:0,left:0,whiteSpace:"nowrap",width:"100%",backgroundColor:"red"});function Ne(e){const{entityUpload:r,typeEvaluation:n,label:d="Tải dữ liệu lên từ Excel",labelToolTip:h="",disabled:T=!1}=e,{termStore:S}=O(),{majorStore:s}=P(),{lecturerStore:c}=D(),[l,y]=C.useState(!1),{importExcel:k,valueLoading:E,totalSize:o,currentFile:u,savedFileToDatabase:B,setFileName:q,setTotalSize:a,setCurrentFile:p,setValueLoading:$,fileName:N}=Le(r,S.currentTerm.id,s.currentMajor.id,c.me.user,n),b=()=>{y(!0)},g=()=>{y(!1),I()},I=()=>{q(""),a(""),$(""),p(void 0)};return t.jsxs(m,{children:[t.jsx(pe,{arrow:!0,title:h,children:t.jsxs(w,{size:"small",disabled:T,onClick:b,variant:"contained",color:"primary",children:[t.jsx(f,{icon:"uiw:file-excel",style:{marginRight:2},width:20}),d]})}),t.jsx(ae,{maxWidth:"md",open:l,onClose:g,children:t.jsxs(G,{sx:{px:10,py:7},elevation:3,children:[t.jsx(m,{display:"flex",gap:4,children:t.jsx(ee,{mb:4,variant:"h4",textTransform:"uppercase",children:"Tải File Excel"})}),t.jsx(G,{elevation:1,sx:{px:10,py:12,mb:6},children:t.jsx(m,{sx:{border:2,borderColor:"primary.main",borderRadius:1},style:{borderStyle:"dashed"},children:u?t.jsxs(m,{height:300,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",children:[t.jsx(f,{color:"#40bb92",width:150,icon:"teenyicons:file-tick-solid"}),t.jsxs(j,{mt:6,variant:"h5",color:"success.dark",children:[t.jsx(f,{icon:"teenyicons:tick-circle-solid"})," Đã tải file lên thành công"]})]}):t.jsxs(w,{component:"label",sx:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",py:20},children:[t.jsx(we,{type:"file",onChange:A=>k(A)}),t.jsx(m,{bgcolor:"rgb(0,82,177,0.2)",p:10,borderRadius:"50%",width:100,height:100,children:t.jsx(f,{color:"rgb(0,82,177,0.7)",width:"full",height:"full",icon:"line-md:uploading-loop"})}),t.jsxs(j,{fontWeight:"600",textTransform:"uppercase",color:"grey.600",mt:6,variant:"h4",children:[t.jsx(f,{style:{marginRight:2},icon:"fxemoji:warningsign"}),"Chưa có file tải lên ngay"]})]})})}),t.jsx(m,{children:u!==void 0?t.jsxs(te,{sx:{p:6,borderRadius:2,bgcolor:"rgb(0,82,177,0.1)"},children:[t.jsxs(m,{gap:6,alignItems:"center",display:"flex",children:[t.jsx(f,{width:50,icon:"vscode-icons:file-type-excel",color:"rgb(0,82,177,0.8)"}),t.jsxs(m,{width:320,children:[t.jsxs(j,{variant:"h6",color:"primary.dark",children:["tên file:"," ",t.jsx(j,{component:"span",variant:"h6",color:"grey.800",children:N})]}),t.jsxs(j,{variant:"h6",color:"primary.dark",children:["kích thước:"," ",t.jsx(j,{component:"span",variant:"h6",color:"grey.800",children:o})]})]}),t.jsx(m,{})]}),t.jsxs(j,{mt:8,variant:"body1",color:"initial",children:["Tiến độ lưu: ",E*100," %"]}),t.jsx(qe,{value:E*100}),E===1&&t.jsxs(j,{textAlign:"end",variant:"h6",fontWeight:700,color:"success.main",children:["Lưu thành công",t.jsx(f,{icon:"mdi:tick-outline",width:18})]})]}):t.jsx(re,{})}),t.jsxs(m,{mt:10,justifyContent:"end",gap:4,display:"flex",children:[t.jsxs(w,{variant:"contained",color:"primary",onClick:g,children:[t.jsx(f,{icon:"mdi:close-outline"}),"Thoát"]}),t.jsxs(w,{color:"success",variant:"contained",disabled:u===void 0,onClick:()=>B(u),children:[t.jsx(f,{width:20,style:{marginRight:10},icon:"iconoir:db-check"}),"Lưu vào hệ thống"]})]})]})})]})}export{Ne as M,Re as T,$e as a,Ue as b,ve as c,De as u};