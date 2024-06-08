import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

// active

function LecturerPage() {
  return (
    <Box width={'100%'}>
      <Outlet />
    </Box>
  );
}

export default LecturerPage;
