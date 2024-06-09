import DropDown from '@/components/ui/Dropdown';
import UploadFileExcel from '@/components/ui/Upload';
import { Icon } from '@iconify/react';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTerm } from '@/hooks/api/useQueryTerm';

const SEARCH_DROP_VALUE = [
  {
    name: 'Không được duyệt',
    _id: 'REFUSE',
  },
  {
    name: 'Đang chờ',
    _id: 'PENDING',
  },
  {
    name: 'Đã duyệt',
    _id: 'ACCEPT',
  },
];
function HeaderTopic() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };
  const handleOpenModal = () => {
    setOpenAddModal(true);
  };
  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'} gap={4}>
        <Box flex={1} display={'flex'} gap={4} width={'full'}>
          <Box width={200}>
            <DropDown placeholder='Tìm kiếm đề tài' options={SEARCH_DROP_VALUE} />
          </Box>
          <TextField fullWidth size='small' placeholder='Tim kiếm đề tài..' />
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
        <ModalUpload entityUpload={TypeEntityUpload.TOPIC} termId={currentTerm.id} />
        <Button color='warning' type='button' size='small' variant='contained'>
          <Icon icon='carbon:clean' color='white' width={20} /> Làm mới
        </Button>
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
    </>
  );
}

export default HeaderTopic;
