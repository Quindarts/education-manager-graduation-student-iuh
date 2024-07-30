import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useUploadExcel';
import { useTopic } from '@/hooks/api/useQueryTopic';
import UpdateQuantityTopicModal from '../Modal/UpdateQuantityTopic';

const SEARCH_DROP_VALUE = [
  {
    name: 'Tên Đề tài',
    _id: 'name',
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
  const [openChangeQuantityModal, setOpenChangeQuantityModal] = useState(false);
  const handleCloseChangeQuantityModal = () => {
    setOpenChangeQuantityModal(false);
  };
  const handleOpenChangeQuantityModal = () => {
    setOpenChangeQuantityModal(true);
  };

  const { handleUiRender } = useTopic();
  const currentRole = handleUiRender();
  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'} gap={2}>
        <Box  flex={1} display={'flex'} gap={2} width={'full'}>
          <Box width={150}>
            <DropDown
              placeholder='Tìm kiếm đề tài'
              value={SEARCH_DROP_VALUE[0]?._id}
              options={SEARCH_DROP_VALUE}
            />
          </Box>
          <TextField fullWidth size='small' placeholder='Tim kiếm đề tài..' />
        </Box>
        {currentRole.includes('crud') && (
          <>
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
          </>
        )}

        <ModalUpload
          label=''
          labelToolTip='Tải lên Excel DS Đề tài'
          entityUpload={TypeEntityUpload.TOPIC}
        />
        {currentRole.includes('all') && (
          <Tooltip onClick={handleOpenChangeQuantityModal} title='Cập nhật số lượng Đề tài'>
            <Button
              sx={{ bgcolor: 'grey.800' }}
              color='primary'
              type='button'
              size='small'
              variant='contained'
            >
              <Icon icon='uiw:setting' color='white' width={20} />
            </Button>
          </Tooltip>
        )}
      </Box>
      <AddModal open={openAddModal} onClose={handleCloseAddModal} />
      <UpdateQuantityTopicModal
        open={openChangeQuantityModal}
        onClose={handleCloseChangeQuantityModal}
      />
    </>
  );
}

export default React.memo(HeaderTopic);
