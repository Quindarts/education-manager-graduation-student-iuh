import React from 'react';
import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';

const data = [50, 30, 20, 40];
const labels = ['Transactions', 'Payouts', 'Sales', 'Reports'];
const colors = ['#2499EF', '#8C8DFF', '#FFC675', '#8CA3BA'];
var options = {
  series: [44, 55, 13, 33],
  chart: {
    width: 380,
    type: 'donut',
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  legend: {
    position: 'right',
    offsetY: 0,
    height: 230,
  },
};

const PieChart = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        Project Status
      </Typography>
      <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'center' }}>
        <Chart series={data} type='donut' />
      </Box>
      <Box
        sx={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <Typography sx={{ marginBottom: 1, fontWeight: 'bold', color: 'gray' }} variant='body2'>
          Avg Range
        </Typography>
        <Typography sx={{ marginLeft: 1, fontWeight: 'bold', fontSize: '3rem' }}>140</Typography>
      </Box>
    </Box>
  );
};

export default PieChart;
