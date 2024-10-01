import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertLecturer } from '@/utils/convertDataTable';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useTerm } from '@/hooks/api/useQueryTerm';
import HeaderLecturerTerm from './Header';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import useParams from '@/hooks/ui/useParams';
import { useDispatch } from 'react-redux';
import { setParamTotalPageLectuerTerm } from '@/store/slice/lecturer.slice';

function LecturerTermManagement() {
  const { majorStore } = useMajor();
  const { termStore } = useTerm();
  const dispatch = useDispatch();

  //[FETCH]
  const { handleGetAllLecturerTermByParam, handleGetCountOfLecturerTerm, paramTotalPage } =
    useLecturerTerm();
  const { data: countFetch, isSuccess: countSuccess } = handleGetCountOfLecturerTerm();
  const { data, isLoading, refetch } = handleGetAllLecturerTermByParam();

  //[PARAMS]
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const { setLimit, setPage, setTotalPage, getQueryField } = useParams();

  const handleChangePage = (value: number) => {
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
    refetch();
    setPage(1);
  }, [currentLimit]);

  useEffect(() => {
    if (data !== null) {
      const total = data ? data.params.totalPage : 0;
      dispatch(setParamTotalPageLectuerTerm(total));
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
      <Box justifyContent={'space-between'} display={'flex'} mb={8} mt={2}>
        <TitleManager icon='quill:list'>
          Danh sách giảng viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''} -{' '}
          {termStore.currentTerm.name}
        </TitleManager>
        <Typography variant='h5' fontWeight={700} mt={4} color='#636363'>
          Số giảng viên HD: {countSuccess && countFetch?.count}
        </Typography>
      </Box>
      <HeaderLecturerTerm />
      <>
        {isLoading ? (
          <SekeletonUI />
        ) : (
          <Box width={'100%'} my={4}>
            <TableManagamentLecturer
              rows={data?.lecturerTerms ? convertLecturer(data?.lecturerTerms) : []}
              totalPage={paramTotalPage}
              totalItems={data?.lecturerTerms?.length}
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

export default LecturerTermManagement;
