import TitleManager from '@/components/ui/Title';
import Box from '@mui/material/Box';
import TabPanelUI from './TabPanel';
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';

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
          <TitleManager>Nhóm {data?.groupLecturer?.name}</TitleManager>
          <Box my={4}>
            <TabPanelUI groupLecturer={data?.groupLecturer} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default GroupLecturerDetailPage;
