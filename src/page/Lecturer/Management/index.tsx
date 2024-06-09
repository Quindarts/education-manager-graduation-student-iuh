import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { convertLecturer } from '@/utils/convertDataTable';

function LecturerManagementPage() {
  const { handleGetAllLecturer } = useLecturer();
  const { termStore } = useTerm();
  const { data, isLoading, isFetched } = handleGetAllLecturer(termStore.currentTerm.id, 20, 1);
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager mb={14} mt={2}>
        Danh sách giảng viên
      </TitleManager>
      <>
        {isLoading && !isFetched ? (
          <SekeletonUI />
        ) : (
          <>
            <HeaderLecturer />
            <TableManagamentLecturer
              currentTermId={termStore.currentTerm.id}
              rows={convertLecturer(data?.lecturers)}
            />
          </>
        )}
      </>
    </Paper>
  );
}

export default LecturerManagementPage;
