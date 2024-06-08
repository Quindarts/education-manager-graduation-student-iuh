import { Box } from '@mui/material';
import React from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { convertLecturer } from '@/utils/convertDataTable';

function LecturerManagementPage() {
  const { handleGetAllLecturer } = useLecturer();
  const { termStore } = useTerm();
  const { data, isLoading, isFetched } = handleGetAllLecturer(termStore.currentTerm.id, 20, 1);
  const { handleGetAllMajor } = useMajor();
  const { data: listMajor, isLoading: loadingMajor } = handleGetAllMajor();
  return (
    <Box>
      <TitleManager mb={14} mt={2}>
        Danh sách giảng viên
      </TitleManager>
      <>
        {isLoading && loadingMajor && !isFetched ? (
          <SekeletonUI />
        ) : (
          <>
            <HeaderLecturer listMajor={listMajor?.majors} />
            <TableManagamentLecturer
              currentTermId={termStore.currentTerm.id}
              listMajor={listMajor?.majors}
              rows={convertLecturer(data?.lecturers)}
            />
          </>
        )}
      </>
    </Box>
  );
}

export default LecturerManagementPage;
