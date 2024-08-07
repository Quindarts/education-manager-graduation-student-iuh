import { Box, Typography } from '@mui/material';
import React from 'react';

function Feature1() {
  return (
    <Box>
      <Typography variant='body1' color='initial'>
        1. Tạo mới học kì
      </Typography>
      <Box>
        <img src='/images/hdsd/ft_1_1.webp' width={1000} />
      </Box>
      <Typography variant='body1' color='initial'>
        Tại Thanh Menu - Chọn Học kì - Chọn Danh sách học kì - Ấn nút cam "Tạo học kì mới" ở góc
        trên bên phải màn hình, cạnh thanh tìm kiếm.
      </Typography>
      <Typography variant='body1' color='initial'>
        <p>
          Tại <strong>Thanh Menu</strong> =&gt; Chọn <strong>Học kì</strong> =&gt; Chọn{' '}
          <strong>Danh sách học kì</strong> =&gt; Ấn nút cam "
          <strong style={{ color: 'rgb(196, 89, 17)' }}>Tạo học kì mới</strong>
          <strong>"</strong> ở góc trên bên phải màn hình, cạnh thanh tìm kiếm.
        </p>
      </Typography>
    </Box>
  );
}

export default Feature1;
