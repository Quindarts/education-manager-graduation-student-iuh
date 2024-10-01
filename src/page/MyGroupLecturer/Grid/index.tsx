import { Box, Stack } from '@mui/material';
import React from 'react';
import CardGroupLecturer from './Card';

function GridGroupLecturer(props: any) {
  const { groupLecturers } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      {groupLecturers?.map((group: any) => (
        <Box
          sx={{
            width: {
              xs: '100%',
              md: '50%',
              lg: 'calc(25% - 10px)',
            },
          }}
        >
          <CardGroupLecturer group={group} />
        </Box>
      ))}
    </Box>
  );
}

export default GridGroupLecturer;
