import usePopup from '@/hooks/usePopup';
import { APP_PROFILE_MENU } from '@/utils/app-config';
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

function ProfileMenu() {
  const navigate = useNavigate();
  const { handleActive, active, menuRef } = usePopup();
  return (
    <Box
      display='flex'
      sx={{
        cursor: 'pointer',
        gap: {
          xs: 0,
          md: 5,
        },
      }}
      height={70}
      px={10}
      py={4}
      alignItems='center'
      onClick={handleActive}
      ref={menuRef}
      position='relative'
    >
      <Avatar
        alt='Remy Sharp'
        src='https://themesbrand.com/velzon/html/default/assets/images/users/avatar-1.jpg'
        sx={{ width: 40, height: 40 }}
      />
      <Box
        sx={{
          '& .MuiTypography-root': {
            display: {
              xs: 'none',
              lg: 'block',
            },
          },
        }}
      >
        <Typography color='grey.700' variant='body2' fontWeight={500}>
          Lê Minh Quang
        </Typography>
        <Typography color='success.main' variant='body2' fontWeight={600}>
          Giảng viên
        </Typography>
      </Box>
      {active && (
        <Box
          zIndex={20}
          top={'100%'}
          right={0}
          boxShadow={2}
          sx={{
            backgroundColor: 'background.paper',
            position: {
              xs: 'fixed',
              sm: 'absolute',
            },
            width: {
              xs: '100vw',
              sm: 180,
            },
          }}
          borderRadius={2}
          py={4}
        >
          <Typography
            color='text.secondary'
            height={29}
            variant='body2'
            fontWeight={500}
            px={9}
            py={4}
          >
            Chào mừng trở lại!
          </Typography>
          <MenuList sx={{ p: 0 }}>
            {APP_PROFILE_MENU.map((menuItem) => (
              <MenuItem
                sx={{ '.MuiListItemIcon-root ': { minWidth: 24 } }}
                onClick={() => navigate(menuItem.link)}
              >
                <ListItemIcon sx={{ color: 'text.secondary' }}>
                  <Icon width={18} height={22} icon={menuItem.icon} />
                </ListItemIcon>
                <Typography variant='body2' fontWeight={500} color='grey.700'>
                  {menuItem.text}
                </Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      )}
    </Box>
  );
}

export default ProfileMenu;
