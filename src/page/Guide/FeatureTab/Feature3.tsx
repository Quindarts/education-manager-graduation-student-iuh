import { Box, Typography } from '@mui/material';
import React from 'react';

function Feature3() {
  return (
    <Box>
      <Box sx={{ p: 2 }}>
      <Typography fontWeight={'bold'} color={'grey.900'} variant='h2' gutterBottom>
          3. Quản lý sinh viên
        </Typography>
        <Typography paragraph>
          <strong>1. Tạo sinh viên</strong>
        </Typography>
        <Typography paragraph>
          Tại <strong>Thanh Menu</strong> =&gt; Chọn <strong>Sinh viên</strong> =&gt; Chọn{' '}
          <strong>Danh sách sinh viên</strong> =&gt;
        </Typography>
        <Typography paragraph>
          <strong>
            {' '}
            Cách 1: Ấn nút xanh dương{' '}
            <span style={{ color: '#2F5496' }}>
              <strong>“Tải dữ liệu lên từ Excel”</strong>
            </span>{' '}
            ở góc trên bên phải màn hình, cạnh nút{' '}
            <span style={{ color: '#C45511' }}>
              <strong>“Tạo sinh viên”</strong>
            </span>
            .
          </strong>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_3_3.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_3_7.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>{' '}
        <Typography paragraph>
          <strong>
            Cách 2: Ấn nút cam{' '}
            <span style={{ color: '#C45511' }}>
              <strong>“Tạo sinh viên”</strong>
            </span>{' '}
            ở góc trên bên phải màn hình, cạnh thanh tìm kiếm.
          </strong>
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_3_1.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>Mục 1. Mã sinh viên</Typography>
        <Typography paragraph>Mục 2. Họ và tên</Typography>
        <Typography paragraph>Mục 3. Giới tính</Typography>
        <Typography paragraph>Mục 4. Lớp danh nghĩa</Typography>
        <Typography paragraph>Mục 5. Số điện thoại</Typography>
        <Typography paragraph>Mục 6. Email</Typography>
        <Typography paragraph>Mục 7. Chuyên ngành</Typography>
        <Typography paragraph>Mục 8. Đại học</Typography>
        <Typography paragraph>
          <strong>Bước 2:</strong> Kiểm tra và lưu thông tin sinh viên:
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_3_2.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>
          Click <strong>“Lưu thông tin”</strong> ở góc dưới bên phải cửa sổ.
        </Typography>
        <Typography paragraph>
          <strong>2. Sửa thông tin sinh viên.</strong>
        </Typography>
        <Typography paragraph>
          <strong>Bước 1:</strong> Chọn sinh viên muốn cập nhật thông tin. Có thể tìm tiếm sinh viên
          theo tên, mã sinh viên. Ngoài ra còn có thể bật tắt các cột trong bảng hoặc chuyển trang
          để hỗ trợ tìm kiếm.
        </Typography>
        <Typography paragraph>
          Tại <strong>Học kỳ</strong> sinh viên học =&gt; Tại <strong>Danh sách sinh viên</strong>{' '}
          =&gt; tại cột <strong>Chức năng</strong> =&gt; chọn biểu tượng <strong>cây bút</strong>{' '}
          của sinh viên cần cập nhật.
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_3_5.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>
        <Typography paragraph>
          <strong>Bước 2:</strong> Cập nhật thông tin và lưu.
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img width='100%' src='/images/hdsd/f_3_8.webp' alt='quan-ly-khoa-luan-iuh-hoc-ki-ui' />
          </Box>
        </Box>{' '}
        <Typography paragraph>Có thể sửa các mục:</Typography>
        <Typography paragraph>- Họ và tên</Typography>
        <Typography paragraph>- Giới tính</Typography>
        <Typography paragraph>- Lớp danh nghĩa</Typography>
        <Typography paragraph>- Email</Typography>
        <Typography paragraph>- Số điện thoại</Typography>
        <Typography paragraph>- Chuyên ngành</Typography>
        <Typography paragraph>- Loại đào tạo</Typography>
        <Typography paragraph>
          Click <strong>“Lưu thông tin”</strong> ở góc dưới bên phải cửa sổ.
        </Typography>
        <Typography paragraph>
          <strong>3. Khoá tài khoản sinh viên.</strong>
        </Typography>
        <Typography paragraph>
          Tại bảng <strong>“Danh sách sinh viên”</strong> =&gt; Tại cột{' '}
          <strong>“Trạng thái”</strong> =&gt; Chọn nút{' '}
          <span style={{ color: '#537F35' }}>
            <strong>“Đang mở”</strong>
          </span>
        </Typography>
        <Typography paragraph>
          Chọn{' '}
          <span style={{ color: '#C45511' }}>
            <strong>“Đóng tài khoản”</strong>
          </span>{' '}
          để xác nhận đóng tài khoản sinh viên.
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img
              width='100%'
              src='/images/hdsd/f_3_11.webp'
              alt='quan-ly-khoa-luan-iuh-hoc-ki-ui'
            />
          </Box>
        </Box>{' '}
        <Typography paragraph>
          Để mở lại tài khoản sinh viên bị khoá: Chọn nút{' '}
          <span style={{ color: '#C45511' }}>
            <strong>“Bị khoá”</strong>
          </span>
        </Typography>
        <Typography paragraph>
          Chọn{' '}
          <span style={{ color: '#537F35' }}>
            <strong>“Mở tài khoản”</strong>
          </span>{' '}
          để xác nhận mở tài khoản sinh viên.
        </Typography>
        <Box sx={{ width: '100%', mb: 4 }}>
          <Box sx={{ width: '80%', mx: 'auto' }}>
            <img
              width='100%'
              src='/images/hdsd/f_3_12.webp'
              alt='quan-ly-khoa-luan-iuh-hoc-ki-ui'
            />
          </Box>
        </Box>{' '}
        <Box sx={{ p: 2 }}>
          <Typography paragraph>
            <strong> 4. Cấp lại mật khẩu cho sinh viên.</strong>
          </Typography>
          <Typography paragraph>
            <strong>Bước 1:</strong> Chọn <strong>Thanh menu</strong> =&gt;{' '}
            <strong>Sinh viên</strong> =&gt; <strong>Danh sách sinh viên</strong> =&gt; Tìm kiếm
            sinh viên cần cấp lại mật khẩu.
          </Typography>
          <Typography paragraph>
            <strong>Bước 2:</strong> Tại cột <strong>Chức năng</strong> =&gt; Chọn biểu tượng{' '}
            <span style={{ color: '#2E74B5' }}>
              <strong>Chìa khoá</strong>
            </span>{' '}
            ở giữa.
          </Typography>
          <Box sx={{ width: '100%', mb: 4 }}>
            <Box sx={{ width: '80%', mx: 'auto' }}>
              <img
                width='100%'
                src='/images/hdsd/f_3_9.webp'
                alt='quan-ly-khoa-luan-iuh-hoc-ki-ui'
              />
            </Box>
          </Box>{' '}
          <Typography paragraph>
            <strong>Bước 3:</strong> Chọn nút{' '}
            <span style={{ color: '#538137' }}>
              <strong>“Cấp lại mật khẩu”</strong>
            </span>{' '}
            . Sau khi hoàn tất, mật khẩu của sinh viên đó sẽ trở về{' '}
            <span style={{ color: '#2F5496' }}>
              <strong>12345678</strong>
            </span>
            .
          </Typography>
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography paragraph>
            <strong> 5. Xoá sinh viên.</strong>
          </Typography>
          <Typography paragraph>
            <strong>Bước 1:</strong> Chọn <strong>Thanh menu</strong> =&gt;{' '}
            <strong>Sinh viên</strong> =&gt; <strong>Danh sách sinh viên</strong> =&gt; Tìm kiếm
            sinh viên cần xoá.
          </Typography>
          <Typography paragraph>
            <strong>Bước 2:</strong> Tại cột <strong>Chức năng</strong> =&gt; Chọn biểu tượng{' '}
            <span style={{ color: '#C45511' }}>
              <strong>"X"</strong>
            </span>{' '}
            ở bên phải.
          </Typography>
          <Box sx={{ width: '100%', mb: 4 }}>
            <Box sx={{ width: '80%', mx: 'auto' }}>
              <img
                width='100%'
                src='/images/hdsd/f_3_10.webp'
                alt='quan-ly-khoa-luan-iuh-hoc-ki-ui'
              />
            </Box>
          </Box>{' '}
          <Typography paragraph>
            <strong>Bước 3:</strong> Chọn nút{' '}
            <span style={{ color: '#C45511' }}>
              <strong>“Xoá sinh viên”</strong>
            </span>{' '}
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Feature3;
