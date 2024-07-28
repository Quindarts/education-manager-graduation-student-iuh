import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderStudent from './Header';
import { useStudent } from '@/hooks/api/useQueryStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useMajor } from '@/hooks/api/useQueryMajor';
import useParams from '@/hooks/ui/useParams';
import { convertStudentTable } from '@/utils/convertDataTable';

function StudentPage() {
  const { handleGetAllStudent, paramTotalPage } = useStudent();
  const { majorStore } = useMajor();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, refetch } = handleGetAllStudent();
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
    if (getQueryField('keywords') === '') {
      refetch();
    }
  }, [getQueryField('keywords')]);

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager icon='quill:list' mb={8} mt={2}>
        Danh sách sinh viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
      </TitleManager>
      <HeaderStudent />
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          <TableManagamentStudent
            totalPage={paramTotalPage}
            totalItems={data.students.length}
            rows={convertStudentTable(data.students)}
            handleChangePage={handleChangePage}
            page={currentPage}
          />
        </>
      )}
    </Paper>
  );
}

export default StudentPage;
