import { Box, LinearProgress, Skeleton } from '@mui/material';
import React, { useState } from 'react';
import TableManagamentTerm from './Table';
import HeaderTerm from './Header';
import TitleManager from '@/components/ui/Title';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonUI from '@/components/ui/Sekeleton';

function TermPage() {
  const { handleGetAllTerm } = useTerm();
  const { data, isLoading, isFetched } = handleGetAllTerm();
  return (
    <>
      <Box>
        <TitleManager mb={14} mt={2}>
          Danh sách học kì
        </TitleManager>
        <HeaderTerm />
        {isLoading || !isFetched ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={10}>
            <TableManagamentTerm rows={data?.terms} />
          </Box>
        )}
      </Box>
    </>
  );
}

export default TermPage;
