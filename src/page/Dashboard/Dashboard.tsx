import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';
import { checkGender } from '@/utils/validations/person.validation';
import { Icon } from '@iconify/react';
import PromotionTextContent from '@/components/ui/PromotionTextContent';
import Loading from '@/components/ui/Loading';

export default function Dashboard() {
  const { lecturerStore } = useAuth();
  return (
    <Paper sx={{ px: 20, py: 10, minHeight: '60vh' }} elevation={2}>
      <>
        <TitleManager>Thông tin {checkRoleLecturer(lecturerStore.currentRoleRender)}</TitleManager>
        <Box mt={20} display={'flex'} gap={8}>
          <Box>
            <Avatar sx={{ width: 80, height: 80 }} />
          </Box>
          <Box>
            <Typography fontWeight={700} color='text.primary' component={'h3'} variant='h1'>
              {lecturerStore.me.user.fullName}
            </Typography>
            <Box mt={10} display={'flex'} justifyContent={'space-evenly'} gap={10}>
              <Box fontWeight={500} display={'flex'} gap={4}>
                <Typography variant='h6' fontWeight={500} color='grey.600'>
                  <Icon width={24} icon='solar:phone-outline' />
                </Typography>
                <Typography variant='h6' fontWeight={500} color='grey.600'>
                  {lecturerStore.me.user.phone}
                </Typography>
              </Box>
              <Box fontWeight={500} display={'flex'} gap={4}>
                <Icon width={24} icon='material-symbols:mail-outline' />
                <Typography variant='h6' fontWeight={500} color='grey.600'>
                  {lecturerStore.me.user.email}
                </Typography>
              </Box>
              <Box fontWeight={500} display={'flex'} gap={4}>
                <Icon width={24} icon='material-symbols-light:date-range-outline' />
                <Typography variant='h6' fontWeight={500} color='grey.600'></Typography>
              </Box>
              <Box fontWeight={500} display={'flex'} gap={4}>
                <Icon width={24} icon='bi:gender-trans' />
                <Typography variant='h6' fontWeight={500} color='grey.600'>
                  {checkGender(lecturerStore.me.user.gender)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box my={10}>
          <TitleManager>Tổng quan</TitleManager>
          <Box my={10}></Box>
          <TitleManager>Tổng số khóa luận</TitleManager>
          <Box my={10}></Box>

          <TitleManager>Sinh viên tham gia</TitleManager>
          <Box my={10}></Box>
          <PromotionTextContent />
        </Box>
      </>
    </Paper>
  );
}
