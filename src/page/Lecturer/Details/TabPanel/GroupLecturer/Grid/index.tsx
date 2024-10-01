import { Stack } from '@mui/material';
import React from 'react';
import CardGroupLecturer from './Card';

function GridGroupLecturer(props: any) {
  const { groupLecturers } = props;
  const test = [1, 2, 3, 4, 5, 6];
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      useFlexGap
      flexWrap='wrap'
      width={'full'}
      spacing={{ xs: 4, sm: 8, md: 10 }}
    >
      {groupLecturers?.map((group: any) => (
        <CardGroupLecturer group={group} />
      ))}
    </Stack>
  );
}

export default GridGroupLecturer;
