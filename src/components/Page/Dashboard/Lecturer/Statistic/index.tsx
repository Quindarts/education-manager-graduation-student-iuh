import React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { Person, Group, Book, School } from '@mui/icons-material';
import StatisticsCard from './Card';
import useStatistical from '@/hooks/api/useQueryStatistical';

function StatisticManager() {
  const {
    grLecturerCountOfgrLecturer,
    registeredTopicCountOfLecturer,
    approvedTopicCountOfLecturer,
    groupStudentCountOfLecturer,
    handleGetCountOfDashBoardLecturerRole,
  } = useStatistical();
  handleGetCountOfDashBoardLecturerRole();
  const stats = [
    {
      title: 'Nhóm sinh viên đang hướng dẫn',
      value: groupStudentCountOfLecturer,
      icon: <Group />,
      link: '/group-supports',
    },
    {
      title: 'Tổng số đề tài của tôi',
      value: registeredTopicCountOfLecturer,
      icon: <Person />,
      link: '/topic-lecturers',
    },
    { title: 'Số lượng đề tài được duyệt', value: approvedTopicCountOfLecturer, icon: <Book />, link: '/topic-lecturers' },
    { title: 'Số nhóm giảng viên của tôi', value: grLecturerCountOfgrLecturer, icon: <School />, link: '/my-group-lecturers' },
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