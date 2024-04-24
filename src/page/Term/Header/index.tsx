import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';

function HeaderTerm() {
  return (
    <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={8}>
      <Box flex={1} display={'flex'} gap={4} width={'full'}>
        <TextField fullWidth size='small' placeholder='Tim kiếm học kì..' />
        <Box width={200}>
          <DropDown sx={{ mb: 0 }} placeholder='Tìm kiếm theo' options={[]} />
        </Box>
      </Box>
      <Button color='error' type='button' variant='contained'>
        <Icon icon='lets-icons:add-round' width={20} />
        Tạo mới học kì
      </Button>
      <Button color='success' sx={{ color: 'white' }} type='button' variant='contained'>
        <Icon icon='ic:baseline-upload' width={20} />
        Upload Excel
      </Button>
      <Button color='warning' type='button' sx={{ color: 'white' }} variant='contained'>
        <Icon icon='carbon:clean' color='yellow' width={20} /> Làm mới
      </Button>
    </Box>
  );
}

export default HeaderTerm;
