import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

function TermDetail(props: any) {
  const { onClose, open, lecturer_id } = props;
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <Modal open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Thông tin chi tiết Học kì
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField label='Tên học kì' placeholder='Tên học kì' />
          <CustomTextField label='Niên khóa' placeholder='Niên khóa' />
          <Box display={'flex'} gap={8}>
            <Calendar
              sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
              label='Ngày bắt đầu'
            />
            <Calendar
              sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
              label='Ngày kết thúc'
            />
          </Box>

          <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='h5' fontWeight={'bold'}>
                Đăng ký Nhóm
              </Typography>
              <Typography fontWeight={'bold'} color='primary' p={2}>
                Đang mở
              </Typography>
            </Box>
            <Box display={'flex'} gap={8}>
              <Calendar
                sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                label='Ngày mở đăng ký Nhóm'
              />
              <Calendar
                sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                label='Ngày đóng đăng ký Nhóm'
              />
            </Box>
          </Box>
          <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='h5' fontWeight={'bold'}>
                Đăng ký Đề tài
              </Typography>
              <Typography fontWeight={'bold'} color='primary' p={2}>
                Đang mở
              </Typography>
            </Box>
            <Box display={'flex'} gap={8}>
              <Calendar
                sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                label='Ngày mở đăng ký Đề tài'
              />
              <Calendar
                sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                label='Ngày đóng đăng ký Đề tài'
              />
            </Box>
          </Box>
          <Box my={8} borderRadius={2} p={6} bgcolor={'grey.100'}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='h5' fontWeight={'bold'}>
                Công bố kết quả
              </Typography>
              <Typography fontWeight={'bold'} color='primary' p={2}>
                Đang mở
              </Typography>
            </Box>
            <Box display={'flex'} gap={8}>
              <Calendar
                sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                label='Ngày mở Công bố kết quả'
              />
              <Calendar
                sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
                label='Ngày đóng Công bố kết quả'
              />
            </Box>
          </Box>
          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
            <Button variant='contained' color='primary' onClick={onClose}>
              <Icon icon='mdi:close-outline' />
              Thoát
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default TermDetail;
