import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

function GroupStudentPage() {
  return (
    <Box>
      <Outlet />
    </Box>
  );
}

export default GroupStudentPage;
