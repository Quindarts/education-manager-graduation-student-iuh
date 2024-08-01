import usePopup from '@/hooks/ui/usePopup';
import { Icon } from '@iconify/react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { Button, CircularProgress, Paper } from '@mui/material';
import { useNotification } from '@/hooks/api/useQueryNotification';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const { handleActive, active, menuRef } = usePopup();
  const { handleGetMyNotification } = useNotification();
  const { data, isLoading, isFetching } = handleGetMyNotification();
  const navigate = useNavigate();
  const handleNavigate = (id: string) => {
    navigate(`/notifications/${id}`);
    handleActive();
  };
  return (
    <Box
      position='relative'
      ref={menuRef}
      height={70}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <IconButton
        onClick={handleActive}
        className={`${active && 'active'}`}
        sx={{
          '& svg': {
            color: 'text.secondary',
          },
        }}
        size='small'
        color='info'
      >
        <Badge
          badgeContent={
            data
              ? data?.notificationLecturers.filter((noti: any) => noti.isRead === false).length
              : 0
          }
          color='error'
          sx={{
            height: '100%',
            '& .MuiBadge-colorError': {
              backgroundColor: 'error.light',
            },
          }}
        >
          <Box display='flex' alignItems='center' padding={2}>
            <Icon icon='tdesign:notification' />
          </Box>
        </Badge>
      </IconButton>

      {active && (
        <Box
          top={'80%'}
          right={0}
          boxShadow={
            ' rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;'
          }
          sx={{
            backgroundColor: 'background.paper',
            zIndex: 20,
            width: {
              xs: '100vw',
              sm: 450,
            },
            height: active ? 500 : 0,
            position: {
              xs: 'fixed',
              sm: 'absolute',
            },
          }}
          borderRadius={2}
          border={`0px solid grey.400`}
        >
          <Box
            display='flex'
            justifyContent='space-between'
            padding={4}
            height={54}
            borderRadius='8px 8px 0 0 '
            sx={{ backgroundColor: 'primary.dark' }}
          >
            <Typography m={4} mt={4} fontWeight={500} variant='body1' color={'white'}>
              Thông báo mới
            </Typography>
            <Box borderRadius={1} alignSelf={'center'} px={4} py={2}>
              <Typography fontWeight={500} variant='body2' color='white'>
                {data ? data?.notificationLecturers.length : 0} Thông báo
              </Typography>
            </Box>
          </Box>
          <Box sx={{ overflowY: 'auto', height: '80%', px: 2 }}>
            {isLoading || isFetching ? (
              <CircularProgress />
            ) : data?.notificationLecturers.length === 0 ? (
              <Box width={'100%'}>
                <Box textAlign={'center'} m={'auto'} p='auto' width={240}>
                  <img width={100} src='/public/images/bell-alarm.webp' alt='' />
                  <Typography
                    variant='h6'
                    fontWeight={'500'}
                    textTransform={'uppercase'}
                    color='grey.600'
                  >
                    Không có thông báo mới
                  </Typography>
                </Box>
              </Box>
            ) : (
              <>
                {data?.notificationLecturers.map((noti: any) => (
                  <Paper
                    sx={{
                      my: 2,
                      px: 4,
                      py: 2,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: '#f5f8ff',
                      },
                    }}
                    onClick={() => handleNavigate(noti.id)}
                    elevation={1}
                  >
                    <Typography
                      textAlign={'end'}
                      width={'120px'}
                      variant='body2'
                      component={'i'}
                      color='grey.600'
                      sx={{}}
                    >
                      {dayjs(noti.created_at).format('DD/MM/YYYY hh:ss')}
                    </Typography>
                    <Typography
                      variant='body2'
                      fontSize={10}
                      color='grey.700'
                      dangerouslySetInnerHTML={{ __html: noti.message.split('<br/>')[1] }}
                    />
                    <Box justifyContent={'end'} display={'flex'}>
                      <>
                        {noti.isRead ? (
                          <Typography component={'i'} variant='body2' color='success.dark'>
                            Đã xem
                            <Icon style={{ marginLeft: 2 }} width={10} icon='subway:tick' />
                          </Typography>
                        ) : (
                          <Typography component={'i'} variant='body2' color='error.dark'>
                            Chưa đọc
                          </Typography>
                        )}
                      </>
                    </Box>
                  </Paper>
                ))}
              </>
            )}
          </Box>
          <Box
            px={4}
            height={'10%'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'end'}
            borderRadius={'0 0 8px 8px '}
            bgcolor={'#f6fcff'}
          >
            {/* <Button size='small' color='warning'>
              Đánh dấu tất cả là đã đọc
            </Button> */}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Notification;
