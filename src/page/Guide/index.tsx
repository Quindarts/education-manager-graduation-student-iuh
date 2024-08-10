import React, { useState } from 'react';
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
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import Feature1 from './FeatureTab/Feature1';
import Feature2 from './FeatureTab/Feature2';
import Feature3 from './FeatureTab/Feature3';
import Feature4 from './FeatureTab/Feature4';
import Feature5 from './FeatureTab/Feature5';
import Feature6 from './FeatureTab/Feature6';
import Feature7 from './FeatureTab/Feature7';
import Feature8 from './FeatureTab/Feature8';
import Feature9 from './FeatureTab/Feature9';
import Feature10 from './FeatureTab/Feature10';
import Feature11 from './FeatureTab/Feature11';
import Feature12 from './FeatureTab/Feature12';
import Feature13 from './FeatureTab/Feature13';
import FeatureSection from './MainTab/Features';

const drawerWidth = 240;

const LIST_FEATURE = [
  { title: 'Quản lý học kì', id: 'feature1', feature: <Feature1 /> },
  { title: 'Quản lý chuyên ngành', id: 'feature2', feature: <Feature2 /> },
  { title: 'Quản lý sinh viên', id: 'feature3', feature: <Feature3 /> },
  { title: 'Quản lý giảng viên chuyên ngành', id: 'feature4', feature: <Feature4 /> },
  { title: 'Quản lý giảng viên hướng dẫn', id: 'feature5', feature: <Feature5 /> },
  { title: 'Quản lý tiêu chí đánh giá', id: 'feature6', feature: <Feature6 /> },
  { title: 'Quản lý đề tài', id: 'feature7', feature: <Feature7 /> },
  { title: 'Quản lý nhóm sinh viên', id: 'feature8', feature: <Feature8 /> },
  // { title: 'Quản lý sinh viên', id: 'feature9', feature: <Feature9 /> },
  { title: 'Quản lý nhóm giảng viên', id: 'feature10', feature: <Feature10 /> },
  { title: 'Quản lý phân công chấm điểm', id: 'feature11', feature: <Feature11 /> },
  { title: 'Quản lý chấm điểm & bảng điểm', id: 'feature12', feature: <Feature12 /> },
  { title: 'Thống kê', id: 'feature13', feature: <Feature13 /> },
];

const GuidePage: React.FC = () => {
  const [selectedMainTab, setSelectedMainTab] = useState<string>('features');
  const [selectedSubTab, setSelectedSubTab] = useState<number | null>(null);

  const handleMainTabClick = (tab: string) => {
    setSelectedMainTab(tab);
    setSelectedSubTab(null);
  };

  const handleSubTabClick = (index: number) => {
    setSelectedSubTab(index);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#333',
            color: 'white',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <Box
          flexDirection={'column'}
          alignItems={'center'}
          display={'flex'}
          justifyContent={'center'}
          my={4}
        >
          <img width={150} src='/images/logo_bg_white.webp' />
          <Typography
            mt={6}
            mb={2}
            textAlign={'center'}
            fontWeight={'500'}
            textTransform={'uppercase'}
            variant='h6'
          >
            Hướng dẫn
          </Typography>
        </Box>
        <List>
          <ListItem
            button
            sx={{
              '&:hover': {
                backgroundColor: '#003d79',
              },
              backgroundColor: selectedMainTab === 'features' ? '#07376f' : 'transparent',
            }}
            onClick={() => handleMainTabClick('features')}
          >
            <ListItemText primary='Tính Năng' />
          </ListItem>
          {selectedMainTab === 'features' && (
            <Box sx={{}}>
              <List>
                {LIST_FEATURE.map((feature, index) => (
                  <ListItem
                    button
                    key={feature.id}
                    onClick={() => handleSubTabClick(index)}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#3d3d3d',
                      },
                      backgroundColor: selectedSubTab === index ? '#242424' : '#555656',
                    }}
                  >
                    <ListItemText primary={feature.title} />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          <ListItem
            button
            sx={{
              '&:hover': {
                backgroundColor: '#003d79',
              },
              backgroundColor: selectedMainTab === 'description' ? '#0052b1' : '#333',
            }}
            onClick={() => handleMainTabClick('description')}
          >
            <ListItemText primary='Mô Tả' />
          </ListItem>
          <ListItem
            button
            sx={{
              '&:hover': {
                backgroundColor: '#003d79',
              },
              backgroundColor: selectedMainTab === 'faq' ? '#0052b1' : 'transparent',
            }}
            onClick={() => handleMainTabClick('faq')}
          >
            <ListItemText primary='Câu Hỏi Thường Gặp' />
          </ListItem>
        </List>

        {selectedMainTab === 'description' && (
          <Box sx={{ padding: 2 }}>
            <Typography variant='body1'>Mô Tả tổng quan về phần mềm.</Typography>
          </Box>
        )}

        {selectedMainTab === 'faq' && (
          <Box sx={{ padding: 2 }}>
            <Typography variant='body1'>Các câu hỏi thường gặp và câu trả lời.</Typography>
          </Box>
        )}
      </Drawer>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          backgroundColor: '#fffff',
          padding: 3,
        }}
      >
        <Typography variant='h3' mx={4} my={6} fontWeight={'700'} color='grey.900' gutterBottom>
          Hướng Dẫn Sử Dụng Phần Mềm
        </Typography>
        {selectedMainTab === 'features' && selectedSubTab == null && <FeatureSection />}
        {selectedMainTab === 'features' && selectedSubTab !== null && (
          <Box bgcolor='rgb(255, 255, 255)' mt={6} mx={10}>
            {LIST_FEATURE[selectedSubTab].feature}
          </Box>
        )}

        {selectedMainTab === 'description' && (
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant='h6'>Chi Tiết Mô Tả</Typography>
              <Typography variant='body2'>
                Mô tả chi tiết về phần mềm và các tính năng nổi bật.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' sx={{ color: '#0052b1' }}>
                Xem Thêm
              </Button>
            </CardActions>
          </Card>
        )}

        {selectedMainTab === 'faq' && (
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
        )}
      </Box>
    </Box>
  );
};

export default GuidePage;
