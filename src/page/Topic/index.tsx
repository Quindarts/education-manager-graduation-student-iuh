import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import SekeletonUI from '@/components/ui/Sekeleton';
import useParams from '@/hooks/ui/useParams';

function TopicPage() {
  const { handleSearchTopic, paramTotalPage } = useTopic();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isFetching, refetch } = handleSearchTopic();
  const { setLimit, setPage, getQueryField } = useParams();
  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    setLimit(10);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(10);
    setPage(1);
    if (getQueryField('keywords') === '') {
      refetch();
    }
  }, [getQueryField('keywords')]);
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
            handleChangePage={handleChangePage}
            page={currentPage}
            totalPages={paramTotalPage}
          />
        </Box>
      )}
    </Paper>
  );
}

export default TopicPage;
