import Modal from '@/components/ui/Modal';
import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

function DeleteGroupStudentModal(props: any) {
  const { groupStudentId, groupStudentName, open, onClose } = props;
  const { onDeleteGroupStudent } = useGroupStudent();
  const { mutate: deleteGroup, isSuccess } = onDeleteGroupStudent();

  const handleSubmit = () => {
    deleteGroup(groupStudentId);
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
        <Box borderRadius='50%' padding={10} sx={{ background: 'rgba(255,49,111,0.2)' }}>
          <Icon color='#b31d1d82' height={70} width={70} icon='uiw:usergroup-delete' />{' '}
        </Box>
        <Typography variant='h3' mt={10} mb={14}>
          Bạn muốn giải tán {groupStudentName} này ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            sx={{ width: '50%' }}
            onClick={handleSubmit}
            color='error'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='uiw:usergroup-delete' />
            Xóa nhóm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteGroupStudentModal;
