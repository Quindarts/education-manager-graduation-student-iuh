import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Paper,
  Typography,
} from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import React from 'react';
import TitleManager from '@/components/ui/Title';

function BasicInformationGrStudentPage(props: any) {
  const { groupStudent } = props;
  return (
    <>
      <Paper variant='elevation' sx={{ mt: 1, py: 12, px: 8 }}>
        <TitleManager
          icon='flat-color-icons:info'
          fontWeight={600}
          mb={4}
          textTransform={'uppercase'}
          variant='h6'
        >
          Chi tiết nhóm
        </TitleManager>
        <Typography color={'text.primary'} variant='body1'>
          Giảng viên Hướng dẫn :{' '}
          {groupStudent.lecturerId ? groupStudent.lecturerId : 'Chưa có giảng viên hướng dẫn'}
        </Typography>
        <Typography color={'text.primary'} variant='body1'>
          Ngày tạo nhóm : {dayjs(groupStudent.created_at).format('DD/MM/YYYY')}
        </Typography>
      </Paper>
      <Box position={'relative'} my={8}>
        <Box sx={{ position: 'absolute', top: 10, zIndex: 10, left: '-20px' }}>
          <Icon width={50} color='#122E69' icon='game-icons:achievement' />
        </Box>
        <Accordion sx={{ px: 10 }} defaultExpanded>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon color='primary' />}
            aria-controls='panel-topic-content'
            id='panel-topic-header'
          >
            <TitleManager variant='h6' textTransform={'uppercase'} fontWeight={600}>
              Thông tin đề tài
            </TitleManager>
          </AccordionSummary>
          <AccordionDetails>
            {!groupStudent.topic ? (
              <Box
                mx={'auto'}
                display={'flex'}
                flexDirection={'column'}
                alignContent={'center'}
                justifyContent={'center'}
                textAlign={'center'}
                py={20}
                width={'100%'}
              >
                <Box>
                  <img
                    style={{ opacity: 0.7 }}
                    width={200}
                    height={200}
                    src='/images/nodata.png'
                    alt='nodata'
                  />
                </Box>
                <Typography variant='h3' sx={{ mt: 2 }}>
                  Nhóm chưa có Đề tài
                </Typography>
              </Box>
            ) : (
              <Box pb={8}>
                <Typography variant='h3' textAlign={'center'} fontWeight={600} color='grey.900'>
                  Tên đề tài: {'  '} {groupStudent?.topic.name}
                </Typography>
                <Typography my={4} fontWeight={500} variant='h6'>
                  Mô tả
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent?.topic.description}
                    maxRows={8}
                  />
                  <Typography fontWeight={400} px={2} variant='body1'></Typography>
                </Typography>
                <Typography my={4} fontWeight={500} variant='h6'>
                  Mục tiêu cần đạt được
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent?.topic.target}
                    maxRows={8}
                  />
                </Typography>
                <Typography my={4} fontWeight={500} variant='h6'>
                  Yêu cầu đầu vào
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent?.topic.require_input}
                    maxRows={8}
                  />
                </Typography>
                <Typography my={4} fontWeight={500} variant='h6'>
                  Chuẩn đầu ra
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent?.topic.standard_output}
                    maxRows={12}
                  />
                  <Typography fontWeight={400} px={2} variant='body1'></Typography>
                </Typography>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default BasicInformationGrStudentPage;
