import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import TabPanelUI from './TabPanel';

function DetailsLecturerPage() {
  return (
    <Box mx={20}>
      <TitleManager>Thông tin giảng viên</TitleManager>
      <Box mt={20} display={'flex'} gap={8}>
        <Box>
          <Avatar sx={{ width: 80, height: 80 }} />
        </Box>
        <Box>
          <Typography fontWeight={700} color='text.primary' component={'h1'} variant='h1'>
            Le Minh Quang
          </Typography>
          <Box mt={10} display={'flex'} justifyContent={'space-evenly'} gap={10}>
            <Box fontWeight={500} display={'flex'} gap={4}>
              <Typography variant='h4' fontWeight={500} color='grey.600'>
                <Icon width={24} icon='solar:phone-outline' />
              </Typography>
              <Typography variant='h4' fontWeight={500} color='grey.600'>
                0702066368
              </Typography>
            </Box>
            <Box fontWeight={500} display={'flex'} gap={4}>
              <Icon width={24} icon='material-symbols:mail-outline' />
              <Typography variant='h4' fontWeight={500} color='grey.600'>
                quang@gmail.com
              </Typography>
            </Box>
            <Box fontWeight={500} display={'flex'} gap={4}>
              <Icon width={24} icon='material-symbols-light:date-range-outline' />
              <Typography variant='h4' fontWeight={500} color='grey.600'>
                19/02/2003
              </Typography>
            </Box>
            <Box fontWeight={500} display={'flex'} gap={4}>
              <Icon width={24} icon='bi:gender-trans' />
              <Typography variant='h4' fontWeight={500} color='grey.600'>
                Nam
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box my={10}>
        <TabPanelUI />
      </Box>
    </Box>
  );
}

export default DetailsLecturerPage;
