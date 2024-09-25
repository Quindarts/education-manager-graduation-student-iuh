import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderGroupStudent from './Header';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import useParams from '@/hooks/ui/useParams';

export function removeVietnameseTones(str: string) {
  return str
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
export const handleSearch = (data: any[], typeSearch: string, keywords: string) => {
  const dataSort = data?.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (keywords.length === 0 || typeSearch.length === 0) {
    return dataSort;
  }

  let query = removeVietnameseTones(keywords?.toLowerCase());
  const filteredData = data.filter((gr: any) => {
    let val = removeVietnameseTones(gr[`${typeSearch}`]?.toLowerCase());
    return val.includes(query);
  });
  return filteredData.sort((a, b) => a.name.localeCompare(b.name));
};
function GroupStudentManagement() {
  //[FETCH]
  const { handleManagerRenderActionGroupStudent } = useGroupStudent();
  const { data, isLoading } = handleManagerRenderActionGroupStudent();

  //[PARAMS]
  const { getQueryField } = useParams();

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={0}>
      <Box justifyContent={'space-between'} display={'flex'} mb={2} mt={2}>
        <TitleManager icon='quill:list' mb={8} mt={2}>
          Danh sách nhóm sinh viên
        </TitleManager>
        <Typography variant='h5' fontWeight={700} mt={4} color='#636363'>
          Số nhóm:{' '}
          {data
            ? handleSearch(
                data.groupStudents,
                getQueryField('searchField'),
                getQueryField('keywords'),
              ).length
            : 0}
        </Typography>
      </Box>

      <HeaderGroupStudent countGroups={100} />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <TableManagamentGroupStudent
          totalPage={1}
          totalItems={
            data
              ? handleSearch(
                  data.groupStudents,
                  getQueryField('searchField'),
                  getQueryField('keywords'),
                ).length
              : 0
          }
          rows={
            data
              ? handleSearch(
                  data.groupStudents,
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

export default GroupStudentManagement;
