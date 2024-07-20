import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import BreadCrumbRouting from '@/components/ui/BreadCrumb';
import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface NavbarProps {
  handleOpenSideBar: () => void;
  isOpenSideBar: boolean;
}
function Navbar(props: NavbarProps) {
  const { handleOpenSideBar, isOpenSideBar } = props;
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
      sx={{ backgroundColor: bgColor, zIndex: 1001, transition: 'background-color 0.5s' }}
      px={8}
      display='flex'
      position='fixed'
      zIndex={20}
      top={0}
      bottom={0}
      width='100%'
      height={70}
      maxWidth={isOpenSideBar ? `calc(100vw - 250px)` : `calc(100vw - 76px)`}
      alignItems='center'
      left={isOpenSideBar ? '250px' : '76px'}
      justifyContent='space-between'
    >
      <Box display={'flex'} alignItems={'center'}>
        <Box
          sx={{
            cursor: 'pointer',
            '&:hover': {
              bgcolor: '#efefef',
              borderRadius: '10%',
              transition: 'all 0.3s ease-in',
              boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;',
              color: 'primary.dark',
            },
          }}
          mx={2}
          display='flex'
          p={6}
          alignItems='center'
          onClick={handleOpenSideBar}
          fontWeight={'bold'}
          color={'grey.700'}
        >
          <Icon width={30} icon={isOpenSideBar ? 'grommet-icons:previous' : 'ep:menu'} />
        </Box>
        <img width={100} src='/images/logo-light.png' />
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
  );
}

export default Navbar;
