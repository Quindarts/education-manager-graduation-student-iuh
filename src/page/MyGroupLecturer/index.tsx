import { Box, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';
import GridGroupLecturer from './Grid';
import TitleManager from '@/components/ui/Title';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { ENUM_GROUP_LECTURER } from '@/utils/validations/groupLecturer.validation';
import DropDown from '@/components/ui/Dropdown';
import SekeletonUI from '@/components/ui/Sekeleton';

function MyGroupLecturer() {
  const { handleGetGroupLecturerByLecturerId } = useGroupLecturer();
  const { data, isLoading, isFetching } = handleGetGroupLecturerByLecturerId();

  return (
    <Paper sx={{ p: 10, minHeight: 500 }} elevation={0}>
      <TitleManager mb={4}>Danh sách nhóm giảng viên của bạn</TitleManager>
      <Box my={10}>
        {isLoading || isFetching ? (
          <SekeletonUI />
        ) : data?.groupLecturers && data.groupLecturers?.length > 0 ? (
          <GridGroupLecturer groupLecturers={data?.groupLecturers} />
        ) : (
          <Box
            mx={'auto'}
            display={'flex'}
            flexDirection={'column'}
            alignContent={'center'}
            justifyContent={'center'}
            textAlign={'center'}
            py={20}
            width={'100%'}
          >
            <Box>
              <img
                style={{ opacity: 0.7 }}
                width={200}
                height={200}
                src='/images/nodata.webp'
                alt='nodata'
              />
            </Box>
            <Typography variant='h6' sx={{ mt: 2 }}>
              Không có dữ liệu ( Data not found)
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
}

export default MyGroupLecturer;
