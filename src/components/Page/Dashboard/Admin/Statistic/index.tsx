import React from 'react';
import { Box, Grid } from '@mui/material';
import { Person, Group, Book, School } from '@mui/icons-material';
import StatisticsCard from '../../Card';
import useStatistical from '@/hooks/api/useQueryStatistical';

function StatisticManager() {
  const { studentCount, lecturerCount, groupStudentCount, topicCount, handleGetCountOfDashboard } =
    useStatistical();
  handleGetCountOfDashboard();
  const stats = [
    {
      title: 'Số nhóm sinh viên',
      value: groupStudentCount,
      icon: <Group />,
      link: '/group-students',
    },
    { title: 'Số lượng đề tài', value: topicCount, icon: <Book />, link: '/topics' },
    {
      title: 'Số lượng giảng viên',
      value: lecturerCount,
      icon: <Person />,
      link: '/lecturer-terms',
    },
    { title: 'Số lượng sinh viên', value: studentCount, icon: <School />, link: '/students/query' },
  ];
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
                link={stat.link}
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
