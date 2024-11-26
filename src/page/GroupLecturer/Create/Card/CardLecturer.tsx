import ChipTag from '@/components/ui/Badge';
import { checkIndustry } from '@/utils/validations/lecturer.validation';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

function CardLecturer(props: any) {
  const { key, id, draggable, onDragStart, onDragEnd, lecturer, keywords } = props;
  return (
    <Paper
      key={key}
      id={id}
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sx={{
        my: 10,
        py: 4,
        px: 2,
        display: 'flex',
        cursor: 'pointer',
        gap: 20,
        justifyContent: 'space-around',
        borderRadius: 1,
        boxSizing: 'border-box',
        border: '1px solid #fefefe',
        ':hover': {
          border: '1px solid #0052b1',
          transition: '0.1s ease-in',
          backgroundColor: '#D3E7FF',
          boxShadow: '0 10px 20px rgba(166, 165, 165, 0.3), 0 6px 6px rgba(235, 235, 235, 0.23)',
        },
      }}
    >
      <Box flex={1}>
        <Box px={10}>
          <Typography variant='h6' color='grey.600'>
            Giảng viên
            <Typography mx={4} fontSize={14} color={'grey.900'} component='span'>
              {lecturer.fullName} - {lecturer.username}
            </Typography>
          </Typography>
          <Typography variant='body1' mt={2} color={'grey.800'}>
            Ngành: <Typography component='span'>{lecturer.majorName}</Typography>
          </Typography>
          <Box sx={{ justifyContent: 'end', display: 'flex' }}>
            {keywords.map((keyword: any) => (
              <ChipTag sx={{ mx: 1, my: 2 }} color='info' size='small' label={keyword} />
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default CardLecturer;
