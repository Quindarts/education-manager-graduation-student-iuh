import MainLayout from '@/components/shared/layouts/MainLayout';
import { useAuth } from '@/hooks/api/useAuth';
import { getValueFromLocalStorage } from '@/utils/localStorage';
import { useLayoutEffect } from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRouter() {
  const accessToken: string = getValueFromLocalStorage('accessToken') || '';
  // const accessToken = true;

  return accessToken ? <MainLayout /> : <Navigate to='/auth/login' />;
}

export default PrivateRouter;
