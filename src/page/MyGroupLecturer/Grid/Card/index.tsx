import { checktTypeGroupLecturer } from '@/utils/validations/groupLecturer.validation';
import { Card, CardContent, CardMedia, Typography, CardActions, Box } from '@mui/material';
import dayjs from 'dayjs';
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
      }}
    >
      <CardMedia
        component='img'
        alt='green iguana'
        height={100}
        width={100}
        sx={{
          objectFit: 'contain',
        }}
        image='/images/group_student_3.webp'
      />
      <CardContent sx={{ px: 6, py: 4 }}>
        <Typography gutterBottom fontSize={14} color='primary.dark' fontWeight={600} variant='h6'>
          {checktTypeGroupLecturer(group.type.toLowerCase())} {group.name}
        </Typography>

        <Typography fontWeight={500} color='primary.dark'>
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

        <Typography mt={4} fontWeight={500} color='primary.dark'>
          Thông tin chi tiết:
        </Typography>
        <Typography mt={2}>
          <Typography variant='body1' component={'span'} fontWeight={'bold'} color='grey.600'>
            Bắt đầu:{' '}
          </Typography>
          {group.startDate
            ? dayjs(group.startDate).format('DD/MM/YYYY hh:mm:ss A')
            : 'Chưa cập nhật'}
        </Typography>
        <Typography mb={2}>
          <Typography variant='body1' component={'span'} fontWeight={'bold'} color='grey.600'>
            Kết thúc:{' '}
          </Typography>
          {group.endDate ? dayjs(group.endDate).format('DD/MM/YYYY hh:mm:ss A') : 'Chưa cập nhật'}
        </Typography>
        <Typography fontWeight={'bold'}>
          <Typography variant='body1' component={'span'} fontWeight={'bold'} color='grey.600'>
            Địa điểm:{' '}
          </Typography>
          {group.location ? group.location : 'Chưa cập nhật'}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Box></Box>
      </CardActions>
    </Card>
  );
}

export default CardGroupLecturer;
