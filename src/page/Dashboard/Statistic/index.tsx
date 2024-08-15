import React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { Person, Group, Book, School } from '@mui/icons-material';
import StatisticsCard from './Card';

const stats = [
  { title: 'Số nhóm sinh viên', value: 120, icon: <Group /> },
  { title: 'Số lượng đề tài', value: 30, icon: <Book /> },
  { title: 'Số lượng giảng viên', value: 13, icon: <Person /> },
  { title: 'Số lượng sinh viên', value: 255, icon: <School /> },
];
function StatisticManager() {
  return (
    <Box sx={{ maxWidth: '100%', width: '100%' }}>
      <Grid container spacing={10}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box>
              <StatisticsCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                sx={{ bgcolor: 'background.paper', boxShadow: 3 }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default StatisticManager;
