import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { ENUM_RENDER_GROUP_STUDENT } from '@/store/slice/groupStudent.slice';

function GroupStudentManagement() {
  const { handleManagerRenderActionGroupStudent, params } = useGroupStudent();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(params.page);

  const [keywords, setKeywords] = useState('');
  const [typeSearch, setTypeSearch] = useState<ENUM_RENDER_GROUP_STUDENT>(
    ENUM_RENDER_GROUP_STUDENT.ALL,
  );
  const { data, isLoading, isFetching, refetch } = handleManagerRenderActionGroupStudent(
    currentLimit,
    currentPage,
    typeSearch,
    keywords,
  );
  useEffect(() => {
    refetch();
  }, []);
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
        <TitleManager icon='quill:list' mb={8} mt={2}>
          Danh sách nhóm sinh viên
        </TitleManager>
      </Box>

      <HeaderGroupStudent />
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <TableManagamentGroupStudent
          totalPage={params.totalPage}
          totalItems={data?.groupStudents.length}
          handleChangePage={handleChangePage}
          page={currentPage}
          rows={data ? data.groupStudents : []}
        />
      )}
    </Paper>
  );
}

export default GroupStudentManagement;
