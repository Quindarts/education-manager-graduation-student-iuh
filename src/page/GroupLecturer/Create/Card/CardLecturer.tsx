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
        my: 2,
        py: 4,
        px: 2,
        display: 'flex',
        cursor: 'pointer',
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
          <Typography variant='body1' color='grey.600'>
            Giảng viên
            <Typography mx={4} fontSize={14} color={'grey.900'} component='span'>
              {lecturer.fullName} - {lecturer.username}
              <Typography mx={4} component={'span'} variant='body1' mt={0} color={'grey.800'}>
                - <Typography component='span'>{lecturer.majorName}</Typography>
              </Typography>
            </Typography>
            <Box sx={{ justifyContent: 'start', display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              {keywords
                .filter((k) => k !== '')
                .map((keyword: any) => (
                  <ChipTag sx={{ mx: 1 }} color='info' size='small' label={keyword} />
                ))}
              {keywords.length === 0 && (
                <Typography variant='body1' color='grey.600'>
                  Chưa có từ khóa
                </Typography>
              )}
            </Box>
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default CardLecturer;
