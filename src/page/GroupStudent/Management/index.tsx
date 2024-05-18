import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import GridGroupStudent from './Grid';

function GroupStudentManagement() {
  const [view, setView] = React.useState('table');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
  return (
    <Box>
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
      {view === 'table' ? <TableManagamentGroupStudent /> : <GridGroupStudent />}
    </Box>
  );
}

export default GroupStudentManagement;
