import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useEvent from '@/hooks/api/useQueryEvent';
import dayjs from 'dayjs';

function SwitchDayModal(props: any) {
  const { onClose, open, id, oldDate, newDate, name, eventDrag } = props;
  const { onUpdateEndDateEventById } = useEvent();
  const { mutate: switchDay, isSuccess } = onUpdateEndDateEventById(id);
  const handleSwitchDay = () => {
    switchDay(newDate);
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <Modal
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <Box
        width='100%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        px={10}
        py={12}
        textAlign={'center'}
      >
        <Box borderRadius='50%' padding={10} sx={{ background: 'rgba(164, 166, 165, 0.2)' }}>
          <Icon color='#6cfda882' height={70} width={70} icon='fluent-color:calendar-clock-16' />{' '}
        </Box>
        <Typography variant='h6' mt={10}>
          Bạn có chắc chắn muốn chuyển ngày kết thúc sự kiện{' '}
          <Typography variant='body1' component={'span'} color='primary.main'>
            {name}{' '}
          </Typography>
        </Typography>
        <Typography fontWeight={'bold'} variant='h6' mt={2} color='error.main'>
          {dayjs(oldDate).format('hh:mm DD-MM-YYYY  ')} {' ----> '}
          {dayjs(newDate).format('hh:mm DD-MM-YYYY  ')}?
        </Typography>
        <Box width='100%' display='flex' gap={6} marginTop={10}>
          <Button
            onClick={() => {
              eventDrag.revert();
              onClose();
            }}
            sx={{ width: '20%' }}
            color='primary'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
            Hủy
          </Button>
          <Button
            onClick={handleSwitchDay}
            type='submit'
            sx={{ width: '80%' }}
            color='success'
            variant='contained'
          >
            <Icon width={20} style={{ marginRight: 4 }} icon='ph:calendar-check' />
            Lưu thay đổi
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default React.memo(SwitchDayModal);
