import { Box, Paper } from '@mui/material';
import React from 'react';
import HeaderGroupLecturer from './Header';
import TitleManager from '@/components/ui/Title';
import TableManagamentGroupLecturer from './Table';
function GroupLecturerManagementPage() {
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager mb={4} mt={2}>
        Danh sách nhóm giảng viên
      </TitleManager>
      <HeaderGroupLecturer />

      <Box width={'full'} my={10}>
        <TableManagamentGroupLecturer rows={[]} />
      </Box>
    </Paper>
  );
}

export default GroupLecturerManagementPage;
