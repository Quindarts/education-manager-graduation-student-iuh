import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';
import { useStudent } from '@/hooks/api/useQueryStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useMajor } from '@/hooks/api/useQueryMajor';
import useParams from '@/hooks/ui/useParams';
import { convertStudentTable } from '@/utils/convertDataTable';
import { useDispatch } from 'react-redux';
import { setParamTotalPage } from '@/store/slice/student.slice';

function StudentPage() {
  const { majorStore } = useMajor();
  const dispatch = useDispatch();

  //[FETCH]
  const { handleGetAllStudent, handleGetCountOfStudent, paramTotalPage } = useStudent();
  const { data: countFetch, isSuccess: countSuccess } = handleGetCountOfStudent();
  const { data, isLoading, refetch } = handleGetAllStudent();

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
    setPage(1);
    refetch();
  }, [currentLimit]);

  useEffect(() => {
    if (data !== null) {
      const total = data ? data.params.totalPage : 0;
      dispatch(setParamTotalPage(total));
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
          Danh sách sinh viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
        </TitleManager>
        <Typography variant='body1' fontWeight={600} mt={4} color=''>
         Tổng số lượng: {countSuccess && countFetch?.count} sinh viên
        </Typography>
      </Box>
      <HeaderStudent />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <Box width={'100%'} my={4}>
          <TableManagamentStudent
            totalPage={paramTotalPage}
            totalItems={data?.students.length}
            rows={convertStudentTable(data?.students)}
            handleChangePage={handleChangePage}
            handleChangeLimit={handleChangeLimit}
            page={currentPage}
            limit={currentLimit}
          />
        </Box>
      )}
    </Paper>
  );
}

export default StudentPage;
