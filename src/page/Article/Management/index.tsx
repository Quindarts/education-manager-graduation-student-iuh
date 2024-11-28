import { Box, Paper } from '@mui/material';
import React from 'react';
import HeaderArticle from './Header';
import TableArticleManagement from './Table';
import useArticle from '@/hooks/api/useQueryArticle';
import SekeletonTable from '@/components/ui/Sekeleton';
import { convertArticleTable } from '@/utils/convertDataTable';
import TitleManager from '@/components/ui/Title';
import { removeVietnameseTones } from '@/utils/search';
import useParams from '@/hooks/ui/useParams';
const SEARCH_FIELD = {
  name: 'tên bài báo',
};
const handleSearch = (data: any[], typeSearch: string, keywords: string) => {
  if (keywords.length === 0 || typeSearch.length === 0) {
    return data;
  }
  let query = removeVietnameseTones(keywords?.toLowerCase());
  return data?.filter((gr: any) => {
    let val = removeVietnameseTones(gr[`${typeSearch}`]?.toLowerCase());
    return val?.includes(query);
  });
};

function ArticleManagement() {
  const { getQueryField } = useParams();
  const { handleGetAllArticle } = useArticle();
  const { data: fetchArticle, isLoading } = handleGetAllArticle();
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <Box justifyContent={'space-between'} display={'flex'} mb={8} mt={2}>
        <TitleManager icon='quill:list'>Danh sách bài báo</TitleManager>
      </Box>
      <HeaderArticle />
      {isLoading ? (
        <SekeletonTable />
      ) : (
        <TableArticleManagement
          page={1}
          rows={
            fetchArticle?.articles
              ? handleSearch(
                  convertArticleTable(fetchArticle?.articles),
                  getQueryField('searchField'),
                  getQueryField('keywords'),
                )
              : []
          }
        />
      )}
    </Paper>
  );
}

export default ArticleManagement;
