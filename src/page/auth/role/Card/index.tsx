import { setCurrentRoleRender } from '@/store/slice/lecturer.slice';
import { Icon } from '@iconify/react';
import { Card, CardActions, CardContent, Typography, Button } from '@mui/material';
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
  };
  return (
    <Card
      sx={{
        width: 275,
        height: 300,
        transition: 'box-shadow 0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(195, 220, 249, 0.5)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
        <Typography variant='h5' mx={'auto'} textAlign={'center'} component='div'>
          <Icon width={70} icon={`${icon}`} />
        </Typography>
        <Typography sx={{ fontSize: 16, my: 2, fontWeight: 500 }} color='primary' gutterBottom>
          {name}
        </Typography>
        <Typography variant='body2' height={70}>
          {desc}
        </Typography>
        <Button
          onClick={handleNavigate}
          sx={{ my: 12 }}
          color='primary'
          variant='contained'
          size='small'
        >
          truy cập quyền
          <Icon style={{ marginLeft: '10px' }} icon='material-symbols:login-sharp' />
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardRole;
