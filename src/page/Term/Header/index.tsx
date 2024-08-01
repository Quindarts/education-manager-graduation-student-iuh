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
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default React.memo(HeaderTerm);
