import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../Sidebar';
import Navbar from '../Navbar';
import { Box } from '@mui/material';

function MainLayout() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const handleOpenSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };
  return (
    <Box
      display='flex'
      sx={{
        backgroundColor: 'background.default',
        height: '100%',
      }}
    >
      <AdminSidebar isOpenSideBar={isOpenSideBar} handleOpenSideBar={handleOpenSideBar} />
      <Box width='100%' height='100%' minHeight='100vh'>
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
    </Box>
  );
}

export default React.memo(MainLayout);
