import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import SekeletonUI from '@/components/ui/Sekeleton';
import { checkGender } from '@/utils/validations/person.validation';
import { useLecturerTerm } from '@/hooks/api/useQueryLecturerTerm';
import TabPanelUI from './TabPanel';

function DetailsLecturerPage() {
  const { id } = useParams();
  const { handleGetLecturerTermById } = useLecturerTerm();
  const { data, isLoading } = handleGetLecturerTermById(`${id}`);
  return (
    <Paper sx={{ px: 10, py: 10, minHeight: '60vh' }} elevation={0}>
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <>
          <TitleManager variant='h6'  icon='heroicons:user-20-solid' textTransform={'uppercase'}>Chi tiết giảng viên hướng dẫn</TitleManager>
          <Box mt={10} display={'flex'} gap={8}>
            <Box>
              <Avatar sx={{ width: 80, height: 80 }} />
            </Box>
            <Box>
              <Typography fontWeight={700} color='text.primary' component={'h3'} variant='h1'>
                {data.lecturerTerm.fullName}
              </Typography>
              <Box mt={10} display={'flex'} justifyContent={'space-evenly'} gap={10}>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    <Icon width={24} icon='solar:phone-outline' />
                  </Typography>
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    {data.lecturerTerm.phone}
                  </Typography>
                </Box>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Icon width={24} icon='material-symbols:mail-outline' />
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    {data.lecturerTerm.email}
                  </Typography>
                </Box>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Icon width={24} icon='material-symbols-light:date-range-outline' />
                  <Typography variant='h6' fontWeight={500} color='grey.600'></Typography>
                </Box>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Icon width={24} icon='bi:gender-trans' />
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    {checkGender(data.lecturerTerm.gender)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box my={4}>
            <TabPanelUI lecturerId={data.lecturerTerm.lecturerId}/>
          </Box>
        </>
      )}
    </Paper>  
  );
}

export default DetailsLecturerPage;
