import TitleManager from '@/components/ui/Title';
import Box from '@mui/material/Box';
import TabPanelUI from './TabPanel';

function GroupStudentDetailPage() {
  return (
    <Box>
      <TitleManager>Nhóm sinh viên 1</TitleManager>
      <Box my={4}>
        <TabPanelUI />
      </Box>
    </Box>
  );
}

export default GroupStudentDetailPage;
