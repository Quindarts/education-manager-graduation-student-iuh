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

function Routing() {
  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<PrivateRouter />}>
          <Route index path={APP_ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={APP_ROUTES.TERM.ALL} element={<TermPage/>} />

          <Route path={APP_ROUTES.LECTURER.ALL} element={<h1>Add  LECTURER</h1>} />
          <Route path={APP_ROUTES.STUDENT.ALL} element={<h1>STUDENT LIST</h1>} />
          <Route path={APP_ROUTES.USER.ALL} element={<h1>user</h1>} />
          <Route path={APP_ROUTES.LECTURER.ALL} element={<h1>LECTURER</h1>} />
          <Route path={APP_ROUTES.TOPIC.ALL} element={<h1>TOPIC</h1>} />
          <Route path={APP_ROUTES.REVIEW.ALL} element={<h1>REVIEW</h1>} />
          <Route path={APP_ROUTES.GROUP_STUDENT.ALL} element={<h1>GROUP_STUDENT.ALL</h1>} />
          <Route path={APP_ROUTES.GROUP_LECTURER.ALL} element={<h1>GROUP_LECTURER.ALL</h1>} />
          <Route path={APP_ROUTES.GROUP_SUPPORT.ALL} element={<h1>GROUP_SUPPORT</h1>} />
      
          
          <Route path={APP_ROUTES.USER.REGISTER} element={<Register />} />
          <Route path={APP_ROUTES.USER.PROFILE} element={<h1>Profile</h1>} />
          <Route path={APP_ROUTES.USER.ROLE} element={<h1>ROLE</h1>} />
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
