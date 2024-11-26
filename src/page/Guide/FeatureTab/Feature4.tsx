import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';

function Feature4() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography fontWeight={'bold'} color={'grey.900'} variant='h2' gutterBottom>
        4. Quản lý giảng viên
      </Typography>

      <Typography fontWeight={'bold'} variant='subtitle1' gutterBottom>
        4.1. Tạo mới giảng viên
      </Typography>

      <Typography paragraph>
        Tại <strong>Thanh Menu</strong> =&gt; Chọn <strong>Giảng viên</strong> =&gt; Chọn{' '}
        <strong>Danh sách GV chuyên ngành</strong> =&gt;
      </Typography>

      <Typography paragraph>
        Cách 1: Ấn nút xanh dương{' '}
        <Button variant='outlined' sx={{ color: 'rgb(47, 84, 150)' }}>
          Tải lên Excel Giảng viên
        </Button>{' '}
        ở góc trên bên phải màn hình, cạnh nút{' '}
        <Button variant='outlined' sx={{ color: 'rgb(196, 89, 17)' }}>
          tạo Giảng viên
        </Button>
        .
      </Typography>

      <Typography paragraph>File excel Giảng viên phải được format theo như này:</Typography>

      <Box sx={{ width: '80%', mx: 'auto' }}>
        <img width='100%' src='/images/hdsd/f_4_1.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
      </Box>

      <Typography paragraph>
        Cách 2: Ấn nút cam{' '}
        <Button variant='outlined' sx={{ color: 'rgb(196, 89, 17)' }}>
          Tạo giảng viên
        </Button>{' '}
        ở góc trên bên phải màn hình, cạnh thanh tìm kiếm.
      </Typography>

      <Box sx={{ width: '80%', mx: 'auto' }}>
        <img width='100%' src='/images/hdsd/f_4_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography paragraph>Mục 1. Mã giảng viên</Typography>
        <Typography paragraph>Mục 2. Họ và tên</Typography>
        <Typography paragraph>Mục 3. Giới tính</Typography>
        <Typography paragraph>Mục 4. Số điện thoại</Typography>
        <Typography paragraph>Mục 5. Email</Typography>
        <Typography paragraph>Mục 6. Chuyên ngành</Typography>
        <Typography paragraph>Mục 7. Trình độ</Typography>

        <Typography paragraph>
          <strong>Bước 2: Kiểm tra và lưu thông tin giảng viên:</strong>
        </Typography>
        <Typography paragraph>
          Click <strong>"Tạo giảng viên"</strong> ở góc dưới bên phải cửa sổ.
        </Typography>

        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_4_3.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography fontWeight={'bold'} variant='subtitle1' gutterBottom>
          <strong>4.2. Sửa thông tin giảng viên.</strong>
        </Typography>

        <Typography paragraph>
          <strong>Bước 1: Chọn giảng viên muốn cập nhật thông tin</strong>
        </Typography>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography paragraph>
          Tại <strong>Danh sách GV chuyên ngành</strong> =&gt; tại{' '}
          <strong>Danh sách giảng viên</strong> =&gt; tại cột <strong>Chức năng</strong> =&gt; chọn
          biểu tượng <strong>cây bút</strong> của giảng viên cần cập nhật <strong>=&gt;</strong>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_4_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>

        <Typography paragraph>
          <strong>Bước 2: Cập nhật thông tin và lưu.</strong>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_4_5.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>Có thể sửa các mục:</Typography>
        <Typography paragraph>- Họ và tên</Typography>
        <Typography paragraph>- Giới tính</Typography>
        <Typography paragraph>- Số điện thoại</Typography>
        <Typography paragraph>- Email</Typography>
        <Typography paragraph>- Trình độ</Typography>
        <Typography paragraph>
          Click <strong>"Cập nhật giảng viên"</strong> ở góc dưới bên phải cửa sổ.
        </Typography>

        <Typography fontWeight={'bold'} variant='subtitle1' gutterBottom>
          <strong>4.3. Xem thông tin chi tiết giảng viên.</strong>
        </Typography>

        <Typography paragraph>
          Tại <strong>Danh sách GV chuyên ngành</strong> =&gt; tại{' '}
          <strong>Danh sách giảng viên</strong> =&gt; tại cột <strong>Chức năng</strong> =&gt; chọn{' '}
          <strong>xem chi tiết</strong> giảng viên muốn xem <strong></strong>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_4_7.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
      </Box>
      <Box sx={{ p: 2 }}>
        <Typography fontWeight={'bold'} variant='subtitle1' gutterBottom>
          4.4. Tải lên dữ liệu giảng viên chuyên ngành.
        </Typography>

        <Typography paragraph>
          Tại <strong>Thanh Menu</strong> =&gt; Chọn <strong>Giảng viên</strong> =&gt; Chọn{' '}
          <strong>Danh sách GV hướng dẫn</strong> =&gt;
        </Typography>

        <Typography paragraph>
          &nbsp;Ấn nút xanh dương{' '}
          <Button
            variant='outlined'
            sx={{ color: 'rgb(47, 84, 150)', borderColor: 'rgb(47, 84, 150)' }}
          >
            Tải lên Excel Giảng viên
          </Button>{' '}
          ở góc trên bên phải màn hình, cạnh nút{' '}
          <Button
            variant='outlined'
            sx={{ color: 'rgb(196, 89, 17)', borderColor: 'rgb(196, 89, 17)' }}
          >
            tạo Giảng viên
          </Button>
        </Typography>

        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_4_1.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
          <Typography paragraph>
            Bước 1: Nhấn vào khu vực có biểu tượng{' '}
            <span style={{ color: '#2F5496' }}>
              <strong>“Mũi tên”.</strong>
            </span>{' '}
          </Typography>
          <Typography paragraph>
            Bước 2: Chọn file{' '}
            <span style={{ color: '#537F35' }}>
              <strong>Excel</strong>
            </span>{' '}
            chứa danh sách{' '}
            <span style={{ color: '#C45511' }}>
              <strong>“giảng viên”</strong>
            </span>
            mà bạn muốn tạo.
          </Typography>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_4_8.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
          <Typography paragraph>
            Bước 3: Nhấn nút{' '}
            <span style={{ color: '#537F35' }}>
              <strong>Lưu vào hệ thống</strong>
            </span>{' '}
            để hoàn tất tải dữ liệu giảng viên chuyên ngành.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Feature4;
