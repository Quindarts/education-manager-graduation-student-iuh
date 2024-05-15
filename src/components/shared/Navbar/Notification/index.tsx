import usePopup from '@/hooks/ui/usePopup';
import { Icon } from '@iconify/react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

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
          boxShadow={2}
          sx={{
            backgroundColor: 'background.paper',
            zIndex: 20,
            width: {
              xs: '100vw',
              sm: 320,
            },
            height: 320,
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
            borderRadius='4px 4px 0 0 '
            sx={{ backgroundColor: 'primary.main' }}
          >
            <Typography fontWeight={600} variant='h6' color={'white'}>
              Notifications
            </Typography>
            <Box borderRadius={1} alignSelf={'center'} px={4} py={2}>
              <Typography fontWeight={600} variant='body2' color='white'>
                4 New
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Notification;
