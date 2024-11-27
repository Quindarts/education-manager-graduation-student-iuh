import { Paper, Typography } from '@mui/material';
import React from 'react';
import TableStudentInGroup from './Table';
import TitleManager from '@/components/ui/Title';
import { useLocation } from 'react-router-dom';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonTable from '@/components/ui/Sekeleton';
function DetailGroupSupportPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grStudentId = `${current[current.length - 1]}`;
  const { handleGetGroupStudentById } = useGroupStudent();
  const { data, isLoading } = handleGetGroupStudentById(grStudentId);

  return (
    <Paper sx={{ py: 10, px: 10 }}>
      {isLoading ? (
        <SekeletonTable />
      ) : (
        <>
          <TitleManager mb={2}>Nhóm sinh viên {data?.groupStudent?.info?.name}</TitleManager>
          <TitleManager fontWeight={500} color={'grey.600'} mb={10}>
            Đề tài: {" "}
            <Typography component={'span'} variant='body1' fontWeight={'bold'} color='grey.700'>
              {data?.groupStudent?.info?.topicName}
            </Typography>
          </TitleManager>
          <TableStudentInGroup members={data?.groupStudent?.members} />
        </>
      )}
    </Paper>
  );
}

export default DetailGroupSupportPage;
