import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import PromotionTextContent from '@/components/ui/PromotionTextContent';
import StatisticManager from './Statistic';
import TimeLine from './Timeline';

export default function DashboardOfLecturer() {
  return (
    <Box sx={{ px: 10, bgcolor: 'white', py: 15, minHeight: '60vh' }}>
      <>
        <Box mt={8} display={'flex'} gap={8}>
          <Box>
            <Typography fontWeight={700} color='primary.dark' component={'h5'} variant='h5'>
              Danh sách quản lý
            </Typography>
          </Box>
        </Box>
        <Box my={10}>
          <Box my={4}>
            <StatisticManager />
          </Box>
          <Box id='calendar' gap={8} display={'flex'} minHeight={400} my={10}>
            <Paper sx={{ px: 10, py: 4 }}>
              {' '}
              <Typography mb={6} mt={10} variant='h6' fontWeight={'bold'} color='grey.700'>
                Các giai đoạn quản lý khóa luận
              </Typography>
              <Box mt={40}>
                <TimeLine />
              </Box>
            </Paper>
            <Paper sx={{ px: 4, py: 4, width: 500 }}>
              <Typography mb={6} mt={3} variant='h6' fontWeight={'bold'} color='grey.700'>
                Tỉ lệ đậu/ rớt nhóm hướng dẫn
              </Typography>
              <PromotionTextContent />
              {/* <PieChart /> */}
            </Paper>
          </Box>
        </Box>
      </>
    </Box>
  );
}
