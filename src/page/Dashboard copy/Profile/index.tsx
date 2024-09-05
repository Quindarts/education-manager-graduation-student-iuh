import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React from 'react';
const MY_PROFILE: any = {
  StudentID: '21089141',
  Class: 'DHKTPM17C',
  Fullname: 'Lê Minh Quang',
  AcademicYear: '2021 - 2022',
  Gender: 'Male',
  EducationLevel: 'University',
  DateOfBirth: '19/02/2003',
  TrainingType: 'Regular',
  PlaceOfBirth: 'Thừa Thiên Huế ',
  Major: 'Software Engineering',
};
function ProfileDashBoard(props: any) {
  const { ...rest } = props;
  const MAP1 = ['StudentID', 'Class', 'Fullname', 'AcademicYear', 'Gender'];
  const MAP2 = ['EducationLevel', 'DateOfBirth', 'TrainingType', 'PlaceOfBirth', 'Major'];
  return (
    <Box {...rest} display={'flex'} gap={10} flexWrap={'wrap'}>
      <Box flex={1} bgcolor={'white'} p={10} borderRadius={2} boxShadow={'1px 1px 1px 1px gray'}>
        <TitleManager>Thông tin cá nhân</TitleManager>
        <Box bgcolor={'warning.dark'} my={1} height={'1px'}></Box>
        <Box mt={16} display={'flex'} gap={20}>
          <Avatar sx={{ width: 100, height: 100 }} />
          <Box display={'flex'} gap={20}>
            <Box>
              {MAP1.map((item: string) => (
                <Box display={'flex'} my={2} gap={4}>
                  <Typography
                    width={140}
                    key={item}
                    fontWeight={600}
                    color='primary.dark'
                    variant='body1'
                  >
                    {item}
                  </Typography>
                  <Typography key={item}> {MY_PROFILE[`${item}`]}</Typography>
                </Box>
              ))}
            </Box>
            <Box>
              {MAP2.map((item: string) => (
                <Box display={'flex'} my={2} gap={4}>
                  <Typography
                    width={140}
                    key={item}
                    fontWeight={600}
                    color='text.secondary'
                    variant='body1'
                  >
                    {item}
                  </Typography>
                  <Typography key={item}> {MY_PROFILE[`${item}`]}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        minWidth={400}
        bgcolor={'white'}
        p={10}
        borderRadius={2}
        boxShadow={'1px 1px 1px 1px gray'}
      >
        <Box>
          <Box justifyContent={'space-between'} display={'flex'}>
            <Typography fontWeight={500} color='main.secondary' variant='body1'>
              Thông báo mới
            </Typography>
            <IconButton>
              <Icon color='#eab308' icon='mdi:notifications-active' />
            </IconButton>
          </Box>

          <Typography mt={10} fontWeight={800} color='primary.main' variant='h1'>
            0 <Typography variant='body2'>Thông báo đến bạn</Typography>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ProfileDashBoard;
