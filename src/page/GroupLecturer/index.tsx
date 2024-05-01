import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

function GroupLecturerPage() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default GroupLecturerPage;
