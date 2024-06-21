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
        py: 2,
        px: 10,
        display: 'flex',
        cursor: 'pointer',
        gap: 20,
        justifyContent: 'space-around',
        borderRadius: 2,
        boxSizing: 'border-box',
        ':hover': {
          border: '2px solid #0052b1',
          boxShadow: '1px 1px 1px 1px #E6E6E6',
          transition: '0.1s ease-in',
          backgroundColor: '#D3E7FF',
        },
      }}
    >
      <Box>
        <Avatar sizes='small' src={``} />
      </Box>
      <Box flex={1}>
        <Typography variant='body1' fontWeight={500} color='grey.700'>
          Tên giảng viên
          <Typography mx={4} component='span'>
            {lecturer.fullName}
          </Typography>
          <Typography ml={10} component='span' textAlign={'end'}>
            {/* Trình độ: {lecturer.degree} */}
          </Typography>
        </Typography>
        <Typography variant='body1' fontWeight={500} color='grey.700'>
          Mã giảng viên
          <Typography mx={4} component='span'>
            {lecturer.username}
          </Typography>
        </Typography>
      </Box>
      <Box>
        <IconButton size='small'>
          <Icon icon='mingcute:more-2-fill' style={{ color: '#0052b1' }} />
        </IconButton>
      </Box>
    </Paper>
  );
}

export default CardLecturer;
