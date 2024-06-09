import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';

function HeaderStudent() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { termStore } = useTerm();
  return (
    <>
      <Box mb={14} display={'flex'} flexWrap={'wrap'} gap={8}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <Box width={200}>
            <DropDown placeholder='Tìm kiếm theo' options={[]} />
          </Box>
          <TextField fullWidth size='small' placeholder='Tim kiếm sinh viên theo..' />
        </Box>
        {/* <Button onClick={handleOpenModal} color='error' type='button' variant='contained'>
          <Icon icon='lets-icons:add-round' width={20} />
          Tạo sinh viên
        </Button> */}
        <ModalUpload entityUpload={TypeEntityUpload.STUDENT} termId={termStore.currentTerm.id} />
        <Button color='warning' type='button' sx={{ color: 'white' }} variant='contained'>
          <Icon icon='carbon:clean' color='yellow' width={20} /> Làm mới
        </Button>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderStudent;
