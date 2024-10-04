import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import React from 'react';
import CardGroupLecturer from './Card';

function GroupByAssign({ groupLecturers }: any) {
  return (
    <Box>
      {groupLecturers.length === 0 ? (
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          width={'100%'}
          display={'flex'}
          height={400}
          flexDirection={'column'}
          p={20}
        >
          <img height={200} src='/images/nodata.webp' alt='' />
          <Typography variant='h6' color='grey.600'>
            Không có dữ liệu (Danh sách trống)
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 10, py: 10 }}>
          {groupLecturers.map((group) => (
            <CardGroupLecturer group={group} />
          ))}
        </Box>
      )}
    </Box>
  );
}

export default GroupByAssign;
