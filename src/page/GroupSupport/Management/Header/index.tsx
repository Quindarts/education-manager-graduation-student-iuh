import DropDown from '@/components/ui/Dropdown';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';

function HeaderGroupStudent() {
  return (
    <Box mb={8} display={'flex'} flexWrap={'wrap'} gap={8}>
      <Box flex={1} display={'flex'} gap={4} width={'full'}>
        <Box width={200}>
          <DropDown placeholder='Tìm kiếm theo' options={[]} />
        </Box>
        <TextField fullWidth size='small' placeholder='Tim kiếm nhóm sinh viên theo..' />
      </Box>
    </Box>
  );
}

export default HeaderGroupStudent;
