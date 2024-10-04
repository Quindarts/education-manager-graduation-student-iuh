import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useSidebar from '@/hooks/ui/useSidebar';

function Navbar() {

  //TODO HOOK STORE
  const { handleToggleSidebar, isOpen } = useSidebar();

  //TODO: HANDLE UI
  const [bgColor, setBgColor] = useState('rgba(255, 255, 255, 0.9)');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setBgColor('grey.100');
    } else {
      setBgColor('rgba(255, 255, 255, 0.9)');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{ backgroundColor: bgColor, zIndex: 900, transition: 'all 1s ease-in' }}
      px={8}
      display='flex'
      position='fixed'
      zIndex={9999}
      top={0}
      bottom={0}
      width='100vw'
      height={70}
      left={0}
    >
      <Box
        display={'flex'}
        marginLeft={isOpen ? '250px' : '76px'}
        sx={{
          transition: '0.1s ease-in',
        }}
        width={'100%'}
        alignItems='center'
        justifyContent='space-between'
      >
        <Box display={'flex'} alignItems={'center'}>
          <Box
            sx={{
              cursor: 'pointer',
              '&:hover': {
                borderRadius: '10%',
                boxShadow: 'rgba(177, 202, 233, 0.15) 0px 48px 100px 0px;',
                color: 'primary.dark',
                svg: {
                  transform: 'scale(1.3)',
                  transition: 'transform 0.3s ease-in',
                },
              },
            }}
            mx={2}
            display='flex'
            p={6}
            alignItems='center'
            onClick={handleToggleSidebar}
            fontWeight={'bold'}
            color={'grey.700'}
          >
            <Icon width={30} icon={isOpen ? 'grommet-icons:previous' : 'ep:menu'} />
          </Box>
          <img width={100} src='/images/logo-light.webp' />
          <Box>
            <Typography
              fontWeight={'bold'}
              textTransform={'uppercase'}
              variant='body1'
              color='primary'
            >
              Đại học công nghiệp Tp.HCM
            </Typography>
            <Typography
              fontWeight={'bold'}
              textTransform={'uppercase'}
              variant='body2'
              color='primary'
            >
              Khoa Công nghệ thông tin
            </Typography>
          </Box>
        </Box>
            
        <Box display='flex' alignItems='center' gap={6}>
          <Notification />
          <ProfileMenu />
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
