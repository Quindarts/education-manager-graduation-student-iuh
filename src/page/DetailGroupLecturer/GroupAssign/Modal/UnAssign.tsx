import Modal from '@/components/ui/Modal';
import useAssign from '@/hooks/api/useQueryAssign';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

function UnAssignModal(props: any) {
  const { onClose, open, grStudentId, grName, topicName } = props;
  const {} = useAssign();
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const grLecturerId = `${current[current.length - 1]}`;

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
        <Box
          borderRadius='50%'
          width={100}
          height={100}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ background: 'rgba(255,49,111,0.2)' }}
        >
          <Icon color='#b31d1d82' width={70} icon='material-symbols:group-remove-outline-rounded' />{' '}
        </Box>
        <Typography textAlign={'center'} fontWeight={'bold'} variant='h5' mt={10}>
          Gỡ phân công {grName}
        </Typography>
        <Typography textAlign={'center'} variant='h6' mt={2} mb={14}>
          Đề tài: {topicName} ?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={1}>
          <Button onClick={onClose} sx={{ width: '50%' }} color='primary' variant='contained'>
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button type='submit' sx={{ width: '50%' }} color='error' variant='contained'>
            <Icon
              width={20}
              style={{ marginRight: 4 }}
              icon='material-symbols:group-remove-outline-rounded'
            />
            Gỡ phân công
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default UnAssignModal;
