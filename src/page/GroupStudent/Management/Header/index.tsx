import DropDown from '@/components/ui/Dropdown';
import MenuButton from '@/components/ui/MenuButton';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddGroupStudentModal from '../../Modal/Add';

function HeaderGroupStudent() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  return (
    <Box mb={8} display={'flex'} flexWrap={'wrap'} gap={8}>
      <Box flex={1} display={'flex'} gap={4} width={'full'}>
        <Box width={200}>
          <DropDown placeholder='Tìm kiếm theo' options={[]} />
        </Box>
        <TextField fullWidth size='small' placeholder='Tim kiếm  nhom sinh viên theo..' />
      </Box>
      <Button
        size='small'
        onClick={handleOpenModal}
        color='error'
        type='button'
        variant='contained'
      >
        <Icon icon='lets-icons:add-round' width={20} />
        Tạo nhóm sinh viên
      </Button>
      {/* <MenuButton /> */}
      <AddGroupStudentModal open={openAddModal} onClose={handleCloseAddModal} />
    </Box>
  );
}

export default HeaderGroupStudent;
