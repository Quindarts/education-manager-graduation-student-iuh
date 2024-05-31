import { Icon } from '@iconify/react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Chip,
  Box,
  Tooltip,
  IconButton,
} from '@mui/material';

function CardGroupStudent() {
  return (
    <Card>
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
          Nhóm 1
        </Typography>
        <Typography variant='body1' color='text.primary'>
          Số lượng thành viên : 2 /2
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Chip color='success' label='Đã đủ thành viên' variant='outlined' />
        <Box>
          <Tooltip title='Thông tin chi tiết'>
            <IconButton color='warning'>
              <Icon icon='majesticons:checkbox-list-detail' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Chia sẻ nhóm này'>
            <IconButton color='primary'>
              <Icon icon='fluent:share-28-filled' />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
}

export default CardGroupStudent;
