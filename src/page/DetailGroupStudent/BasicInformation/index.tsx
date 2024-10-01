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
      <Paper variant='elevation' elevation={0} sx={{ mt: 1, py: 12, px: 8 }}>
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
          {groupStudent.lecturerName ? groupStudent.lecturerName : 'Chưa có giảng viên hướng dẫn'}
        </Typography>
        <Typography color={'text.primary'} variant='body1'>
          Ngày tạo nhóm : {dayjs(groupStudent.created_at).format('DD/MM/YYYY')}
        </Typography>
      </Paper>
      <Box position={'relative'} my={8}>
        <Box sx={{ position: 'absolute', top: 10, zIndex: 10, left: '-20px' }}>
          <Icon width={50} color='#122E69' icon='game-icons:achievement' />
        </Box>
        <Accordion sx={{ px: 10 }}>
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
            {!groupStudent.topicName ? (
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
                    src='/images/nodata.webp'
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
                  Tên đề tài: {'  '} {groupStudent.topicName}
                </Typography>
                <Typography my={4} fontWeight={600} variant='h6'>
                  Mô tả
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent.topicDescription}
                    maxRows={8}
                  />
                  <Typography fontWeight={600} px={2} variant='body1'></Typography>
                </Typography>
                <CustomTextField
                  multiline
                  disabled
                  value={groupStudent?.topicExpectedResult}
                  maxRows={8}
                  label='Dự kiến sản phẩm nghiên cứu của Đề tài và khả năng ứng dụng'
                  placeholder='Dự kiến sản phẩm nghiên cứu của Đề tài và khả năng ứng dụng'
                />
                <Typography my={4} fontWeight={600} variant='h6'>
                  Mục tiêu cần đạt được
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent.topicTarget}
                    maxRows={8}
                  />
                </Typography>
                <Typography my={4} fontWeight={600} variant='h6'>
                  Yêu cầu đầu vào
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent.topicRequireInput}
                    maxRows={8}
                  />
                </Typography>
                <Typography my={4} fontWeight={600} variant='h6'>
                  Chuẩn đầu ra
                  <CustomTextField
                    disabled
                    multiline
                    value={groupStudent.topicStandardOutput}
                    maxRows={12}
                  />
                  <Typography fontWeight={600} px={2} variant='body1'></Typography>
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
