import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import HeaderGroupLecturer from './Header';
import TitleManager from '@/components/ui/Title';
import TableManagamentGroupLecturer from './Table';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertGroupLecturerTable } from '@/utils/convertDataTable';
function GroupLecturerManagementPage() {
  const [checkType, setCheckType] = useState('');
  const handleTypeGroupLecturer = (checkType: string) => {
    setCheckType(checkType);
  };
  const { handleGetAllGroupLecturerByTypeGroup } = useGroupLecturer();
  const { data, isSuccess, isLoading, isFetching } = handleGetAllGroupLecturerByTypeGroup(checkType);
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager icon='quill:list' mb={0} mt={2}>
        Danh sách nhóm giảng viên
      </TitleManager>
      <HeaderGroupLecturer handleTypeGroupLecturer={handleTypeGroupLecturer} />

      <Box width={'full'} my={4}>
        {isLoading ||isFetching ? (
          <SekeletonUI />
        ) : (
          <TableManagamentGroupLecturer rows={convertGroupLecturerTable(data?.groupLecturers)} />
        )}
      </Box>
    </Paper>
  );
}

export default GroupLecturerManagementPage;
