import TitleManager from '@/components/ui/Title';
import Box from '@mui/material/Box';
import TabPanelUI from './TabPanel';
import { useParams } from 'react-router-dom';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';

function GroupStudentDetailPage() {
  return (
    <Box>
      <TitleManager>Nhóm sinh viên 1</TitleManager>
      <>
        <Box my={4}>
          <TabPanelUI />
        </Box>
      </>
    </Box>
  );
}

export default GroupStudentDetailPage;
