import { Box, Typography } from '@mui/material';
import React from 'react';

function Feature2() {
  return (
    <Box>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Typography fontWeight={'bold'} color={'grey.900'} variant='h2' gutterBottom>
          2. Quản lý chuyên ngành
        </Typography>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_1.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Typography paragraph>
        <strong>1. Thêm chuyên ngành</strong>
      </Typography>
      <Typography paragraph>
        <strong>Bước 1</strong>: Chọn nút{' '}
        <span style={{ color: '#C55A11' }}>“+ Thêm chuyên ngành”</span> màu cam.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Typography paragraph>
        <strong>Bước 2</strong>: Nhập tên chuyên ngành.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_3.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Typography paragraph>
        <strong>Bước 3</strong>: Chọn <span style={{ color: '#548245' }}>lưu thông tin.</span>
      </Typography>
      <Typography paragraph>
        <strong>2. Sửa thông tin chuyên ngành</strong>
      </Typography>
      <Typography paragraph>
        <strong>Bước 1</strong>: Chọn icon “cập nhật thông tin chức năng” bên trái.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_6.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Typography paragraph>
        <strong>Bước 2</strong>: Cập nhật tên chuyên ngành theo mong muốn.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_8.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Typography paragraph>
        <strong>Bước 3</strong>: Chọn <span style={{ color: '#548245' }}>lưu thông tin</span>.
      </Typography>
      <Typography paragraph>
        <strong>3. Xoá chuyên ngành</strong>
      </Typography>
      <Typography paragraph>
        <strong>Bước 1</strong>: Chọn icon <strong>thùng rác</strong> bên phải.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_5.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>
      <Typography paragraph>
        <strong>Bước 2</strong>: Chọn <span style={{ color: '#C55A11' }}>“Xoá chuyên ngành”</span>{' '}
        màu cam để xác nhận xoá chuyên ngành.
      </Typography>
      <Box sx={{ width: '100%', mb: 4 }}>
        <Box sx={{ width: '80%', mx: 'auto' }}>
          <img width='100%' src='/images/hdsd/f_2_4.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
        </Box>
      </Box>{' '}
    </Box>
  );
}

export default Feature2;
