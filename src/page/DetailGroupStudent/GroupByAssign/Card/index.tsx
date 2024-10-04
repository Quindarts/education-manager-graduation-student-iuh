import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CardGroupLecturer(props: any) {
  const { group } = props;
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => navigate(`/group-lecturers/details/${group.id}`)}
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
        minHeight: 200,
        maxHeight: 300,
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
          {checktTypeGroupLecturer(group.type.toLowerCase())} {group.name}
        </Typography>
        <Typography variant='h6' fontWeight={'bold'} color=''>
          Thành viên
        </Typography>
        {group?.members.map((mem: any, index) => (
          <Box mx={2} mb={2}>
            <Typography variant='h6' color='grey.600'>
              {mem.username} - {mem.fullName}
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
