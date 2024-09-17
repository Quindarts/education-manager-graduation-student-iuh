import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardGroupLecturer(props: any) {
  const { group } = props;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/group-lecturers/details/${group.groupLecturerId}`)}
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
        height={75}
        width={100}
        sx={{
          objectFit: 'contain',
        }}
        image='/images/group_student_3.webp'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' color='primary' fontWeight={600} component='div'>
          {group.name}
        </Typography>
        <Typography variant='h6' fontWeight={'500'} color=''>
          Thành viên :
        </Typography>
        {group?.members.map((mem: any,index) => (
          <Box mb={2}>
            <Typography variant='body1' color='grey.600'>
              GV{index + 1}: {mem.fullName}
            </Typography>
          </Box>
        ))}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box></Box>
      </CardActions>
    </Card>
  );
}

export default CardGroupLecturer;
