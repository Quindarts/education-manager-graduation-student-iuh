import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useAuth } from '@/hooks/api/useAuth';
import { APP_SIDEBAR, AppSiderBarType } from '@/utils/app-config';
import Loading from '@/components/ui/Loading';
const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

function MainLayout() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const handleOpenSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  const { handleGetCurrentTerm } = useTerm();

  handleGetCurrentTerm();

  const { handleGetMe, lecturerStore } = useAuth();
  const [currentSidebarRole, setCurrentSidebarRole] = useState<AppSiderBarType[]>([]);
  const { isLoading } = handleGetMe();

  useLayoutEffect(() => {
    APP_SIDEBAR.map((item: any) => {
      item.roles.forEach((role: string) => {
        if (role === lecturerStore.me.role) {
          currentSidebarRole.push(item);
          setCurrentSidebarRole(currentSidebarRole);
        }
      });
    });
  }, [lecturerStore]);

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
              <Outlet />
            </Box>
          </Box>
          {/* <SpeedDial
            ariaLabel='SpeedDial basic example'
            sx={{ position: 'fixed', bottom: 30, right: 16 }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
            ))}
          </SpeedDial> */}
        </Box>
      )}
    </>
  );
}

export default React.memo(MainLayout);
