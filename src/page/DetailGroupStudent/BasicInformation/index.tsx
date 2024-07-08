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

function BasicInformationGrStudentPage(props: any) {
  const { groupStudent } = props;
  return (
    <>
      <Box display='flex' gap={10}>
        <Paper
          variant='elevation'
          sx={{ mt: 8, py: 12, px: 8, flex: 0.8, borderTop: '5px solid #333' }}
        >
          <Typography fontWeight={600} color={'text.primary'} mb={2} variant='h6'>
            <Icon icon='flat-color-icons:info' style={{ margin: ' 0 4px' }} />
            Thông tin cơ bản
          </Typography>
          <Typography color={'text.primary'} variant='body1'>
            Giảng viên Hướng dẫn :{' '}
            {groupStudent.lecturerId ? groupStudent.lecturerId : 'Chưa có giảng viên hướng dẫn'}
          </Typography>
          <Typography color={'text.primary'} variant='body1'>
            Ngày tạo nhóm : {dayjs(groupStudent.created_at).format('DD/MM/YYYY')}
          </Typography>
        </Paper>
        <Paper variant='elevation' sx={{ mt: 8, p: 8, flex: 1, borderTop: '5px solid #333' }}>
          <Typography>Thông báo mới</Typography>
          <Box>Không có thông báo</Box>
        </Paper>
      </Box>
      <Box position={'relative'} my={8}>
        <Box sx={{ position: 'absolute', top: 10, zIndex: 10, left: '-20px' }}>
          <Icon width={50} color='red' icon='game-icons:achievement' />
        </Box>
        <Accordion sx={{ px: 10, borderTop: '5px solid #0052b1' }} defaultExpanded>
          <AccordionSummary
            expandIcon={<GridExpandMoreIcon color='primary' />}
            aria-controls='panel-topic-content'
            id='panel-topic-header'
          >
            <Typography variant='h6' fontWeight={600}>
              Thông tin đề tài
            </Typography>
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
                <Typography variant='h3' textAlign={'center'} fontWeight={600} color='primary.dark'>
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
