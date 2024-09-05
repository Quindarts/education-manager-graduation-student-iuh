import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import useParams from '@/hooks/ui/useParams';
import { setParamTotalPage } from '@/store/slice/groupStudent.slice';
import { useDispatch } from 'react-redux';

function GroupStudentManagement() {
  const dispatch = useDispatch();

  //[FETCH]
  const { handleManagerRenderActionGroupStudent, handleGetCountOfGroupStudent, paramTotalPage } =
    useGroupStudent();
  const { data: countFetch, isSuccess: countSuccess } = handleGetCountOfGroupStudent();
  const { data, isLoading, isFetching, refetch } = handleManagerRenderActionGroupStudent();
  useEffect(() => {
    refetch();
  }, []);

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
      <Box justifyContent={'space-between'} display={'flex'} mb={2} mt={2}>
        <TitleManager icon='quill:list' mb={8} mt={2}>
          Danh sách nhóm sinh viên
        </TitleManager>
        <Typography variant='h5' fontWeight={700} mt={4} color='#636363'>
          Số nhóm: {countSuccess && countFetch?.count}
        </Typography>
      </Box>

      <HeaderGroupStudent countGroups={countFetch?.count} />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <TableManagamentGroupStudent
          totalPage={paramTotalPage}
          totalItems={data?.groupStudents.length}
          handleChangePage={handleChangePage}
          handleChangeLimit={handleChangeLimit}
          rows={data ? data.groupStudents : []}
          page={currentPage}
          limit={currentLimit}
        />
      )}
    </Paper>
  );
}

export default GroupStudentManagement;
