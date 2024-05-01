import { Box } from '@mui/material';
import React from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';

function StudentPage() {
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách giảng viên
      </TitleManager>
      <HeaderStudent />
      <TableManagamentStudent />
    </Box>
  );
}

export default StudentPage;
