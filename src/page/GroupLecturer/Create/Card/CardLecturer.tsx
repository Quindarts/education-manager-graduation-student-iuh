import { Icon } from '@iconify/react';
import { Avatar, Box, IconButton, Paper, Typography } from '@mui/material';
import React from 'react';

function CardLecturer(props: any) {
  const { key, id, draggable, onDragStart, onDragEnd, lecturer } = props;
  return (
    <Paper
      key={key}
      id={id}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{
        my: 6,
        py: 4,
        px: 6,
        display: 'flex',
        cursor: 'pointer',
        gap: 20,
        justifyContent: 'space-around',
        borderRadius: 1,
        boxSizing: 'border-box',
        border: '2px solid #fefefe',
        ':hover': {
          border: '2px solid #0052b1',
          transition: '0.1s ease-in',
          backgroundColor: '#D3E7FF',
          boxShadow: '0 10px 20px rgba(166, 165, 165, 0.3), 0 6px 6px rgba(235, 235, 235, 0.23)',
        },
      }}
    >
      <Box flex={1}>
        <Box px={10}>
          <Typography variant='h6' fontWeight={600} color='grey.700'>
            Giảng viên
            <Typography mx={4} fontSize={14} component='span'>
              {lecturer.fullName} - {lecturer.username}
            </Typography>
          </Typography>
          <Typography variant='body1' color={'grey.600'}>
            Ngành: <Typography component='span'>{lecturer.majorName}</Typography>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default CardLecturer;
