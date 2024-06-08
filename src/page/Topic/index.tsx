import { Box } from '@mui/material';
import React from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useAuth } from '@/hooks/api/useAuth';
import SekeletonUI from '@/components/ui/Sekeleton';

function TopicPage() {
  const { handleTopicsByTermByMajor } = useTopic();
  const { lecturerStore } = useAuth();
  const { termStore } = useTerm();
  console.log('🚀 ~ TopicPage ~ termStore:', termStore);
  const { data, isLoading } = handleTopicsByTermByMajor(
    termStore.currentTerm.id,
    lecturerStore?.me.majorId,
  );
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách đề tài
      </TitleManager>
      <HeaderTopic />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <Box width={'full'} my={10}>
          <TableManagamentTopic rows={data?.topics ? data.topics : []} />
        </Box>
      )}
    </Box>
  );
}

export default TopicPage;
