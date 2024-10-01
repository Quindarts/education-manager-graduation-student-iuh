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
import { useDispatch } from 'react-redux';
import { setParamTotalPageLectuerMajor } from '@/store/slice/lecturer.slice';

function LecturerManagementPage() {
  const { majorStore } = useMajor();
  const dispatch = useDispatch();

  //[FETCH]
  const { handleGetAllLecturer, paramTotalPage } = useLecturer();
  const { data, isLoading, isFetching, refetch } = handleGetAllLecturer();

  //[PARAMS]
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { setLimit, setPage, getQueryField, setTotalPage } = useParams();

  const handleChangePage = (value: number) => {
    refetch();
    setCurrentPage(value);
  };
  const handleChangeLimit = (value: number) => {
    setCurrentLimit(value);
  };

  useEffect(() => {
    setLimit(currentLimit);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(currentLimit);
    setPage(1);
    refetch();
  }, [currentLimit]);

  useEffect(() => {
    if (data !== null) {
      const total = data ? data.params.totalPage : 0;
      dispatch(setParamTotalPageLectuerMajor(total));
      setTotalPage(total);
    }
  }, [data]);
  useEffect(() => {
    setLimit(currentLimit);
    setPage(1);
    if (getQueryField('keywords') === '') {
      refetch();
    }
  }, [getQueryField('keywords')]);
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <TitleManager mb={8} mt={2}>
        Danh sách giảng viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
      </TitleManager>
      <>
        <HeaderLecturer />
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagamentLecturer
              rows={convertLecturer(data?.lecturers)}
              totalPage={paramTotalPage}
              totalItems={data?.lecturers.length}
              handleChangePage={handleChangePage}
              handleChangeLimit={handleChangeLimit}
              page={currentPage}
              limit={currentLimit}
            />
          </Box>
        )}
      </>
    </Paper>
  );
}

export default LecturerManagementPage;
