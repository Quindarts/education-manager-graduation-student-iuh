import Modal from '@/components/ui/Modal';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

function LockAccountModal(props: any) {
  const { onClose, open } = props;
  const { onLockAllStudents } = useStudent();
  const { mutate: locked, isSuccess } = onLockAllStudents();

  const handleLocked = () => {
    locked();
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box py={10} m={10}>
        <Typography mb={4} textAlign={'center'} variant='h5'>
          Khóa tài khoản tất cả sinh viên ?
        </Typography>
        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '20%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            sx={{ width: '80%' }}
            variant='contained'
            color={'error'}
            onClick={handleLocked}
          >
            <Icon width={20} style={{ marginRight: 4 }} icon={'material-symbols:lock-outline'} />
            Khóa tài khoản
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default LockAccountModal;
