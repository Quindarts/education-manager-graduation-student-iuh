import Modal from '@/components/ui/Modal';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

function DeleteModal(props: any) {
  const { onClose, open, name, lecturerId } = props;
  const { onDeleteLecturer } = useLecturer();
  const { mutate: deleteLect, isSuccess } = onDeleteLecturer();

  const handleDelete = () => {
    deleteLect(lecturerId);
  };
  useEffect(() => {
    onClose();
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
        <Typography variant='h3' mt={10} mb={14}>
          Bạn có chắc chắn muốn xóa giảng viên {name} ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            sx={{ width: '50%' }}
            onClick={handleDelete}
            color='error'
            variant='contained'
          >
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon='material-symbols:auto-delete-outline'
            />
            Xóa giảng viên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
