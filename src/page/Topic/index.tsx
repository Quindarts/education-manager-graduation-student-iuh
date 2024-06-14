import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { useTerm } from '@/hooks/api/useQueryTerm';
import SekeletonUI from '@/components/ui/Sekeleton';

function TopicPage() {
  const { handleTopicsByTermByMajor } = useTopic();
  const { termStore } = useTerm();
  const { data, isLoading, isFetched } = handleTopicsByTermByMajor(
    termStore.currentTerm.id,
    'e4fe02cb-f2b0-4afa-885d-d1b93130d350',
  );
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager mb={14} mt={2}>
        Danh sách đề tài
      </TitleManager>
      <HeaderTopic />
      {isLoading && !isFetched ? (
        <SekeletonUI />
      ) : (
        <Box width={'full'} my={10}>
          <TableManagamentTopic rows={data?.topics ? data.topics : []} />
        </Box>
      )}
    </Paper>
  );
}

export default TopicPage;
