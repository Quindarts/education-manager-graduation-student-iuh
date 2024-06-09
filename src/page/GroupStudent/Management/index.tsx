import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GridGroupStudent from './Grid';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';

function GroupStudentManagement() {
  const [view, setView] = React.useState('table');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
  const { handleGetGroupStudentByTerm } = useGroupStudent();
  const { data, isLoading } = handleGetGroupStudentByTerm(1);
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <TitleManager mb={14} mt={2}>
          Danh sách nhóm sinh viên
        </TitleManager>
        <ToggleButtonGroup
          sx={{ height: 20 }}
          orientation='horizontal'
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton color='primary' value='table' aria-label='table'>
            <ViewListIcon />
          </ToggleButton>
          <ToggleButton color='primary' value='module' aria-label='module'>
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <HeaderGroupStudent />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <>
          {view === 'table' ? (
            <TableManagamentGroupStudent rows={data ? data.groupStudents : []} />
          ) : (
            <GridGroupStudent />
          )}
        </>
      )}
    </Paper>
  );
}

export default GroupStudentManagement;
