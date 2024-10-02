import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import PromotionTextContent from '@/components/ui/PromotionTextContent';
import StatisticManager from './Statistic';
import CalendarSection from './Calendar';
import { BarChart, PieChart } from '@mui/x-charts';

export default function DashboardOfAdmin() {
  return (
    <Box sx={{ px: 10, bgcolor: 'white', py: 10, minHeight: '60vh' }}>
      <>
        <Box mt={8} display={'flex'} gap={8}>
          <Box>
            <Typography fontWeight={700} color='black ' component={'h5'} variant='h5'>
              Danh sách quản lý
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
                Thống kê
              </Typography>
              <Box>
                <BarChart
                  series={[
                    { data: [35, 44, 24, 34] },
                    { data: [51, 6, 49, 30] },
                    { data: [15, 25, 30, 50] },
                    { data: [60, 50, 15, 25] },
                  ]}
                  height={290}
                  xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                />
              </Box>
            </Paper>
            <Paper sx={{ px: 10, py: 4, width: '30%' }}>
              {/* 
              <CalendarSection /> */}
              <Typography mb={6} mt={10} variant='h6' fontWeight={'bold'} color='grey.700'>
                Phổ điểm 
              </Typography>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 9 },
                      { id: 1, value: 8 },
                      { id: 2, value: 6.5 },
                      { id: 3, value: 6.5 },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Paper>
          </Box>
        </Box>
      </>
    </Box>
  );
}
