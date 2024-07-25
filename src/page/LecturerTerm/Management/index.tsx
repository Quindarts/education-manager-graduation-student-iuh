import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertLecturer } from '@/utils/convertDataTable';
import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useTerm } from '@/hooks/api/useQueryTerm';
import HeaderLecturerTerm from './Header';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import useParams from '@/hooks/ui/useParams';

function LecturerTermManagement() {
  const { handleGetAllLecturerTermByParam } = useLecturerTerm();
  const { majorStore } = useMajor();
  const { termStore } = useTerm();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching } = handleGetAllLecturerTermByParam();

  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };
  const { setLimit, setPage, getQueryField } = useParams();
  useEffect(() => {
    setLimit(10);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(10);
    setPage(1);
  }, [getQueryField('keywords')]);

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager mb={8} mt={2}>
        Danh sách giảng viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''} -{' '}
        {termStore.currentTerm.name}
      </TitleManager>
      <>
        <HeaderLecturerTerm />
        {isLoading && !isFetching ? (
          <SekeletonUI />
        ) : (
          <TableManagamentLecturer
            rows={convertLecturer(data?.lecturerTerms)}
            totalPage={getQueryField('totalPage')}
            totalItems={data?.lecturerTerms?.length}
            handleChangePage={handleChangePage}
            page={currentPage}
          />
        )}
      </>
    </Paper>
  );
}

export default LecturerTermManagement;
