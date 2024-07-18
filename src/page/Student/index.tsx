import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';
import { useStudent } from '@/hooks/api/useQueryStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { ENUM_RENDER_STUDENT } from '@/store/slice/student.slice';
import { useMajor } from '@/hooks/api/useQueryMajor';

function StudentPage() {
  const { handleGetAllStudent, params } = useStudent();

  const [typeRender, setTypeRender] = useState(ENUM_RENDER_STUDENT.ALL);

  const { termStore } = useTerm();
  const { majorStore } = useMajor();

  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(params.page);

  const [keywords, setKeywords] = useState('');
  const [typeSearch, setTypeSearch] = useState<'full_name' | 'username' | 'phone' | 'email'>(
    'full_name',
  );
  const { data, isLoading, isFetching } = handleGetAllStudent(
    termStore.currentTerm.id,
    majorStore.currentMajor.id,
    10,
    currentPage,
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
        Danh sách sinh viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
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
