import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { title } from 'process';
import React from 'react';

const ACTIVE_DROP_VALUE = [
  {
    name: 'Hoạt động',
    _id: `${true}`,
  },
  {
    name: 'Bị khóa',
    _id: `${false}`,
  },
];
function EditStatus(props: any) {
  const { onClose, open, lecturer_id } = props;
  return (
    <Modal open={open} onClose={onClose}>
      <Box m={10}>
        <Typography mb={4} fontWeight={600} variant='h3'>
          Cập nhật trạng thái giảng viên ?
        </Typography>
        <DropDown style={{ marginTop: '1rem' }} defaultValue={true} options={ACTIVE_DROP_VALUE} />
        <Box mt={12} sx={{ display: 'flex', gap: 3 }}>
          <Button onClick={onClose} sx={{ width: '50%' }} variant='contained' color='primary'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button type='submit' sx={{ width: '50%' }} variant='contained' color='success'>
            <Icon width={20} style={{ marginRight: 4 }} icon='dashicons:update-alt' />
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default EditStatus;
