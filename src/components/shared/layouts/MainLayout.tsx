import React, { useLayoutEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
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
  const [currentMaxWidth, setCurrentMaxWidth] = useState('272');
  useLayoutEffect(() => {
    if (isOpenSideBar == true) setCurrentMaxWidth('272');
    else setCurrentMaxWidth('100');
  }, [isOpenSideBar]);
  return (
    <Box
      display='flex'
      sx={{
        height: '100%',
      }}
    >
      <AdminSidebar isOpenSideBar={isOpenSideBar} handleOpenSideBar={handleOpenSideBar} />
      <Box
        height='100%'
        bgcolor={'background.paper'}
        sx={{ maxWidth: `calc(100vw - ${currentMaxWidth}px)`, width: '100%', minHeight: '100vh' }}
      >
        <Navbar isOpenSideBar={isOpenSideBar} handleOpenSideBar={handleOpenSideBar} />
        <Box
          pt={12}
          pb={6}
          px={8}
          sx={{
            height: '100%',
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <SpeedDial
        ariaLabel='SpeedDial basic example'
        sx={{ position: 'fixed', bottom: 30, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default React.memo(MainLayout);
