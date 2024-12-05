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
    .replace(/Đ/g, 'D')
    .toLowerCase();
}
export const handleSearch = (data: any[], typeSearch: string, keywords: string) => {
  if (keywords.length === 0 || typeSearch.length === 0) {
    return data;
  }
  let query = removeVietnameseTones(keywords);
  return data?.filter((gr: any) => {
    let val = removeVietnameseTones(gr[`${typeSearch}`]?.toLowerCase());
    return val?.includes(query);
  });
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
        <Box>
          <Typography variant='body1' fontWeight={600} color='#464646'>
            Tổng số lượng : {data?.groupStudents.length} nhóm
          </Typography>
          {getQueryField('keywords') && (
            <Typography
              textAlign={'end'}
              variant='body1'
              fontWeight={500}
              mt={0}
              mb={1}
              color='primary'
            >
              Kết quả tìm kiếm:{' '}
              {data
                ? handleSearch(
                    data.groupStudents,
                    getQueryField('searchField'),
                    getQueryField('keywords'),
                  ).length
                : 0}{' '}
              nhóm
            </Typography>
          )}
        </Box>
      </Box>

      <HeaderGroupStudent countGroups={100} />
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <TableManagamentGroupStudent
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
