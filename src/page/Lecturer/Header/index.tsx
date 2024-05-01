import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';

function HeaderLecturer() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  return (
    <>
      <Box mb={14} display={'flex'} flexWrap={'wrap'} gap={8}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <TextField fullWidth size='small' placeholder='Tim kiếm giảng viên theo..' />
          <Box width={200}>
            <DropDown placeholder='Tìm kiếm theo' options={[]} />
          </Box>
        </Box>
        <Button color='error' type='button' onClick={handleOpenModal} variant='contained'>
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo giảng viên
        </Button>
        <Button color='success' sx={{ color: 'white' }} type='button' variant='contained'>
          <Icon icon='ic:baseline-upload' width={20} />
          Upload Excel
        </Button>
        <Button color='warning' type='button' sx={{ color: 'white' }} variant='contained'>
          <Icon icon='carbon:clean' color='yellow' width={20} /> Làm mới
        </Button>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderLecturer;
