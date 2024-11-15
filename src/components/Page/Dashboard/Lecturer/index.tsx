import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import StatisticManager from './Statistic';
import TimeLine from './Timeline';
import EventManagement from '../EventManagement';

export default function DashboardOfLecturer() {
  return (
    <>
      <Paper sx={{ px: 20, py: 20, mb: 10 }}>
        <Box display={'flex'} gap={8}>
          <StatisticManager />
        </Box>
      </Paper>
      <EventManagement />
    </>
  );
}
