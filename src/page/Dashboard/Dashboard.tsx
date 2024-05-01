import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileDashBoard from './Profile';
import ListApplication from './ListApplication';
import TitleManager from '@/components/ui/Title';
import Loading from '@/components/ui/Loading';

type Props = {};

export default function Dashboard({}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
  return isLoading ? (
    <Loading />
  ) : (
    <Box height='100vh'>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        mx={'auto'}
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
