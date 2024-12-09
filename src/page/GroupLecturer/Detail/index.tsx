import TitleManager from '@/components/ui/Title';
import Box from '@mui/material/Box';
import TabPanelUI from './TabPanel';
import { Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import dayjs from 'dayjs';

function GroupLecturerDetailPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grLecturerId = `${current[current.length - 1]}`;
  const { handleGetGroupLecturerById } = useGroupLecturer();
  const { data, isLoading, isFetching } = handleGetGroupLecturerById(grLecturerId);

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          <TitleManager>
            {checktTypeGroupLecturer(data?.groupLecturer.type.toLowerCase())}{' '}
            {data?.groupLecturer?.name}
          </TitleManager>
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
          <Box my={4}>
            <TabPanelUI groupLecturer={data?.groupLecturer} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default GroupLecturerDetailPage;
