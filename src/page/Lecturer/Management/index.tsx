import { Box } from '@mui/material';
import React from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';

function LecturerManagementPage() {
  const { handleGetAllLecturer } = useLecturer();
  const { data, isLoading } = handleGetAllLecturer();
  console.log('🚀 ~ LecturerManagementPage ~ data:', data);
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách giảng viên
      </TitleManager>
      <HeaderLecturer />
      <>{isLoading ? <SekeletonUI /> : <TableManagamentLecturer rows={data?.lecturers} />}</>
    </Box>
  );
}

export default LecturerManagementPage;
