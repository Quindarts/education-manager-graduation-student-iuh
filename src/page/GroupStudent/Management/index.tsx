import { Box, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import GridGroupStudent from './Grid';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { ENUM_RENDER_GROUP_STUDENT } from '@/store/slice/groupStudent.slice';

function GroupStudentManagement() {
  const [view, setView] = React.useState('table');
  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };
  const { handleManagerRenderActionGroupStudent, params } = useGroupStudent();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(params.page);

  const [keywords, setKeywords] = useState('');
  const [typeSearch, setTypeSearch] = useState<ENUM_RENDER_GROUP_STUDENT>(
    ENUM_RENDER_GROUP_STUDENT.ALL,
  );
  const { data, isLoading, isFetching } = handleManagerRenderActionGroupStudent(
    currentLimit,
    currentPage,
    typeSearch,
    keywords,
  );

  const handleChangePage = (value: string | Number) => {
    setCurrentPage(value);
  };
  const handleChangeDropSearch = (value: ENUM_RENDER_GROUP_STUDENT) => {
    setTypeSearch(value);
  };
  const handleChangeKeywords = (value: string) => {
    setKeywords(value);
  };
  const onClearSearch = () => {
    setKeywords('');
    setCurrentPage(1);
    setTypeSearch(ENUM_RENDER_GROUP_STUDENT.ALL);
  };
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <Box display={'flex'} justifyContent={'space-between'}>
        <TitleManager mb={8} mt={2}>
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
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          {view === 'table' ? (
            <TableManagamentGroupStudent
              totalPage={params.totalPage}
              totalItems={data?.groupStudents.length}
              handleChangePage={handleChangePage}
              page={currentPage}
              rows={data ? data.groupStudents : []}
            />
          ) : (
            <GridGroupStudent />
          )}
        </>
      )}
    </Paper>
  );
}

export default GroupStudentManagement;
