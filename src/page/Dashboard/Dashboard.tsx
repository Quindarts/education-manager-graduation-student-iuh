import { Box, Paper } from '@mui/material';
import React from 'react';
import ProfileDashBoard from './Profile';
import ListApplication from './ListApplication';
import TitleManager from '@/components/ui/Title';
import { useApp } from '@/hooks/api/useApp';

type Props = {};

export default function Dashboard({}: Props) {
  const { getQueryValueKey } = useApp();
  console.log('🚀 ~ ComponentPage ~ value:', getQueryValueKey(['get-me']));
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
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
    </Paper>
  );
}
