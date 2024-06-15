import { Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import TableManagamentLecturer from './Table';
import TitleManager from '@/components/ui/Title';
import HeaderLecturer from './Header';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { convertLecturer } from '@/utils/convertDataTable';
import { ENUM_RENDER_LECTURER } from '@/store/slice/lecturer.slice';

function LecturerManagementPage() {
  const { handleGetAllLecturer, handleManagerRenderActionLecturer, params } = useLecturer();
  const [typeRender, setTypeRender] = useState(ENUM_RENDER_LECTURER.ALL);

  const { termStore } = useTerm();

  const [currentLimit, setCurrentLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(params.page);

  const [keywords, setKeywords] = useState('');
  const [typeSearch, setTypeSearch] = useState<'full_name' | 'username' | 'phone' | 'email'>(
    'full_name',
  );
  const { data, isLoading, isFetched } = handleManagerRenderActionLecturer(
    termStore.currentTerm.id,
    currentLimit,
    currentPage,
    typeSearch,
    keywords,
    typeRender,
  );
  useEffect(() => {
    if (keywords !== '') setTypeRender(ENUM_RENDER_LECTURER.SEARCH);
  }, [keywords]);

  const handleChangePage = (value: string | Number) => {
    setCurrentPage(value);
  };
  const handleChangeDropSearch = (value: 'full_name' | 'username' | 'phone' | 'email') => {
    setTypeSearch(value);
  };
  const handleChangeKeywords = (value: string) => {
    setKeywords(value);
  };
  const onClearSearch = () => {
    setCurrentPage(1);
    setTypeRender(ENUM_RENDER_LECTURER.ALL);
  };
  return (
    <Paper sx={{ py: 20, px: 10 }} elevation={1}>
      <TitleManager mb={14} mt={2}>
        Danh sách giảng viên
      </TitleManager>
      <>
        <HeaderLecturer
          typeSearch={typeSearch}
          handleChangeKeywords={handleChangeKeywords}
          handleChangeDropSearch={handleChangeDropSearch}
          onClearSearch={onClearSearch}
        />
        {isLoading && !isFetched ? (
          <SekeletonUI />
        ) : (
          <TableManagamentLecturer
            currentTermId={termStore.currentTerm.id}
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
