import Modal from '@/components/ui/Modal';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';

function DeleteMajorModal(props: any) {
  const { onClose, open, majorId } = props;
  const { onDeleteMajor } = useMajor();

  const { mutate: deleteMajor, isSuccess } = onDeleteMajor(majorId);
  const handleDelete = () => {
    deleteMajor();
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
          Bạn có chắc chắn muốn xóa chuyên ngành này ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button onClick={handleDelete} sx={{ width: '50%' }} color='error' variant='contained'>
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon='material-symbols:auto-delete-outline'
            />
            Xóa chuyên ngành
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default DeleteMajorModal;
