import React, { useLayoutEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Box } from '@mui/material';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useAuth } from '@/hooks/api/useAuth';
import { APP_SIDEBAR, AppSiderBarType } from '@/utils/app-config';
import Loading from '@/components/ui/Loading';
import { useMajor } from '@/hooks/api/useQueryMajor';

function MainLayout() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const handleOpenSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  const { handleGetCurrentTerm } = useTerm();
  const { handleGetAllMajor } = useMajor();
  handleGetCurrentTerm();
  handleGetAllMajor();

  const { handleGetMe, lecturerStore } = useAuth();
  const [currentSidebarRole, setCurrentSidebarRole] = useState<AppSiderBarType[]>([]);
  const { isLoading } = handleGetMe();

  useLayoutEffect(() => {
    APP_SIDEBAR.map((item: any) => {
      item.roles.forEach((role: string) => {
        if (role === lecturerStore.currentRoleRender) {
          currentSidebarRole.push(item);
          setCurrentSidebarRole(currentSidebarRole);
        }
      });
    });
  }, [lecturerStore.currentRoleRender]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Box
          display='flex'
          sx={{
            height: '100%',
            overflowX: 'hidden',
          }}
        >
          <AdminSidebar
            isOpenSideBar={isOpenSideBar}
            currentSidebar={currentSidebarRole}
            handleOpenSideBar={handleOpenSideBar}
          />
          <Box
            height='100%'
            component='section'
            sx={{
              maxWidth: isOpenSideBar ? `calc(100vw - 250px)` : `calc(100vw - 76px)`,
              width: '100%',
              minHeight: '100vh',
              marginLeft: isOpenSideBar ? '250px' : '76px',
              transition: 'all 0.1s ease',
              backgroundColor: 'grey.100',
            }}
          >
            <Navbar isOpenSideBar={isOpenSideBar} handleOpenSideBar={handleOpenSideBar} />
            <Box
              pt={12}
              pb={6}
              mx={8}
              mt={30}
              sx={{
                height: '100%',
              }}
            >
              {lecturerStore.currentRoleRender.length > 0 ? (
                <Outlet />
              ) : (
                <Navigate to='/auth/role' />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default React.memo(MainLayout);
