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
      title: 'Nhóm sinh viên tham gia',
      value: groupStudentCount,
      icon: <Group />,
      link: '/group-students',
      colorIcon: '#e3ffe6',
      subLabel: 'nhóm',
    },
    {
      title: 'Đề tài đang quản lý',
      value: topicCount,
      icon: <Book />,
      link: '/topics',
      colorIcon: '#ddffff',
      subLabel: 'đề tài',
    },
    {
      title: 'Giảng viên tham gia',
      value: lecturerCount,
      icon: <Person />,
      link: '/lecturer-terms',
      colorIcon: '#fee6ea',
      subLabel: 'giảng viên',
    },
    {
      title: 'Sinh viên làm khóa luận',
      value: studentCount,
      icon: <School />,
      link: '/students/query',
      colorIcon: '#ffd391',
      subLabel: 'sinh viên',
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
