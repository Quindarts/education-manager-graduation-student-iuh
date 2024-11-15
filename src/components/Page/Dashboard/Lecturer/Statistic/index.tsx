import React from 'react';
import { Box, Grid } from '@mui/material';
import { Group, Book } from '@mui/icons-material';
import useStatistical from '@/hooks/api/useQueryStatistical';
import StatisticsCard from '../../Card';

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
      title: 'Nhóm sinh viên hướng dẫn',
      value: groupStudentCountOfLecturer,
      icon: <Group />,
      link: '/group-supports',
      colorIcon: '#e3ffe6',
      subLabel: 'nhóm',
    },
    {
      title: 'Tổng số đề tài của tôi',
      value: registeredTopicCountOfLecturer,
      icon: <Book />,
      link: '/topic-lecturers',
      colorIcon: '#ddffff',
      subLabel: 'đề tài',
    },
    {
      title: 'Số  đề tài được duyệt',
      value: approvedTopicCountOfLecturer,
      icon: <Book />,
      link: '/topic-lecturers',
      colorIcon: '#fee6ea',
      subLabel: 'đề tài',
    },
    {
      title: 'Số nhóm giảng viên của tôi',
      value: grLecturerCountOfgrLecturer,
      icon: <Group />,
      link: '/my-group-lecturers',
      colorIcon: '#ffd391',
      subLabel: 'nhóm',
    },
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
                colorIcon={stat.colorIcon}
                subLabel={stat.subLabel}
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
