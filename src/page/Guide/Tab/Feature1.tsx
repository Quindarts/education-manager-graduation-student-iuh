import { Box, Typography, Paper } from '@mui/material';
import React from 'react';

function Feature1() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h5' fontWeight='bold' color='primary.dark' gutterBottom>
        Quản lý học kỳ
      </Typography>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>

      <Typography paragraph>
        <strong>1. Tạo mới học kỳ</strong>
      </Typography>

      <Typography paragraph>
        Tại <strong>Thanh Menu</strong> =&gt; Chọn <strong>Học kỳ</strong> =&gt; Chọn{' '}
        <strong>Danh sách học kỳ</strong> =&gt; Ấn nút cam{' '}
        <span style={{ color: 'rgb(196, 89, 17)' }}>Tạo học kỳ mới</span> ở góc trên bên phải màn
        hình, cạnh thanh tìm kiếm.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_1_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>

      <Typography paragraph>
        <strong>Bước 1: Thiết lập thông tin học kỳ</strong>
      </Typography>

      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_0.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>

      <Typography paragraph>
        Mục 1. Tên học kỳ: Đặt tên học kỳ theo số thứ tự học kỳ và thời gian học kỳ diễn ra.
      </Typography>

      <Typography paragraph>Mục 2. Chuyên ngành: Tên chuyên ngành của học kỳ.</Typography>

      <Typography paragraph>Mục 3. Ngày bắt đầu: Ngày học kỳ bắt đầu</Typography>

      <Typography paragraph>Mục 4. Ngày kết thúc: Ngày học kỳ kết thúc</Typography>

      <Typography paragraph>Điền tên học kỳ và thời gian học kỳ diễn ra.</Typography>

      <Typography paragraph>
        <strong>Bước 2: Kiểm tra và lưu thông tin học kỳ:</strong>
      </Typography>

      <Typography paragraph>
        Click <strong>"Lưu thông tin"</strong> ở góc dưới bên phải màn hình.
      </Typography>


      <Box sx={{ width: '100%' }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_3.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_4.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_5.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_1_7.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
    </Box>
  );
}

export default Feature1;
