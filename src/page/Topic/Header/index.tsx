import DropDown from '@/components/ui/Dropdown';
import { Icon } from '@iconify/react';
import { Box, Button, TextField, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import AddModal from '../Modal/AddModal';
import ModalUpload from '@/components/ui/Upload';
import { TypeEntityUpload } from '@/hooks/ui/useExcel';
import { useTopic } from '@/hooks/api/useQueryTopic';
import UpdateQuantityTopicModal from '../Modal/UpdateQuantityTopic';
import useSearch from '@/hooks/ui/useParams';

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
  const { onSearchChange, getQueryField, onTypeSearchChange, handleFocused } = useSearch();
  return (
    <>
      <Box display={'flex'} flexWrap={'wrap'} gap={2}>
        {currentRole.includes('all') && (
          <Box flex={1} display={'flex'} gap={2} width={''}>
            <Box width={150}>
              <DropDown
                placeholder='Tìm kiếm đề tài'
                value={'name'}
                onChange={(e: any) => onTypeSearchChange(`${e.target.value}`)}
                options={SEARCH_DROP_VALUE}
              />
            </Box>
            <TextField
              fullWidth
              size='small'
              defaultValue={getQueryField('keywords')}
              onChange={onSearchChange}
              onBlur={() => handleFocused(false)}
              placeholder='Tim kiếm đề tài..'
            />
          </Box>
        )}
        {currentRole.includes('crud') && (
          <Box
            width={currentRole.includes('all') ? 'auto' : '100%'}
            justifyContent={'end'}
            gap={2}
            display={'flex'}
          >
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
            <ModalUpload
              label=''
              labelToolTip='Tải lên Excel DS Đề tài'
              entityUpload={TypeEntityUpload.TOPIC}
            />
          </Box>
        )}

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
