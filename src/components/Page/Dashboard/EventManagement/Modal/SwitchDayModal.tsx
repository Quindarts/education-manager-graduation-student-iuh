import Modal from '@/components/ui/Modal';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import useEvent from '@/hooks/api/useQueryEvent';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import SekeletonTable from '@/components/ui/Sekeleton';

function SwitchDayModal(props: any) {
  const { onClose, open, id, oldDate, newDate, name, eventDrag } = props;
  const { onUpdateEndDateEventById, handleGetEventById } = useEvent();
  const { data: eventFetch, isLoading: loadingFetch } = handleGetEventById(id);
  const { mutate: switchDay, isSuccess } = onUpdateEndDateEventById(id);
  const { enqueueSnackbar } = useSnackbar();
  const handleSwitchDay = () => {
    if (dayjs(newDate) < dayjs(eventFetch?.event?.startDate)) {
      enqueueSnackbar('Ngày kết thúc phải bé hơn ngày bắt đầu', { variant: 'error' });
      return;
    }
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
      {loadingFetch ? (
        <SekeletonTable />
      ) : (
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
          <Typography variant='h6' fontSize={13} mt={10}>
            Bạn có muốn dời ngày kết thúc{' '}
            <Typography variant='h6' component={'span'} fontWeight={600} color='grey.700'>
              "Sự kiện {name.split('_')[0]}"{' '}
            </Typography>
            không?
          </Typography>
          <Typography fontWeight={'500'} variant='body2' mt={4} color='grey.700'>
            Từ ngày {dayjs(oldDate).format('hh:mm A DD-MM-YYYY   ')} {' sang ngày '}
            {dayjs(newDate).format('hh:mm A DD-MM-YYYY  ')}?
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
      )}
    </Modal>
  );
}

export default React.memo(SwitchDayModal);
