import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileDashBoard from './Profile';
import ListApplication from './ListApplication';
import TitleManager from '@/components/ui/Title';
import Loading from '@/components/ui/Loading';

type Props = {};

export default function Dashboard({}: Props) {
  return (
    <Box height='100vh'>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mx={'auto'}
        my={'auto'}
        boxShadow={'#919eab33 0px 4px 6px -2px'}
      >
        <ProfileDashBoard />
        <ListApplication sx={{ mt: 10 }} />
        <Box my={10} width={'100%'} bgcolor={'white'} p={10} borderRadius={4} height={200}>
          <TitleManager>Thống kê dữ liệu học kì I 2024 -2025</TitleManager>
        </Box>
      </Box>
    </Box>
  );
}
