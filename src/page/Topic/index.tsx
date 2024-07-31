import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import SekeletonUI from '@/components/ui/Sekeleton';

function TopicPage() {
  const { handleTopicsByTermByMajor } = useTopic();
  const { data, isLoading, isFetching } = handleTopicsByTermByMajor();
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager icon='quill:list' mb={8} mt={2}>
        Danh sách đề tài
      </TitleManager>
      <HeaderTopic />
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <Box width={'full'} my={4}>
          <TableManagamentTopic
            isApprovePermission={true}
            rows={
              data?.topics
                ? data.topics.map((topic: any, index: number) => ({ ...topic, stt: index + 1 }))
                : []
            }
          />
        </Box>
      )}
    </Paper>
  );
}

export default TopicPage;
