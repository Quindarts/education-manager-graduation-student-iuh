import { useAuth } from '@/hooks/api/useAuth';
import usePopup from '@/hooks/ui/usePopup';
import { setCurrentMajor } from '@/store/slice/major.slice';
import { setAllTerm, setCurrentTerm } from '@/store/slice/term.slice';
import { RoleCheck } from '@/types/enum';
import { APP_PROFILE_MENU, APP_ROUTES } from '@/utils/app-config';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { Icon } from '@iconify/react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { avatarStyles, imgStyles, keyframes, statusCircleStyles, statusStyles } from './style';

function ProfileMenu() {
  //TODO [HOOK UI]
  const { handleActive, active, menuRef } = usePopup();

  //TODO [HOOK STORE]
  const { lecturerStore, handleLogout } = useAuth();

  const dispatch = useDispatch();

  const navigate = useNavigate();



  //TODO [HANDLE EVENT]
  const handleChangeRole = () => {
    const role = lecturerStore.currentRoleRender;
    if (role === RoleCheck.LECTURER || role === RoleCheck.ADMIN) {
      dispatch(setCurrentTerm({}));
      dispatch(setAllTerm([]));
      dispatch(
        setCurrentMajor({
          name: lecturerStore.me.user.majorName,
          id: lecturerStore.me.user.majorId,
        }),
      );
    }
  };
  const handleClickMenuItem = (menuItem: any) => {
    if (menuItem?.link === APP_ROUTES.USER.LOGIN) {
      handleLogout();
    }
    if (menuItem?.link === APP_ROUTES.USER.ROLE) {
      handleChangeRole();
      navigate(menuItem?.link);
    }
    navigate(menuItem?.link);
  };

  return (
    <Box
      display='flex'
      sx={{
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'grey.200',
        },
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
      <Box sx={avatarStyles}>
        <style>{keyframes}</style>
        <Avatar alt='avatar' src='' sx={imgStyles} />
        <Box sx={statusStyles}>
          <Box sx={statusCircleStyles} />
        </Box>
      </Box>

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
        <Typography color='grey.700' variant='h6' fontWeight={600}>
          {lecturerStore['me'].user.fullName}
        </Typography>
        <Typography color='grey.600' variant='body2' fontWeight={600}>
          {checkRoleLecturer(lecturerStore['currentRoleRender'])}
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
                sx={{ '.MuiListItemIcon-root ': { minWidth: 24 }, my: 2 }}
                onClick={() => handleClickMenuItem(menuItem)}
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
