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
            <Card
              key={group.id}
              sx={{
                width: 400,
                p: 2,
                boxShadow: 1,
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 2,
                },
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <GroupIcon sx={{ fontSize: 40, color: 'success.dark ', mr: 2 }} />
                  <Typography
                    variant='h5'
                    component='div'
                    sx={{ fontWeight: 'bold', color: 'success.dark' }}
                  >
                    {group.name}
                  </Typography>
                </Box>

                <Divider sx={{ my: 2 }} />
                <List>
                  {group.members.map((member) => (
                    <ListItem key={member.username} sx={{ px: 0 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: 'primary.dark' }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={member.fullName}
                        secondary={`Mã số: ${member.username}`}
                        primaryTypographyProps={{ fontWeight: 'medium' }}
                        secondaryTypographyProps={{ color: 'gray' }}
                      />
                      <IconButton edge='end' sx={{ color: 'primary.dark' }}>
                        <PersonIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default GroupByAssign;
