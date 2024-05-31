import { Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

function GroupSupportPage() {
  return (
    <Paper>
      <Outlet />
    </Paper>
  );
}

export default GroupSupportPage;
