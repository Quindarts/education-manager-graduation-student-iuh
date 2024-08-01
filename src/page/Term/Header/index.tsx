import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import AddModal from '../Modal/AddModal';
import React, { useState } from 'react';

function HeaderTerm() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };

  return (
    <>
      <Box mb={4} display={'flex'} justifyContent={'end'} flexWrap={'wrap'} gap={4}>
        {/* <Box flex={1} display={'flex'} gap={2} width={'full'}>
          <Box width={200}>
            <DropDown placeholder='Tìm kiếm theo' options={[]} />
          </Box>
          <TextField fullWidth size='small' placeholder='Tim kiếm học kì..' />
        </Box> */}
        <Button
          size='small'
          onClick={handleOpenModal}
          color='error'
          type='button'
          variant='contained'
        >
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo mới học kì
        </Button>
        {/* <Button size='small' color='warning' type='button' sx={{ color: 'white' }} variant='contained'>
          <Icon icon='carbon:clean' color='yellow' width={20} /> Làm mới
        </Button> */}
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default React.memo(HeaderTerm);
