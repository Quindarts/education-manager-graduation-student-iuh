import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardGroupLecturer(props: any) {
  const { group } = props;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/my-group-lecturers/detail/${group.groupLecturerId}`)}
      sx={{
        '&:hover': {
          bgcolor: 'primary.dark',
          boxShadow: '0 14px 18px 0 rgba(158, 200, 246, 0.2)',
          transition: 'all 0.2s ease-in',
          '.MuiTypography-root': {
            color: 'white',
          },
          cursor: 'pointer',
        },
      }}
    >
      <CardMedia
        component='img'
        alt='green iguana'
        height={50}
        width={50}
        sx={{
          objectFit: 'contain',
        }}
        image='/images/group_student_2.webp'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' color='primary' fontWeight={600} component='div'>
          {group.name}
        </Typography>

        <Typography variant='body1' color='text.primary'>
          Số lượng thành viên : {group?.members.length}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box></Box>
      </CardActions>
    </Card>
  );
}

export default CardGroupLecturer;
