import { Box } from '@mui/material';
import React from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';
import { useStudent } from '@/hooks/api/useQueryStudent';
import SekeletonUI from '@/components/ui/Sekeleton';

function StudentPage() {
  const { handleGetAllStudent } = useStudent();
  const { data, isLoading } = handleGetAllStudent();
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách sinh viên
      </TitleManager>
      <HeaderStudent />
      {isLoading ? <SekeletonUI /> : <TableManagamentStudent rows={data?.students} />}
    </Box>
  );
}

export default StudentPage;
