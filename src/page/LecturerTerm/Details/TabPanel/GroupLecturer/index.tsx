import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GridGroupLecturer from './Grid';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { ENUM_GROUP_LECTURER } from '@/utils/validations/groupLecturer.validation';
import DropDown from '@/components/ui/Dropdown';
import SekeletonUI from '@/components/ui/Sekeleton';

function GroupLecturer({ lecturerId }: any) {
  const { handleGetGroupLecturerByLecturerId } = useGroupLecturer();
  const [typeGroupLecturer, setTypeGroupLecturer] = useState<string>(
    `${ENUM_GROUP_LECTURER[0]?._id}`,
  );

  const { data, isLoading, isFetching, refetch } = handleGetGroupLecturerByLecturerId(
    typeGroupLecturer,
    lecturerId,
  );

  useEffect(() => {
    refetch();
  }, []);
  return (
    <Paper sx={{ px: 10 }} elevation={0}>
      <Box mb={10}>
        <Box gap={4} mt={2} mb={6} pb={4} borderBottom={'2px solid #c2c2c2'} display={'flex'}>
          <Typography variant='h6' fontWeight={'bold'} mt={2} color='primary.dark'>
            Danh sách nhóm{' '}
          </Typography>
          <Box width={160}>
            <DropDown
              onChange={(e: any) => {
                setTypeGroupLecturer(e.target.value);
              }}
              value={typeGroupLecturer}
              options={ENUM_GROUP_LECTURER}
            />
          </Box>
        </Box>

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

export default GroupLecturer;
