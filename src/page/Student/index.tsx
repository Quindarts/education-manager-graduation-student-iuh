import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';
import { useStudent } from '@/hooks/api/useQueryStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';

function StudentPage() {
  const { handleGetAllStudent } = useStudent();
  const { termStore } = useTerm();
  const { data, isLoading, isFetched } = handleGetAllStudent(termStore.currentTerm.id, 20, 1);
  const { handleGetAllMajor } = useMajor();
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager mb={14} mt={2}>
        Danh sách sinh viên
      </TitleManager>
      <HeaderStudent />
      {isLoading && !isFetched ? <SekeletonUI /> : <TableManagamentStudent rows={data?.students} />}
    </Paper>
  );
}

export default StudentPage;
