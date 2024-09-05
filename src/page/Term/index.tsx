import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentTerm from './Table';
import HeaderTerm from './Header';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useMajor } from '@/hooks/api/useQueryMajor';

function TermPage() {
  const { handleGetAllTermByMajor } = useTerm();
  const { majorStore } = useMajor();
  const { data, isLoading, isFetching } = handleGetAllTermByMajor();
  return (
    <>
      <Paper sx={{ py: 10, px: 10 }} elevation={0}>
        <Box justifyContent={'space-between'} display={'flex'}>
          <TitleManager icon='quill:list' mb={0}>
            Danh sách học kì {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
          </TitleManager>
          <HeaderTerm />
        </Box>

        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagamentTerm rows={data?.terms} />
          </Box>
        )}
      </Paper>
    </>
  );
}

export default TermPage;
