import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Avatar, Box, Paper, Typography } from '@mui/material';
import React from 'react';
import TabPanelUI from './TabPanel';
import { useParams } from 'react-router-dom';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import SekeletonUI from '@/components/ui/Sekeleton';
import { formatDates } from '@/utils/formatDate';
import { checkGender } from '@/utils/validations/person.validation';
import { checkRoleLecturer } from '@/utils/validations/lecturer.validation';

function DetailsLecturerPage() {
  const { lecturer_id } = useParams();
  // alert(lecturer_id);
  const { handleGetLecturerById } = useLecturer();
  const { data, isLoading } = handleGetLecturerById(`${lecturer_id}`);
  return (
    <Paper sx={{ px: 20, py: 10, minHeight: '60vh' }} elevation={2}>
      {isLoading ? (
        <SekeletonUI />
      ) : (
        <>
          <TitleManager>Thông tin {checkRoleLecturer(data.lecturer.role)}</TitleManager>
          <Box mt={20} display={'flex'} gap={8}>
            <Box>
              <Avatar sx={{ width: 80, height: 80 }} />
            </Box>
            <Box>
              <Typography fontWeight={700} color='text.primary' component={'h3'} variant='h1'>
                {data.lecturer.fullName}
              </Typography>
              <Box mt={10} display={'flex'} justifyContent={'space-evenly'} gap={10}>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    <Icon width={24} icon='solar:phone-outline' />
                  </Typography>
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    {data.lecturer.phone}
                  </Typography>
                </Box>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Icon width={24} icon='material-symbols:mail-outline' />
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    {data.lecturer.email}
                  </Typography>
                </Box>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Icon width={24} icon='material-symbols-light:date-range-outline' />
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                  </Typography>
                </Box>
                <Box fontWeight={500} display={'flex'} gap={4}>
                  <Icon width={24} icon='bi:gender-trans' />
                  <Typography variant='h6' fontWeight={500} color='grey.600'>
                    {checkGender(data.lecturer.gender)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box my={10}>
            <TabPanelUI />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default DetailsLecturerPage;
