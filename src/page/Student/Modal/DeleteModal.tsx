import Modal from '@/components/ui/Modal';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { ModalProps } from '@/types/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

type DeleteModalType = { studentId: string; name: string };

function DeleteModal(props: DeleteModalType & ModalProps) {
  const { onClose, open, studentId, name } = props;
  const { onDeleteStudent } = useStudent();
  const { mutate: deleteStudent, isSuccess } = onDeleteStudent();

  const handleSubmit = () => {
    deleteStudent(studentId);
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
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
        <Typography variant='h6' mt={10} mb={14} textAlign={'center'}>
          Bạn có chắc chắn muốn xóa sinh viên
          <Typography variant='h6' component={'span'} fontWeight={'bold'} color='error'>
            {' '}
            {name}
          </Typography>
          ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '20%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            onClick={handleSubmit}
            sx={{ width: '80%' }}
            color='error'
            variant='contained'
          >
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon='material-symbols:auto-delete-outline'
            />
            Xóa sinh viên
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteModal;
