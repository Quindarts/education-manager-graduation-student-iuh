import { Box } from '@mui/material';
import React from 'react';
import TableManagamentTerm from './Table';
import HeaderTerm from './Header';
import TitleManager from '@/components/ui/Title';

function TermPage() {
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách học kì
      </TitleManager>
      <HeaderTerm />
      <Box width={'full'} my={10}>
        <TableManagamentTerm />
      </Box>
    </Box>
  );
}

export default TermPage;
