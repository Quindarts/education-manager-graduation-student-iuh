import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import TabPanelUI from './TabPanel';
import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import ChipTag from '@/components/ui/Badge';
import dayjs from 'dayjs';

function MyDetailGroupLecturer() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grLecturerId = `${current[current.length - 1]}`;
  const { handleGetGroupLecturerById } = useGroupLecturer();
  const { data, isLoading, isFetching } = handleGetGroupLecturerById(grLecturerId);

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          <Box justifyContent={'space-between'} display={'flex'}>
            <TitleManager>
              {checktTypeGroupLecturer(data.groupLecturer.type.toLowerCase())}{' '}
              {data?.groupLecturer?.name}
            </TitleManager>
            <Typography textAlign={'end'} mx={4} variant='body1' color='initial'>
              <Typography component={'span'} variant='body1' fontWeight={'bold'} color='grey.600'>
                Loại đề tài nên phân công:{' '}
              </Typography>
              <Box mx={4} mt={2}>
                {data?.groupLecturer?.keywords
                  .split(',')
                  .filter((k) => k !== '')
                  .map((key: string) => (
                    <ChipTag key={key} color='success' sx={{ mx: 2 }} label={key} />
                  ))}
              </Box>
            </Typography>
          </Box>
          <Typography mt={2}>
            Bắt đầu:{' '}
            {data?.groupLecturer?.startDate
              ? dayjs(data.groupLecturer?.startDate).format('DD/MM/YYYY hh:mm:ss A')
              : 'Chưa cập nhật'}{' '}
            {' -- '}
            <Typography component={'span'} mb={2}>
              Kết thúc:
              {data?.groupLecturer?.endDate
                ? dayjs(data.groupLecturer?.endDate).format('DD/MM/YYYY hh:mm:ss A')
                : 'Chưa cập nhật'}
            </Typography>
          </Typography>
          <Typography>
            {data?.groupLecturer?.location ? data.groupLecturer?.location : 'Chưa cập nhật'}
          </Typography>

          <Box>
            <TabPanelUI groupLecturer={data?.groupLecturer} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default MyDetailGroupLecturer;
