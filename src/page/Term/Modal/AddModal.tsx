import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';

function AddModal(props: any) {
  const { onClose, open } = props;
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
          Tạo học kì mới
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField label='Tên học kì' placeholder='Nhập vào tên học kì' />
          <CustomTextField label='Niên khóa' placeholder='Nhập vào tên học kì' />
          <Box gap={10} display={'flex'}>
            <Box flex={1}>
              <CustomTextField label='Ngày bắt đầu' placeholder='Nhập vào tên học kì' />
            </Box>
            <Box flex={1}>
              <CustomTextField label='Ngày kết thúc' placeholder='Nhập vào tên học kì' />
            </Box>
          </Box>
          <Box justifyContent={'end'} gap={4} display={'flex'}>
            <Button variant='contained' color='primary' onClick={onClose}>
              Hủy
            </Button>
            <Button variant='contained' color='success' type='submit'>
              Lưu thông tin
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddModal;
