import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';

function GroupSupportManagement() {
  const [view, setView] = React.useState('table');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
  const { handleGetGroupStudentByLecturerByTerm } = useGroupStudent();
  const { data, isFetching, isLoading } = handleGetGroupStudentByLecturerByTerm();

  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <TitleManager mb={14} mt={2}>
          Danh sách nhóm sinh viên hướng dẫn
        </TitleManager>
      </Box>

      <HeaderGroupStudent />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <>
          <TableManagamentGroupStudent rows={data ? data.groupStudents : []} />
        </>
      )}
    </Paper>
  );
}

export default GroupSupportManagement;
