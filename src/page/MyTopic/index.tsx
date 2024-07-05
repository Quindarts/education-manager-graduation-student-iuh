import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentTopic from '../Topic/Table';
import { useTopic } from '@/hooks/api/useQueryTopic';
import HeaderTopic from '../Topic/Header';

function MyTopic() {
  const { handleTopicsByLecturerByTerm } = useTopic();
  const { data, isLoading, isFetching } = handleTopicsByLecturerByTerm('', '', '');
  return (
    <Box>
      <Paper sx={{ py: 10, px: 10 }} elevation={1}>
        <TitleManager icon='quill:list' mb={8} mt={2}>
          Danh sách đề tài
        </TitleManager>
        <HeaderTopic />
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagamentTopic rows={data?.topics ? data.topics : []} />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default MyTopic;
