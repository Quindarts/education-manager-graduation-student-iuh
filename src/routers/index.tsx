import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRouter from './privateRouter';
import Loading from '@/components/ui/Loading';
import { APP_ROUTES } from '@/utils/app-config';
import AuthLayout from '@/components/shared/layouts/AuthLayout/AuthLayout';
import Login from '@/page/auth/login';
import Register from '@/page/auth/register';
import Dashboard from '@/page/Dashboard/Dashboard';
import TermPage from '@/page/Term';
import StudentPage from '@/page/Student';
import TopicPage from '@/page/Topic';
import ReviewManagerPage from '@/page/ReviewManager';
import GroupGradingAssemblyPage from '@/page/GroupLecturer/GroupAssembly';
import ComponentPage from '@/page/ComponentPage';
import LecturerManagementPage from '@/page/Lecturer/Management';
import DetailsLecturerPage from '@/page/Lecturer/Details';
import GroupStudentManagement from '@/page/GroupStudent/Management';
import GroupStudentDetailPage from '@/page/GroupStudent/Detail';
import ScoreStudentPage from '@/page/ScoreStudent';
import GroupSupportManagement from '@/page/GroupSupport/Management';
import ScoreGroupSupport from '@/page/GroupSupport/ScoreManager';
import CreateGroupLecturer from '@/page/GroupLecturer/Create';
import RolePage from '@/page/auth/role';
import ProfilePage from '@/page/auth/profile';
import MyTopic from '@/page/MyTopic';
import MyGroupLecturer from '@/page/MyGroupLecturer';
import GroupLecturerManagementPage from '@/page/GroupLecturer/Management';
import GroupLecturerDetailPage from '@/page/GroupLecturer/Detail';
import MajorPage from '@/page/Major';
import MyDetailGroupLecturer from '@/page/MyGroupLecturer/Detail';
import NotificationManagementPage from '@/page/Notification/Management';
import RolePermissionPage from '@/page/RolePermission';

function Routing() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<PrivateRouter />}>
          //ROUTE HOME
          <Route index path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
          //ROUTE MAJOR
          <Route path={APP_ROUTES.MAJOR.MANAGEMENT} element={<MajorPage />} />
          //ROUTE TERM
          <Route path={APP_ROUTES.TERM.MANAGEMENT} element={<TermPage />} />
          //ROUTE LECTURER
          <Route path={APP_ROUTES.LECTURER.MANAGEMENT} element={<LecturerManagementPage />} />
          <Route path={APP_ROUTES.LECTURER.DETAILS} element={<DetailsLecturerPage />} />
          //ROUTE STUDENT
          <Route path={APP_ROUTES.STUDENT.MANAGEMENT} element={<StudentPage />} />
          //ROUTE USER
          <Route path={APP_ROUTES.USER.MANAGEMENT} element={<h1>user</h1>} />
          //ROUTE TOPIC
          <Route path={APP_ROUTES.TOPIC.MANAGEMENT} element={<TopicPage />} />
          <Route path={APP_ROUTES.TOPIC.LECTURER} element={<MyTopic />} />
          //ROUTE REVIEW
          <Route path={APP_ROUTES.REVIEW.MANAGEMENT} element={<ReviewManagerPage />} />
          //ROUTE GR_STUDENT
          {/* <Route path={APP_ROUTES.GROUP_STUDENT.MANAGEMENT} element={<GroupStudentPage />} /> */}
          <Route path={APP_ROUTES.GROUP_STUDENT.MANAGEMENT} element={<GroupStudentManagement />} />
          <Route path={APP_ROUTES.GROUP_STUDENT.DETAIL} element={<GroupStudentDetailPage />} />
          //ROUTE GR_SUPPORT
          <Route path={APP_ROUTES.GROUP_SUPPORT.MANAGEMENT} element={<GroupSupportManagement />} />
          <Route path={APP_ROUTES.GROUP_SUPPORT.SCORE} element={<ScoreGroupSupport />} />
          {/* <Route path={APP_ROUTES.GROUP_SUPPORT.DETAIL_SCORE_GROUP} element={<GroupSupportManagement />} /> */}
          //ROUTE USER
          <Route path={APP_ROUTES.USER.REGISTER} element={<Register />} />
          <Route path={APP_ROUTES.USER.PROFILE} element={<ProfilePage />} />
          //ROLE PERMISSION
          <Route path={APP_ROUTES.USER_AUTHORIZATION.MANAGEMENT} element={<RolePermissionPage />} />
          //ROUTE GR_LECTURER
          <Route
            path={APP_ROUTES.GROUP_LECTURER.MANAGEMENT}
            element={<GroupLecturerManagementPage />}
          />
          <Route path={APP_ROUTES.GROUP_LECTURER.ME} element={<MyGroupLecturer />} />
          <Route path={APP_ROUTES.GROUP_LECTURER.REPORT} element={<GroupGradingAssemblyPage />} />
          <Route path={APP_ROUTES.GROUP_LECTURER.CREATE} element={<CreateGroupLecturer />} />
          <Route path={APP_ROUTES.GROUP_LECTURER.DETAIL} element={<GroupLecturerDetailPage />} />
          <Route
            path={APP_ROUTES.GROUP_LECTURER.MY_DETAIL_GROUP}
            element={<MyDetailGroupLecturer />}
          />
          //Notification
          <Route
            path={APP_ROUTES.NOTIFICATION.MANAGEMENT}
            element={<NotificationManagementPage />}
          />
          <Route path={'/componentpage'} element={<ComponentPage />} />
          //ROUTE SCORE_STUDENT
          <Route path={APP_ROUTES.SCORE_STUDENT.MANAGEMENT} element={<ScoreStudentPage />} />
          {/* <Route path={APP_ROUTES.ROLE.ALL} element={<RolePage />} /> */}
          {/* <Route path={APP_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={APP_ROUTES.SUCCESS_MESSAGE} element={<SuccessMessagePage />} /> */}
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index path={APP_ROUTES.ROLE.ALL} element={<RolePage />} />
          <Route index path={APP_ROUTES.USER.LOGIN} element={<Login />} />
        </Route>
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </React.Suspense>
  );
}

export default Routing;
