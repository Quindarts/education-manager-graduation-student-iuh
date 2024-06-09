import { Stack } from '@mui/material';
import React from 'react';
import CardGroupStudent from './Card';

function GridGroupStudent() {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      useFlexGap
      flexWrap='wrap'
      width={'full'}
      spacing={{ xs: 4, sm: 8, md: 12 }}
    >
      {test.map((testItem: any) => (
        <CardGroupStudent />
      ))}
    </Stack>
  );
}

export default GridGroupStudent;
