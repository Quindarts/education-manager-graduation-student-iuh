import { Box, Card } from '@mui/material';
import React from 'react';
import CardApplication from './Card';

const CARD: any = [
  {
    title: 'Lịch báo cáo',
    value: 'Report schedule',
    icon: 'fluent-emoji:calendar',
  },
  {
    title: 'Thống kê',
    value: 'Statistics',
    icon: 'emojione:bar-chart',
  },
  {
    title: 'Nhắc nhở',
    value: 'Reminders',
    icon: 'fluent-emoji:call-me-hand',
  },
  {
    title: 'Kết quả đánh giá',
    value: 'Assessment results',
    icon: 'fxemoji:note',
  },
  {
    title: 'Quản lý nhóm',
    value: 'Team management',
    icon: 'flat-color-icons:manager',
  },
  {
    title: 'Học kì đang diễn ra',
    value: 'Current semester',
    icon: 'flat-color-icons:timeline',
  },
];
function ListApplication(props: any) {
  const { ...rest } = props;
  return (
    <Box {...rest} gap={10} flexWrap={'wrap'} display={'flex'}>
      {CARD.map((card: any, index: any) => (
        <Card key={index} variant='outlined'>
          <CardApplication title={card.title} icon={card.icon} />
        </Card>
      ))}
    </Box>
  );
}

export default ListApplication;
