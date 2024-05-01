import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import ProfileMenu from './ProfileMenu';
import Notification from './Notification';
import { IconButton } from '@mui/material';

interface NavbarProps {
  handleOpenSideBar: () => void;
  isOpenSideBar: boolean;
}
function Navbar(props: NavbarProps) {
  const { handleOpenSideBar, isOpenSideBar } = props;
  return (
    <Box
      sx={{ backgroundColor: 'background.paper' }}
      px={12}
      display='flex'
      position='sticky'
      zIndex={20}
      top={0}
      width='100%'
      height={70}
      alignItems='center'
      justifyContent='space-between'
    >
      <Box
        sx={{ cursor: 'pointer' }}
        width={54}
        height={70}
        display='flex'
        alignItems='center'
        onClick={handleOpenSideBar}
      >
        <Icon
          width={24}
          fontWeight={600}
          icon={isOpenSideBar ? 'ph:arrow-right-bold' : 'fluent:list-16-regular'}
        />
      </Box>
      <Box display='flex' alignItems='center' gap={6}>
        <Notification />
        <ProfileMenu />
      </Box>
    </Box>
  );
}

export default Navbar;
