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
  const { data, isLoading } = handleGetGroupStudentById(grStudentId);

  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <>
          <TitleManager>{data.groupStudent.name}</TitleManager>
          <Box my={4}>
            <TabPanelUI groupStudent={data.groupStudent} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default GroupStudentDetailPage;
