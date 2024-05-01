import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import AddModal from '../Modal/AddModal';
import { useState } from 'react';

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
      <Box mb={4} display={'flex'} flexWrap={'wrap'} gap={8}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <TextField fullWidth size='small' placeholder='Tim kiếm học kì..' />
          <Box width={200}>
            <DropDown placeholder='Tìm kiếm theo' options={[]} />
          </Box>
        </Box>
        <Button onClick={handleOpenModal} color='error' type='button' variant='contained'>
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
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderTerm;
