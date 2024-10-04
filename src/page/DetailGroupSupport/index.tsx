import { Paper } from '@mui/material';
import React from 'react';
import TableStudentInGroup from './Table';
import TitleManager from '@/components/ui/Title';
function DetailGroupSupportPage() {
  return (
    <Paper sx={{ p: 10 }}>
      <TitleManager mb={4}>Danh sách thành viên</TitleManager>
      <TableStudentInGroup />
    </Paper>
  );
}

export default DetailGroupSupportPage;
