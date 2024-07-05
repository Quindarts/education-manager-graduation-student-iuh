import { Box, LinearProgress, Paper, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import TableManagamentTerm from './Table';
import HeaderTerm from './Header';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonUI from '@/components/ui/Sekeleton';

function TermPage() {
  const { handleGetAllTerm } = useTerm();
  const { data, isLoading, isFetching } = handleGetAllTerm();
  return (
    <>
      <Paper sx={{ py: 10, px: 10 }} elevation={1}>
        <TitleManager icon='quill:list' mb={8} mt={2}>
          Danh sách học kì
        </TitleManager>
        <HeaderTerm />
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
