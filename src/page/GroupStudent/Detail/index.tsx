import TitleManager from '@/components/ui/Title';
import Box from '@mui/material/Box';
import TabPanelUI from './TabPanel';
import { Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';

function GroupStudentDetailPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;
  const { handleGetGroupStudentById } = useGroupStudent();
  const { data, isLoading, isFetching } = handleGetGroupStudentById(grStudentId);

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          <TitleManager icon='mingcute:group-fill'>{data.groupStudent.name}</TitleManager>
          <Box mt={4}>
            <TabPanelUI groupStudent={data.groupStudent} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default GroupStudentDetailPage;
