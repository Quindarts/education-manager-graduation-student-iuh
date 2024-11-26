import { Box, Paper } from '@mui/material';
import React from 'react';
import HeaderArticle from './Header';
import TableArticleManagement from './Table';
import useArticle from '@/hooks/api/useQueryArticle';
import SekeletonTable from '@/components/ui/Sekeleton';
import { convertArticleTable } from '@/utils/convertDataTable';
import TitleManager from '@/components/ui/Title';

function ArticleManagement() {
  const { handleGetAllArticle } = useArticle();
  const { data: fetchArticle, isLoading } = handleGetAllArticle();
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <Box justifyContent={'space-between'} display={'flex'} mb={8} mt={2}>
        <TitleManager icon='quill:list'>
          Danh sách bài báo
        </TitleManager>
      </Box>
      <HeaderArticle />
      {isLoading ? (
        <SekeletonTable />
      ) : (
        <TableArticleManagement
          page={1}
          totalItems={fetchArticle?.articles.length}
          totalPage={fetchArticle?.articles.length}
          rows={convertArticleTable(fetchArticle?.articles)}
        />
      )}
    </Paper>
  );
}

export default ArticleManagement;
