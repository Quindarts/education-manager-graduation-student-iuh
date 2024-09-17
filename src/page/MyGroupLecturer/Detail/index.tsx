import SekeletonUI from '@/components/ui/Sekeleton';
import TitleManager from '@/components/ui/Title';
import { useGroupLecturer } from '@/hooks/api/useQueryGroupLecturer';
import { Box, Paper } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import TabPanelUI from './TabPanel';

function MyDetailGroupLecturer() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grLecturerId = `${current[current.length - 1]}`;
  const { handleGetGroupLecturerById } = useGroupLecturer();
  const { data, isLoading, isFetching } = handleGetGroupLecturerById(grLecturerId);

  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <>
          {/* <TitleManager>{data?.groupLecturer?.name}</TitleManager> */}
          <Box>
            <TabPanelUI groupLecturer={data?.groupLecturer} />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default MyDetailGroupLecturer;
