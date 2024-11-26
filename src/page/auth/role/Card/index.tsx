import { setCurrentRoleRender } from '@/store/slice/lecturer.slice';
import { RoleCheck } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Card, CardContent, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

type CardRolePropType = {
  icon: string;
  role: string;
  name: string;
  desc: string;
};
function CardRole({ icon, role, name, desc }: Partial<CardRolePropType>) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCurrentRoleRender(role));
    navigate('/');
    if (RoleCheck.LECTURER !== role) {
    }
  };
  return (
    <Card
      onClick={handleNavigate}
      sx={{
        width: 275,
        height: 300,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease-in-out',
        borderRadius: 6,
        '&:hover': {
          boxShadow: '0 4px 20px #98C1F1FF',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <Typography mx={'auto'} textAlign={'center'} mt={10} component='div'>
          <Icon
            style={{ filter: 'drop-shadow(3px 3px 5px rgba(0, 0, 0, 0.5))' }}
            width={74}
            icon={`${icon}`}
            color='#195192FF'
          />
        </Typography>
        <Typography
          sx={{ fontSize: 14, mt: 14, fontWeight: '600' }}
          color='primary.dark'
          gutterBottom
        >
          Vai trò {name}
        </Typography>
        <Typography variant='body2'>{desc}</Typography>
      </CardContent>
    </Card>
  );
}

export default CardRole;
