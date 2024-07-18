import { Box, Paper } from '@mui/material';
import React, { useState } from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { convertLecturer } from '@/utils/convertDataTable';
import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';
import { useMajor } from '@/hooks/api/useQueryMajor';

function LecturerManagementPage() {
  const { handleManagerRenderActionLecturer, params } = useLecturer();
  const { majorStore } = useMajor();
  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(params?.page);
  const [keywords, setKeywords] = useState('');
  const [typeSearch, setTypeSearch] = useState<ENUM_RENDER_LECTURER>(ENUM_RENDER_LECTURER.ALL);

  const { data, isLoading, isFetching } = handleManagerRenderActionLecturer(
    currentLimit,
    currentPage,
    typeSearch,
    keywords,
  );

  const handleChangePage = (value: string | Number) => {
    setCurrentPage(value);
  };
  const handleChangeDropSearch = (value: ENUM_RENDER_LECTURER) => {
    setTypeSearch(value);
  };
  const handleChangeKeywords = (value: string) => {
    setKeywords(value);
  };
  const onClearSearch = () => {
    setCurrentPage(1);
    setKeywords('');
    setTypeSearch(ENUM_RENDER_LECTURER.ALL);
  };
  return (
    <Paper sx={{ py: 10, px: 10 }} elevation={1}>
      <TitleManager mb={8} mt={2}>
        Danh sách giảng viên {majorStore?.currentMajor ? majorStore.currentMajor.name : ''}
      </TitleManager>
      <>
        <HeaderLecturer
          typeSearch={typeSearch}
          handleChangeKeywords={handleChangeKeywords}
          handleChangeDropSearch={handleChangeDropSearch}
          onClearSearch={onClearSearch}
        />
        {isLoading && !isFetching ? (
          <SekeletonUI />
        ) : (
          <TableManagamentLecturer
            rows={convertLecturer(data?.lecturers)}
            totalPage={params.totalPage}
            totalItems={data?.lecturers.length}
            handleChangePage={handleChangePage}
            page={currentPage}
          />
        )}
      </>
    </Paper>
  );
}

export default LecturerManagementPage;
