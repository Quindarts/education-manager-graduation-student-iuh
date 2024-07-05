import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';
import { useStudent } from '@/hooks/api/useQueryStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { ENUM_RENDER_STUDENT } from '@/store/slice/student.slice';

function StudentPage() {
  const { handleGetAllStudent, handleManagerRenderActionStudent, params } = useStudent();
  const [typeRender, setTypeRender] = useState(ENUM_RENDER_STUDENT.ALL);

  const { termStore } = useTerm();

  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(params.page);

  const [keywords, setKeywords] = useState('');
  const [typeSearch, setTypeSearch] = useState<'full_name' | 'username' | 'phone' | 'email'>(
    'full_name',
  );
  const { data, isLoading, isFetching } = handleManagerRenderActionStudent(
    termStore.currentTerm.id,
    currentLimit,
    currentPage,
    typeSearch,
    keywords,
    typeRender,
  );
  useEffect(() => {
    if (keywords !== '') setTypeRender(ENUM_RENDER_STUDENT.SEARCH);
  }, [keywords]);
  const handleChangePage = (value: string | Number) => {
    setCurrentPage(value);
  };
  const handleChangeDropSearch = (value: 'full_name' | 'username' | 'phone' | 'email') => {
    setTypeSearch(value);
  };
  const handleChangeKeywords = (value: string) => {
    setKeywords(value);
  };
  const onClearSearch = () => {
    setCurrentPage(1);
    setTypeRender(ENUM_RENDER_STUDENT.ALL);
  };
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager icon='quill:list' mb={8} mt={2}>
        Danh sách sinh viên
      </TitleManager>
      <HeaderStudent
        typeSearch={typeSearch}
        handleChangeKeywords={handleChangeKeywords}
        handleChangeDropSearch={handleChangeDropSearch}
        onClearSearch={onClearSearch}
      />
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <TableManagamentStudent
          totalPage={params.totalPage}
          totalItems={data?.students.length}
          rows={data?.students}
          handleChangePage={handleChangePage}
          page={currentPage}
        />
      )}
    </Paper>
  );
}

export default StudentPage;
