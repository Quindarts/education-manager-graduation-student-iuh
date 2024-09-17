import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import PromotionTextContent from '@/components/ui/PromotionTextContent';
import StatisticManager from './Statistic';
import CalendarSection from './Calendar';

export default function DashboardOfAdmin() {
  return (
    <Box sx={{ px: 10, bgcolor: 'white', py: 2, minHeight: '60vh' }}>
      <>
        <Box mt={8} display={'flex'} gap={8}>
          <Box>
            <Typography fontWeight={700} color='text.primary' component={'h5'} variant='h4'>
              Tổng quan dữ liệu trang Quản lý Khóa luận Tốt nghiệp Học kì I 2024 - 2025
            </Typography>
          </Box>
        </Box>
        <Box my={10}>
          <Box my={4}>
            <StatisticManager />
          </Box>
          <Box id='calendar' gap={8} display={'flex'} my={10}>
            <Paper sx={{ px: 10, py: 4, width: '100%' }}>
              {' '}
              <Typography mb={6} mt={10} variant='h6' fontWeight={'bold'} color='grey.700'>
                Sự kiện
              </Typography>
              <Box>
                <PromotionTextContent />
              </Box>
            </Paper>
            <Paper sx={{ px: 10, py: 4, width: '40%' }}>
              <Typography mb={6} mt={10} variant='h6' fontWeight={'bold'} color='grey.700'>
                Lịch làm việc của tôi{' '}
              </Typography>
              <CalendarSection />
            </Paper>
          </Box>
        </Box>
      </>
    </Box>
  );
}
