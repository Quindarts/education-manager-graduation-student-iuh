import MainLayout from '@/components/shared/layouts/MainLayout';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import { Navigate } from 'react-router-dom';

function PrivateRouter() {
  const accessToken: string = getValueFromLocalStorage('accessToken') || '';
  // const accessToken = true;

  return getValueFromLocalStorage('accessToken') ? <MainLayout /> : <Navigate to='/auth/login' />;
}

export default PrivateRouter;
