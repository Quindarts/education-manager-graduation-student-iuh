import { Box } from '@mui/material';
import React from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';

function GroupStudentPage() {
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách nhóm sinh viên
      </TitleManager>
      <HeaderGroupStudent />
      <TableManagamentGroupStudent />
    </Box>
  );
}

export default GroupStudentPage;
