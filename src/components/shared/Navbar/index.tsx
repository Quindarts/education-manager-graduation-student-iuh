import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import BreadCrumbRouting from '@/components/ui/BreadCrumb';

interface NavbarProps {
  handleOpenSideBar: () => void;
  isOpenSideBar: boolean;
}
function Navbar(props: NavbarProps) {
  const { handleOpenSideBar, isOpenSideBar } = props;
  return (
    <Box
      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', zIndex: 1001 }}
      px={12}
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
          sx={{ cursor: 'pointer' }}
          width={54}
          height={70}
          display='flex'
          alignItems='center'
          onClick={handleOpenSideBar}
          color={'grey.600'}
        >
          <Icon width={20} icon={isOpenSideBar ? 'ooui:next-ltr' : 'fluent:list-16-regular'} />
        </Box>
        <Box>
          <BreadCrumbRouting />
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
