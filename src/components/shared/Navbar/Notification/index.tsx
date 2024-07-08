import usePopup from '@/hooks/ui/usePopup';
import { Icon } from '@iconify/react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { Button, Paper } from '@mui/material';

function Notification() {
  const { handleActive, active, menuRef } = usePopup();
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
          padding: 2,

          '& svg': {
            color: 'text.secondary',
          },
        }}
        size='small'
        color='info'
      >
        <Badge
          badgeContent={4}
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
          top={'100%'}
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
            height: 700,
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
            padding={8}
            height={54}
            borderRadius='8px 8px 0 0 '
            sx={{ backgroundColor: 'primary.dark' }}
          >
            <Typography fontWeight={500} variant='body1' color={'white'}>
              Thông báo mới
            </Typography>
            <Box borderRadius={1} alignSelf={'center'} px={4} py={2}>
              <Typography fontWeight={500} variant='body2' color='white'>
                4 Thông báo
              </Typography>
            </Box>
          </Box>
          <Box sx={{ overflowY: 'auto', height: '80%', px: 4 }} m={4}>
            <Paper sx={{ p: 4, my: 6 }} elevation={1}>
              <Box display={'flex'} justifyContent={'space-between'} mb={4}>
                <Box>
                  <Typography variant='body1' fontWeight={'600'} color='initial'>
                    Người gửi: Nguyễn Thị Hạnh
                  </Typography>
                  <Typography variant='body2' color='grey.600'>
                    Trưởng bộ môn
                  </Typography>
                </Box>
                <Box>
                  <Typography component={'i'} variant='body2' color='success.main'>
                    Ngày 05/07/2024
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant='body1' fontWeight={600} color='grey.700'>
                  {' '}
                  Nội dung:
                </Typography>
                <Typography variant='body1' color='initial'>
                  Vừa tạo học kì mới HK1 2024-2025
                </Typography>
              </Box>
            </Paper>{' '}
            <Paper sx={{ p: 4, my: 6 }} elevation={1}>
              <Box display={'flex'} justifyContent={'space-between'} mb={4}>
                <Box>
                  <Typography variant='body1' fontWeight={'600'} color='initial'>
                    Người gửi: Nguyễn Thị Hạnh
                  </Typography>
                  <Typography variant='body2' color='grey.600'>
                    Trưởng bộ môn
                  </Typography>
                </Box>
                <Box>
                  <Typography component={'i'} variant='body2' color='success.main'>
                    Ngày 05/07/2024
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant='body1' fontWeight={600} color='grey.700'>
                  {' '}
                  Nội dung:
                </Typography>
                <Typography variant='body1' color='initial'>
                  Vừa tạo học kì mới HK1 2024-2025
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ p: 4, my: 6 }} elevation={1}>
              <Box display={'flex'} justifyContent={'space-between'} mb={4}>
                <Box>
                  <Typography variant='body1' fontWeight={'600'} color='initial'>
                    Người gửi: Nguyễn Thị Hạnh
                  </Typography>
                  <Typography variant='body2' color='grey.600'>
                    Trưởng bộ môn
                  </Typography>
                </Box>
                <Box>
                  <Typography component={'i'} variant='body2' color='success.main'>
                    Ngày 05/07/2024
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant='body1' fontWeight={600} color='grey.700'>
                  {' '}
                  Nội dung:
                </Typography>
                <Typography variant='body1' color='initial'>
                  Vừa tạo học kì mới HK1 2024-2025
                </Typography>
              </Box>
            </Paper>{' '}
            <Paper sx={{ p: 4, my: 6 }} elevation={1}>
              <Box display={'flex'} justifyContent={'space-between'} mb={4}>
                <Box>
                  <Typography variant='body1' fontWeight={'600'} color='initial'>
                    Người gửi: Nguyễn Thị Hạnh
                  </Typography>
                  <Typography variant='body2' color='grey.600'>
                    Trưởng bộ môn
                  </Typography>
                </Box>
                <Box>
                  <Typography component={'i'} variant='body2' color='success.main'>
                    Ngày 05/07/2024
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant='body1' fontWeight={600} color='grey.700'>
                  {' '}
                  Nội dung:
                </Typography>
                <Typography variant='body1' color='initial'>
                  Vừa tạo học kì mới HK1 2024-2025
                </Typography>
              </Box>
            </Paper>{' '}
            <Paper sx={{ p: 4, my: 6 }} elevation={1}>
              <Box display={'flex'} justifyContent={'space-between'} mb={4}>
                <Box>
                  <Typography variant='body1' fontWeight={'600'} color='initial'>
                    Người gửi: Nguyễn Thị Hạnh
                  </Typography>
                  <Typography variant='body2' color='grey.600'>
                    Trưởng bộ môn
                  </Typography>
                </Box>
                <Box>
                  <Typography component={'i'} variant='body2' color='success.main'>
                    Ngày 05/07/2024
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant='body1' fontWeight={600} color='grey.700'>
                  {' '}
                  Nội dung:
                </Typography>
                <Typography variant='body1' color='initial'>
                  Vừa tạo học kì mới HK1 2024-2025
                </Typography>
              </Box>
            </Paper>{' '}
            <Paper sx={{ p: 4, my: 6 }} elevation={1}>
              <Box display={'flex'} justifyContent={'space-between'} mb={4}>
                <Box>
                  <Typography variant='body1' fontWeight={'600'} color='initial'>
                    Người gửi: Nguyễn Thị Hạnh
                  </Typography>
                  <Typography variant='body2' color='grey.600'>
                    Trưởng bộ môn
                  </Typography>
                </Box>
                <Box>
                  <Typography component={'i'} variant='body2' color='success.main'>
                    Ngày 05/07/2024
                  </Typography>
                </Box>
              </Box>

              <Box>
                <Typography variant='body1' fontWeight={600} color='grey.700'>
                  {' '}
                  Nội dung:
                </Typography>
                <Typography variant='body1' color='initial'>
                  Vừa tạo học kì mới HK1 2024-2025
                </Typography>
              </Box>
            </Paper>
          </Box>
          <Box px={4} height={'10%'} display={'flex'} alignItems={'center'} justifyContent={'end'} borderRadius={'0 0 8px 8px '} bgcolor={'#f6fcff'}>
            <Button variant='contained' size='small' color='primary'>
              Xem toàn bộ thông báo
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Notification;
