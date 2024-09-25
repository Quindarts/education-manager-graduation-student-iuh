import { Box, Paper } from '@mui/material';
import React from 'react';
import TableManagamentGroupStudent from './Table';
import TitleManager from '@/components/ui/Title';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useAuth } from '@/hooks/api/useAuth';
import { removeVietnameseTones } from '@/utils/search';
import Header from './Header';
import useParams from '@/hooks/ui/useParams';
export const handleSearch = (data: any[], typeSearch: string, keywords: string) => {
  const dataSort = data?.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (keywords.length === 0 || typeSearch.length === 0) {
    return dataSort;
  }
  let query = removeVietnameseTones(keywords?.toLowerCase());
  const filteredData = data.filter((topic: any) => {
    let val = removeVietnameseTones(topic[`${typeSearch}`]?.toLowerCase());
    return val.includes(query);
  });
  return filteredData.sort((a, b) => a.name.localeCompare(b.name));
};
function GroupSupportManagement() {
  const { lecturerStore } = useAuth();
  const { handleGetGroupStudentByLecturerByTerm } = useGroupStudent();
  const { data, isFetching, isLoading } = handleGetGroupStudentByLecturerByTerm(
    lecturerStore.me.user.id,
  );
  const { getQueryField } = useParams();
  return (
    <>
      <Paper sx={{ py: 10, px: 10 }} elevation={0}>
        <Box>
          <TitleManager mb={8} mt={2}>
            Danh sách nhóm sinh viên hướng dẫn
          </TitleManager>
          <Header />
        </Box>

        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <>
            <TableManagamentGroupStudent
              totalItems={
                data
                  ? handleSearch(
                      data?.groupStudents,
                      getQueryField('searchField'),
                      getQueryField('keywords'),
                    ).length
                  : 0
              }
              rows={
                data
                  ? handleSearch(
                      data?.groupStudents,
                      getQueryField('searchField'),
                      getQueryField('keywords'),
                    )
                  : []
              }
            />
          </>
        )}
      </Paper>{' '}
    </>
  );
}

export default GroupSupportManagement;
