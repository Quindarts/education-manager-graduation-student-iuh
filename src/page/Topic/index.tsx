import { Box, Paper } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import TableManagamentTopic from './Table';
import HeaderTopic from './Header';
import TitleManager from '@/components/ui/Title';
import { useTopic } from '@/hooks/api/useQueryTopic';
import SekeletonUI from '@/components/ui/Sekeleton';
import useParams from '@/hooks/ui/useParams';
import { useDispatch } from 'react-redux';
import { setParamTotalPage } from '@/store/slice/topic.slice';

function TopicPage() {
  const { handleSearchTopic, paramTotalPage } = useTopic();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, seiCurrentLimit] = useState(10);
  const { data, isLoading, isFetching, refetch } = handleSearchTopic();
  const { setLimit, setPage, getQueryField, setTotalPage } = useParams();
  const dispatch = useDispatch();

  const handleChangePage = (value: number) => {
    setCurrentPage(value);
  };
  const handleChangeLimit = (value: number) => {
    seiCurrentLimit(value);
  };
  useEffect(() => {
    setLimit(currentLimit);
    setPage(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLimit(currentLimit);
    refetch();
  }, [currentLimit]);
  useEffect(() => {
    if (data !== null) {
      const total = data ? data.params.totalPage : 0;
      dispatch(setParamTotalPage(total));
      setTotalPage(total);
    }
  }, [data]);
  useEffect(() => {
    setLimit(currentLimit);
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
              data?.topics ? data.topics.map((topic: any, index: number) => ({ ...topic })) : []
            }
            handleChangeLimit={handleChangeLimit}
            handleChangePage={handleChangePage}
            page={currentPage}
            limit={currentLimit}
            totalPages={paramTotalPage}
          />
        </Box>
      )}
    </Paper>
  );
}

export default TopicPage;
