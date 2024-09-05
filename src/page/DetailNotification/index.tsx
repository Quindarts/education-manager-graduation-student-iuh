import SekeletonUI from '@/components/ui/Sekeleton';
import { useNotification } from '@/hooks/api/useQueryNotification';
import { Box, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { Icon } from '@iconify/react';
import { useNotificationLecturer } from '@/hooks/api/useQueryNotificationLecturer';
function DetailNotificationPage() {
  const { pathname } = useLocation();
  const current = pathname.split('/');
  const notificationId = `${current[current.length - 1]}`;
  const { onUpdateReadStatus, handleGetNotificationOfLecturer } = useNotificationLecturer();

  const { data, isLoading, isFetching } = handleGetNotificationOfLecturer(notificationId);
  const { mutate: toggleRead } = onUpdateReadStatus(notificationId);

  const hanldeToggleRead = () => {
    toggleRead();
  };
  return (
    <Paper elevation={0} sx={{ px: 10, py: 12 }}>
      {isLoading || isFetching ? (
        <SekeletonUI />
      ) : (
        <Box>
          {/* <TitleManager mb={6} variant='h4' textTransform={'uppercase'}>
            Chi tiết thông báo
          </TitleManager> */}
          <Typography variant='body1' color='grey.700'>
            Ngày gửi {dayjs(data?.notification?.createdAt).format('DD/MM/YYYY')}
          </Typography>

          <Typography mt={4} mb={10} variant='h3' color='grey.700' fontWeight={'bold'}>
            {data?.notification?.title}
          </Typography>
          <Box>
            <Typography
              mt={6}
              variant='h6'
              color='initial'
              fontFamily={'Arial, sans-serif'}
              dangerouslySetInnerHTML={{ __html: data?.notification?.content }}
            />
          </Box>
          <Box justifyContent={'end'} display={'flex'}>
            {data?.notification?.isRead === 1 ? (
              <Typography variant='h6' component={'i'} color='success.dark'>
                Đã xem
                <Icon width={12} style={{ marginLeft: 2 }} icon='subway:tick' />
              </Typography>
            ) : (
              <Button onClick={hanldeToggleRead} variant='contained' color='primary'>
                <Icon style={{ marginRight: 2 }} icon='subway:tick' />
                Đánh dấu là đã đọc
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default DetailNotificationPage;
