import Modal from '@/components/ui/Modal';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
function EditStatus(props: any) {
  const { onClose, open, studentId, status } = props;

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
      <Box m={10}>
        <Typography mb={4} fontWeight={600} variant='h3'>
          {status ? 'Đóng tài khoản Sinh viên ?' : 'Mở tài khoản Sinh viên ?'}
        </Typography>

        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '50%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            type='submit'
            sx={{ width: '50%' }}
            variant='contained'
            color={status ? 'error' : 'success'}
            onClick={handleLocked}
          >
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon={!status ? 'bi:unlock' : 'material-symbols:lock-outline'}
            />
            {status ? 'Đóng tài khoản ' : 'Mở tài khoản '}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditStatus;
