import { Box } from '@mui/material';
import React from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';

function TopicPage() {
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách đề tài 
      </TitleManager>
      <HeaderTopic />
      <Box width={'full'} my={10}>
        <TableManagamentTopic />
      </Box>
    </Box>
  );
}

export default TopicPage;
