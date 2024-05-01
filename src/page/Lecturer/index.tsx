import { Box } from '@mui/material';
import React from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';

function LecturerPage() {
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách giảng viên
      </TitleManager>
      <HeaderLecturer />
      <TableManagamentLecturer />
    </Box>
  );
}

export default LecturerPage;
