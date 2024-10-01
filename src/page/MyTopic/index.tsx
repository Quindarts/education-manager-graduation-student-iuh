import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentTopic from '../Topic/Table';
import { useTopic } from '@/hooks/api/useQueryTopic';
import { removeVietnameseTones } from '@/utils/search';
import useParams from '@/hooks/ui/useParams';
import HeaderTopic from './Header';

export const handleSearch = (data: any[], typeSearch: string, keywords: string) => {
  const dataSort = data?.slice().sort((a, b) => a.key.localeCompare(b.key));
  if (keywords.length === 0 || typeSearch.length === 0) {
    return dataSort;
  }
  let query = removeVietnameseTones(keywords?.toLowerCase());
  const filteredData = data.filter((topic: any) => {
    let val = removeVietnameseTones(topic[`${typeSearch}`]?.toLowerCase());
    return val.includes(query);
  });
  return filteredData.sort((a, b) => a.key.localeCompare(b.key));
};

function MyTopic() {
  const { handleTopicsByMe } = useTopic();
  const { data, isLoading, isFetching } = handleTopicsByMe();
  const { getQueryField } = useParams();
  return (
    <Box>
      <Paper sx={{ py: 10, px: 10 }} elevation={0}>
        <TitleManager icon='quill:list' mb={8}>
          Danh sách đề tài
        </TitleManager>
        <HeaderTopic />
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <Box width={'full'} my={4}>
            <TableManagamentTopic
              totalItems={
                data
                  ? handleSearch(
                      data?.topics,
                      getQueryField('searchField'),
                      getQueryField('keywords'),
                    ).length
                  : 0
              }
              rows={
                data
                  ? handleSearch(
                      data?.topics,
                      getQueryField('searchField'),
                      getQueryField('keywords'),
                    )
                  : []
              }
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default MyTopic;
