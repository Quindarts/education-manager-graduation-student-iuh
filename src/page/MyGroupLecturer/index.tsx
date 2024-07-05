import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import GridGroupLecturer from './Grid';
import TitleManager from '@/components/ui/Title';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { ENUM_GROUP_LECTURER } from '@/utils/validations/groupLecturer.validation';
import DropDown from '@/components/ui/Dropdown';
import SekeletonUI from '@/components/ui/Sekeleton';

function MyGroupLecturer() {
  const { handleGetGroupLecturerByLecturerId } = useGroupLecturer();
  const [typeGroupLecturer, setTypeGroupLecturer] = useState<string>(
    `${ENUM_GROUP_LECTURER[0]?._id}`,
  );

  const { data, isLoading, isFetching } = handleGetGroupLecturerByLecturerId(typeGroupLecturer);

  return (
    <Paper sx={{ p: 10 }} elevation={3}>
      <TitleManager mb={4}>Danh sách nhóm giảng viên của bạn</TitleManager>
      <DropDown
        onChange={(e: any) => {
          setTypeGroupLecturer(e.target.value);
        }}
        value={typeGroupLecturer}
        options={ENUM_GROUP_LECTURER}
      />
      <Box my={10}>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : (
          <GridGroupLecturer groupLecturers={data?.groupLecturers} />
        )}
      </Box>
    </Paper>
  );
}

export default MyGroupLecturer;
