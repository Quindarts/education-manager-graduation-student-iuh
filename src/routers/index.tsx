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
import LecturerPage from '@/page/Lecturer';
import GroupLecturerPage from '@/page/GroupLecturer';
import StudentPage from '@/page/Student';
import GroupStudentPage from '@/page/GroupStudent';
import GroupSupportPage from '@/page/GroupSupport';
import TopicPage from '@/page/Topic';
import ReviewManagerPage from '@/page/ReviewManager';
import GroupGradingAssemblyPage from '@/page/GroupLecturer/GroupAssembly';
import ComponentPage from '@/page/ComponentPage';

function Routing() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<PrivateRouter />}>
          <Route index path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={APP_ROUTES.TERM.ALL} element={<TermPage />} />

          <Route path={APP_ROUTES.LECTURER.ALL} element={<LecturerPage />} />
          <Route path={APP_ROUTES.STUDENT.ALL} element={<StudentPage />} />
          <Route path={APP_ROUTES.USER.ALL} element={<h1>user</h1>} />
          <Route path={APP_ROUTES.TOPIC.ALL} element={<TopicPage />} />
          <Route path={APP_ROUTES.REVIEW.ALL} element={<ReviewManagerPage />} />
          <Route path={APP_ROUTES.GROUP_STUDENT.ALL} element={<GroupStudentPage />} />

          <Route path={APP_ROUTES.GROUP_SUPPORT.ALL} element={<GroupSupportPage />} />
          <Route path={APP_ROUTES.USER.REGISTER} element={<Register />} />
          <Route path={APP_ROUTES.USER.PROFILE} element={<h1>Profile</h1>} />
          <Route path={APP_ROUTES.USER.ROLE} element={<h1>ROLE</h1>} />

          <Route path={APP_ROUTES.GROUP_LECTURER.ALL} element={<GroupLecturerPage />} />
          <Route path={APP_ROUTES.GROUP_LECTURER.ASSEMBLY} element={<GroupGradingAssemblyPage />} />
          <Route path={'/componentpage'} element={<ComponentPage />} />
          {/* <Route path={APP_ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={APP_ROUTES.SUCCESS_MESSAGE} element={<SuccessMessagePage />} /> */}
        </Route>
        <Route path='/auth' element={<AuthLayout />}>
          <Route index path={APP_ROUTES.USER.LOGIN} element={<Login />} />
        </Route>
        <Route path='*' element={<h1>404</h1>} />
      </Routes>
    </React.Suspense>
  );
}

export default Routing;
