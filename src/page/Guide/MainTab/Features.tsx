import { Box, Divider, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';
import TitleManager from '@/components/ui/Title';
function FeatureSection() {
  return (
    <>
      <Box p={2}>
        <TitleManager variant='h3'>Giới thiệu</TitleManager>
        <Typography variant='h5' mt={3}>
          Phần mềm quản lý khóa luận tốt nghiệp IUH giúp quản lý toàn bộ quy trình từ việc tạo đề
          tài, đăng ký nhóm, phản biện, cho đến báo cáo đề tài.
        </Typography>
        <Box
          my={10}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          display={'flex'}
        >
          <img width={500} src='/images/undraw_dev_productivity_re_fylf.webp' alt='' />
          <Typography color='grey.500' variant='h2' fontWeight={'bold'}>
            Chi tiết hướng dẫn đang trong quá trình bổ sung và cập nhật...
          </Typography>
        </Box>
      </Box>{' '}
    </>
  );
}

export default FeatureSection;
