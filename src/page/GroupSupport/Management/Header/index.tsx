import DropDown from '@/components/ui/Dropdown';
import { Box, TextField } from '@mui/material';
import React from 'react';
import SearchInput from './SearchInput';
import useGroupSupport from '@/hooks/api/useQueryGroupSupport';
import ExportExcelButton from '@/components/ui/Export';

function Header() {
  const { handleGetGrToExport } = useGroupSupport();
  const { data } = handleGetGrToExport();
  return (
    <Box mb={8} display={'flex'} flexWrap={'wrap'} gap={8}>
      <Box flex={1} display={'flex'} gap={4} width={'full'}>
        <SearchInput />
        <ExportExcelButton label='' data={data?.groupStudents} entity='groupStudent' />
      </Box>
    </Box>
  );
}

export default Header;
