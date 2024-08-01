import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertLecturer } from '@/utils/convertDataTable';
import { useMajor } from '@/hooks/api/useQueryMajor';
import useParams from '@/hooks/ui/useParams';

function LecturerManagementPage() {
  const { handleGetAllLecturer, paramTotalPage } = useLecturer();
  const { majorStore } = useMajor();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = handleGetAllLecturer();
  const { setLimit, setPage, getQueryField } = useParams();
  useEffect(() => {
    setLimit(10);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(10);
    if (getQueryField('keywords') === '') {
      refetch();
    }
  }, [getQueryField('keywords')]);

  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager mb={8} mt={2}>
        Danh sách Giảng viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
      </TitleManager>
      <>
        <HeaderLecturer />
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <TableManagamentLecturer
            rows={convertLecturer(data?.lecturers)}
            totalPage={paramTotalPage}
            totalItems={data?.lecturers.length}
            handleChangePage={handleChangePage}
            page={currentPage}
          />
        )}
      </>
    </Paper>
  );
}

export default LecturerManagementPage;
