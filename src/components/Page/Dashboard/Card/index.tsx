import React from 'react';
import { Card, CardContent, Typography, CardProps, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

interface StatisticsCardProps extends CardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  link: string;
  colorIcon: string;
  subLabel: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value,
  link,
  icon,
  colorIcon,
  subLabel,
  ...props
}) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(link)}
      {...props}
      sx={{
        cursor: 'pointer',
        color: 'grey.700',
        width: '100%',
        height: 100,
        display: 'flex',
        alignItems: 'center',
        // backgroundImage: 'linear-gradient(135deg, #0d5db6, #6a11cb, #2575fc, #7bdcb5)',
        border: '1px solid #e2dddd',
        backgroundSize: '200% 200%',
        borderRadius: 2,
        transition: 'background-position 0.5s ease-in-out',
        '&:hover': {
          backgroundPosition: 'right center',
          boxShadow: '0px 2px 3px rgba(191, 191, 191, 0.8)',
        },
      }}
      elevation={0}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ mr: 2, bgcolor: colorIcon, px: 4, py: 3, borderRadius: 2 }}>{icon}</Box>
          <Typography variant='body1'>{title}</Typography>
        </Box>
        <Box mt={4} display={'flex'} justifyContent={'end'}>
          <Typography variant='h4' textAlign={'right'} fontWeight={'800'} color='grey.700'>
            {value}
            <Typography mx={2} variant='body1' component={'span'} color='initial'>
              {subLabel}
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default React.memo(StatisticsCard);
