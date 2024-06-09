import TitleManager from '@/components/ui/Title';
import Box from '@mui/material/Box';
import TabPanelUI from './TabPanel';
import { Paper } from '@mui/material';

function GroupStudentDetailPage() {
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager>Nhóm sinh viên 1</TitleManager>
      <>
        <Box my={4}>
          <TabPanelUI />
        </Box>
      </>
    </Paper>
  );
}

export default GroupStudentDetailPage;
