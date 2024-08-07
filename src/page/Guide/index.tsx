import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const drawerWidth = 240;

const GuidePage: React.FC = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#063c78',
            color: '#ffffff',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant='h6'>Hướng Dẫn Sử Dụng</Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Typography variant='body1'>Danh Mục</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 2 }}>
            <Button sx={{ color: '#fbbf24' }}>Giới Thiệu</Button>
            <Button sx={{ color: '#fbbf24' }}>Tính Năng</Button>
            <Button sx={{ color: '#fbbf24' }}>Câu Hỏi Thường Gặp</Button>
          </Box>
        </Box>
      </Drawer>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          backgroundColor: '#f5f5f5',
          padding: 3,
        }}
      >
        <Typography variant='h4' gutterBottom>
          Hướng Dẫn Sử Dụng Phần Mềm
        </Typography>

        <Accordion sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Giới Thiệu</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Đây là phần giới thiệu về phần mềm. Bạn có thể tìm thấy các thông tin cơ bản và tính
              năng nổi bật của phần mềm tại đây.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ marginBottom: 2 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel2a-content'
            id='panel2a-header'
          >
            <Typography>Tính Năng</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Phần này cung cấp thông tin chi tiết về các tính năng của phần mềm và cách sử dụng
              chúng.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant='h6'>Câu Hỏi Thường Gặp</Typography>
            <Typography variant='body2'>
              Tại đây, bạn sẽ tìm thấy các câu hỏi thường gặp và câu trả lời của chúng.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' sx={{ color: '#0052b1' }}>
              Xem Thêm
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default GuidePage;
