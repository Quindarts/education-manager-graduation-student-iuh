import { Box, Button, Typography } from '@mui/material';
import React from 'react';

function Feature5() {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={'bold'} color={'grey.900'} variant='h2' gutterBottom>
          5. Quản lý giảng viên hướng dẫn
        </Typography>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          5.1. Thêm giảng viên hướng dẫn
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_5_1.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>
          Tại <strong>Thanh Menu</strong> =&gt; Chọn <strong>Giảng viên</strong> =&gt; Chọn{' '}
          <strong>Danh sách GV hướng dẫn</strong> =&gt; Chọn nút{' '}
          <Button
            variant='outlined'
            sx={{ color: 'rgb(196, 89, 17)', borderColor: 'rgb(196, 89, 17)' }}
          >
            Thêm Giảng viên HD
          </Button>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_5_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>Tìm kiếm và chọn Giảng viên hướng dẫn muốn thêm</Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_5_3.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>
          Chọn nút{' '}
          <Button
            variant='outlined'
            sx={{ color: 'rgb(196, 89, 17)', borderColor: 'rgb(196, 89, 17)' }}
          >
            Thêm GV hướng dẫn
          </Button>{' '}
          sau khi đã chọn Giảng viên hướng dẫn.
        </Typography>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          5.2. Gỡ giảng viên hướng dẫn khỏi học kỳ
        </Typography>

        <Typography paragraph>
          Trong bảng danh sách Giảng viên hướng dẫn =&gt; cột <strong>Chức năng</strong> =&gt; Chọn
          nút <strong>Gỡ</strong> =&gt;
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_5_4.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>
          Chọn{' '}
          <Button
            variant='outlined'
            sx={{ color: 'rgb(196, 89, 17)', borderColor: 'rgb(196, 89, 17)' }}
          >
            Bỏ giảng viên
          </Button>{' '}
          để xác nhận gỡ bỏ giảng viên.
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_5_5.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>

        <Typography variant='h6' fontWeight='bold' gutterBottom>
          5.3. Tải lên dữ liệu giảng viên chuyên ngành của học kì trước
        </Typography>
        <Typography paragraph>
          Bên cạnh nút thêm giảng viên HD =&gt; Chọn nút{' '}
          <Button>Tải lên dữ liệu GV chuyên ngành</Button>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_5_6.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Feature5;
