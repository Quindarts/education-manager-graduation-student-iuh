import TitleManager from '@/components/ui/Title';
import TabPanelCreateNotify from './TabPanel';
import { Paper } from '@mui/material';

function CreateNotificationPage() {
  return (
    <Paper sx={{ px: 10, py: 6 }}>
        {/* <TitleManager mt={4} mb={8}>
          Tạo thông báo
        </TitleManager> */}
      <TabPanelCreateNotify />
    </Paper>
  );
}

export default CreateNotificationPage;
