import MainLayout from '@/components/shared/layouts/MainLayout';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import { Navigate } from 'react-router-dom';

function PrivateRouter() {
  return getValueFromLocalStorage('refreshToken') ? <MainLayout /> : <Navigate to='/auth/login' />;
}

export default PrivateRouter;
