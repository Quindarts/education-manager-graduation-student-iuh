import { Box, Paper } from '@mui/material';
import React from 'react';
import HeaderArticle from './Header';
import TableFinalReportManagement from './Table';
import SekeletonTable from '@/components/ui/Sekeleton';
import { convertArticleTable } from '@/utils/convertDataTable';
import TitleManager from '@/components/ui/Title';
import { removeVietnameseTones } from '@/utils/search';
import useParams from '@/hooks/ui/useParams';
import useFinalReport from '@/hooks/api/useQueryFinalReport';
import { useMajor } from '@/hooks/api/useQueryMajor';
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

function FinalReportManagement() {
  const { getQueryField } = useParams();
  const { handlegetAllFinalReport } = useFinalReport();
  const { data: fetchFinalReport, isLoading } = handlegetAllFinalReport();
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <Box justifyContent={'space-between'} display={'flex'} mb={8} mt={2}>
        <TitleManager icon='quill:list'>
          Nộp file báo cáo cuối kỳ
        </TitleManager>
      </Box>
      <HeaderArticle />
      {isLoading ? (
        <SekeletonTable />
      ) : (
        <TableFinalReportManagement
          page={1}
          rows={
            fetchFinalReport?.finalReports
              ? handleSearch(
                  convertArticleTable(fetchFinalReport?.finalReports),
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

export default FinalReportManagement;
