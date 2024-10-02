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
        color: 'grey.200',
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(135deg, #0d5db6, #6a11cb, #2575fc, #7bdcb5)',
        backgroundSize: '200% 200%',
        borderRadius: 2,
        transition: 'background-position 0.5s ease-in-out',
        '&:hover': {
          backgroundPosition: 'right center',
          boxShadow: '0px 8px 30px rgba(191, 191, 191, 0.8)',
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2 }}>{icon}</Box>
          <Typography variant='body1'>{title}</Typography>
        </Box>
        <Box mt={4} display={'flex'} justifyContent={'space-between'}>
          <Typography variant='h4' fontWeight={'800'} color='grey.200'>
            {value}
          </Typography>
          <Link to={link} style={{ color: 'white', fontSize: 12 }}>
            Xem chi tiết
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
