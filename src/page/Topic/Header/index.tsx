import DropDown from '@/components/ui/Dropdown';
import UploadFileExcel from '@/components/ui/Upload';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';

function HeaderTopic() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'} gap={4}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <TextField fullWidth size='small' placeholder='Tim kiếm học kì..' />
          <Box width={200}>
            <DropDown placeholder='Tìm kiếm theo' options={[]} />
          </Box>
        </Box>
        <Button
          onClick={handleOpenModal}
          size='small'
          color='error'
          type='button'
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo mới đề tài
        </Button>
        <UploadFileExcel />
        <Button color='warning' type='button' size='small' variant='contained'>
          <Icon icon='carbon:clean' color='white' width={20} /> Làm mới
        </Button>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderTopic;
