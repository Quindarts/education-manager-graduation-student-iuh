import CustomTextField from '@/components/ui/CustomTextField';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Box, Button } from '@mui/material';
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
    onSubmit: (values: any) => {},
  });
  return (
    <Modal open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo đề tài mới
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField label='Tên đề tài' placeholder='Tên đề tài' />
          <CustomTextField type='number' label='Số lượng đề tài' placeholder='Số lượng đề tài' />
          <CustomTextField
            label='Mô tả đề tài'
            multiline
            maxRows={4}
            placeholder='Nhập vào Mô tả đề tài'
          />
          <CustomTextField
            multiline
            maxRows={4}
            label='Ghi chú đề tài'
            placeholder='Ghi chú đề tài'
          />
          <CustomTextField
            multiline
            maxRows={4}
            label='Mục tiêu đề tài'
            placeholder='Mục tiêu đề tài'
          />
          <CustomTextField multiline maxRows={4} label='Chuẩn đầu ra' placeholder='Chuẩn đầu ra' />
          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
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
