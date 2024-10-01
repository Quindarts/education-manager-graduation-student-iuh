import React from 'react';
import { Card, CardContent, Typography, CardProps, Box } from '@mui/material';
import { Link } from 'react-router-dom';

interface StatisticsCardProps extends CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value,link, icon, ...props }) => {
  return (
    <Card
      {...props}
      sx={{
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        '&:hover': {
          boxShadow: ' rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;',
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2 }}>{icon}</Box>
          <Typography variant='body1'>{title}</Typography>
        </Box>
        <Box mt={4} display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h4' fontWeight={'800'} color='success.dark'>
            {value}
          </Typography>
          <Link to={link} style={{ color: '#012f6f', fontSize: 12 }}>
            Xem chi tiết
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
