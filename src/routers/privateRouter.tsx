import { getValueFromLocalStorage } from '@/utils/localStorage';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/components/shared/layouts/MainLayout';


function PrivateRouter() {
  return getValueFromLocalStorage('accessToken') ? (
    <MainLayout />
  ) : (
    <Navigate to='/auth/login' />
  );
}

export default PrivateRouter;
