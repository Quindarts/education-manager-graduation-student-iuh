import Modal from '@/components/ui/Modal';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
function EditStatus(props: any) {
  const { onClose, open, studentId, name, status } = props;

  const { onLockOnlyStudent } = useStudent();
  const { mutate: locked, isSuccess } = onLockOnlyStudent(studentId);
  const handleLocked = () => {
    locked(status);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box py={10} m={10}>
        <Typography mb={4} textAlign={'center'} variant='h5'>
          {status ? 'Khóa tài khoản Sinh viên ' : 'Mở tài khoản Sinh viên '}{' '}
          <Typography variant='h6' component={'span'} fontWeight={'bold'} color='error'>
            {' '}
            {name}
          </Typography>{' '}
          {' ?'}
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
            color={status ? 'error' : 'success'}
            onClick={handleLocked}
          >
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon={!status ? 'bi:unlock' : 'material-symbols:lock-outline'}
            />
            {status ? 'Khóa tài khoản ' : 'Mở tài khoản '}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditStatus;
