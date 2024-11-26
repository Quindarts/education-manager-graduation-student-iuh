import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import TitleManager from '@/components/ui/Title';
import useEvent from '@/hooks/api/useQueryEvent';

function DeleteModal(props: any) {
  const { onClose, open, id, name, onCloseParentModal, isHaveParentModal = false } = props;
  const { onDeleteEventById } = useEvent();
  const { mutate: deleteEvent, isSuccess } = onDeleteEventById(id);
  const handleSubmit = () => {
    deleteEvent();
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
      if (isHaveParentModal) onCloseParentModal();
    }
  }, [isSuccess]);
  return (
    <Modal onClose={onClose} open={open}>
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
      >
        <Box borderRadius='50%' padding={3} sx={{ background: 'rgba(255,49,111,0.2)' }}>
          <Icon color='#b31d1d82' height={70} width={70} icon='fa-solid:trash-restore' />{' '}
        </Box>
        <Typography variant='h6' mt={10} mb={14}>
          Bạn có chắc chắn muốn xóa sự kiện{' '}
          <Typography variant='body1' component={'span'} color='error'>
            {name}
          </Typography>
          ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '20%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleSubmit} sx={{ width: '80%' }} color='error' variant='contained'>
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon='material-symbols:auto-delete-outline'
            />
            Xóa sự kiện
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default React.memo(DeleteModal);
