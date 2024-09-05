import React from 'react';
import CardGroupLecturer from './Card';
import { Box } from '@mui/material';

function GridGroupLecturer(props: any) {
  const { groupLecturers } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}
    >
      {groupLecturers?.map((group: any) => (
        <Box
          sx={{
            width: {
              sm: '100%',
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
