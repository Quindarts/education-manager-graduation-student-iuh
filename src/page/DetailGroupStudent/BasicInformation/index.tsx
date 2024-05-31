import useGroupStudent from '@/hooks/api/useQueryGroupStudent';
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
import React from 'react';

function BasicInformationGrStudentPage(props: any) {
  const { groupStudentId } = props;
  const { handleGetGroupStudentById } = useGroupStudent();
  // const { data: resGroupStudent, isLoading: loadingGroupStudent } = handleGetGroupStudentById(
  //   `${groupStudentId}`,
  // );
  return (
    <>
      <Box display='flex' gap={10}>
        <Paper variant='elevation' sx={{ mt: 8, py: 12, px: 8, flex: 0.8 }}>
          <Typography fontWeight={600} color={'text.primary'} mb={2} variant='h6'>
            Thông tin cơ bản
          </Typography>
          <Typography fontWeight={500} color={'text.primary'} variant='body1'>
            Giảng viên Hướng dẫn : Le Minh Quang
          </Typography>
          <Typography fontWeight={500} color={'text.primary'} variant='body1'>
            Số lượng thành viên : 3
          </Typography>
          <Typography fontWeight={500} color={'text.primary'} variant='body1'>
            Ngày tạo nhóm 19/02/2024
          </Typography>
          <Typography mt={4} fontWeight={500} color={'text.primary'} variant='body1'>
            Trạng thái:
            <Chip sx={{ mx: 6 }} color='primary' label='Đang học' />
          </Typography>
        </Paper>
        <Paper variant='elevation' sx={{ mt: 8, p: 8, flex: 1 }}>
          <Typography>Thông báo mới</Typography>
          <Box>Không có thông báo</Box>
        </Paper>
      </Box>
      <Box my={8}>
        <Accordion sx={{ px: 10 }} defaultExpanded>
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
            <Box pb={8}>
              <Typography variant='h5' fontWeight={600} color='primary.dark'>
                Tên đề tài: Phát triển phần mềm thu hút người dùng mua hàng trực tuyến
              </Typography>
              <Typography my={4} fontWeight={500} variant='h6'>
                Mô tả
                <Typography fontWeight={400} px={2} variant='body1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus
                  blanditiis dolore natus labore maxime! Voluptatum, voluptate ipsam fuga tempore
                  eos inventore tempora voluptates iure quia aspernatur? Voluptatum, explicabo
                  officiis.
                </Typography>
              </Typography>
              <Typography my={4} fontWeight={500} variant='h6'>
                Mục tiêu cần đạt được
                <Typography fontWeight={400} px={2} variant='body1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus
                  blanditiis dolore natus labore maxime! Voluptatum, voluptate ipsam fuga tempore
                  eos inventore tempora voluptates iure quia aspernatur? Voluptatum, explicabo
                  officiis.
                </Typography>
              </Typography>
              <Typography my={4} fontWeight={500} variant='h6'>
                Yêu cầu đầu vào
                <Typography fontWeight={400} px={2} variant='body1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus
                  blanditiis dolore natus labore maxime! Voluptatum, voluptate ipsam fuga tempore
                  eos inventore tempora voluptates iure quia aspernatur? Voluptatum, explicabo
                  officiis.
                </Typography>
              </Typography>
              <Typography my={4} fontWeight={500} variant='h6'>
                Chuẩn đầu ra
                <Typography fontWeight={400} px={2} variant='body1'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus delectus
                  blanditiis dolore natus labore maxime! Voluptatum, voluptate ipsam fuga tempore
                  eos inventore tempora voluptates iure quia aspernatur? Voluptatum, explicabo
                  officiis.
                </Typography>
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
}

export default BasicInformationGrStudentPage;
