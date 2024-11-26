import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardGroupLecturer(props: any) {
  const { group } = props;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/my-group-lecturers/detail/${group.groupLecturerId}`)}
      sx={{
        border: '1px solid white',
        '&:hover': {
          // bgcolor: '#E1EDFCFF',
          background: ' linear-gradient(135deg, #0d5db6, #33aae0)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.3s ease-in',
          '.MuiTypography-root': {
            color: 'white',
          },
          cursor: 'pointer',
          border: '1px solid #DAE9FAFF',
        },
        minHeight: 240,
        maxHeight: 300,
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
        image='/images/group_student_3.webp'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' color='primary.dark' fontWeight={600} component='div'>
          {checktTypeGroupLecturer(group.type.toLowerCase())} - {group.name}
        </Typography>

        <Typography variant='h6' fontWeight={500} color='primary.dark'>
          Thành viên :
        </Typography>
        <Box>
          {group?.members.map((mem) => (
            <Typography variant='body1' color='text.grey.500'>
              {mem.username} {' - '}
              {mem.fullName}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box></Box>
      </CardActions>
    </Card>
  );
}

export default CardGroupLecturer;
