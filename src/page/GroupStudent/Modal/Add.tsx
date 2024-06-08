import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, Paper } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import TaskAddStudent from './Task';

function AddGroupStudentModal(props: any) {
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
    <Modal maxWidth='xl' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo Nhóm sinh viên mới
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <CustomTextField label='Tên nhóm sinh viên' disabled placeholder='Tên nhóm sinh viên' />
          <CustomTextField label='Số thành viên' placeholder='Số thành viên' />
          <DropDown label='Giảng viên hướng dẫn' placeholder='Chọn giảng viên' options={[]} />
          <Paper elevation={1} sx={{ my: 10 }}>
            <TaskAddStudent />
          </Paper>
          <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
            <Button variant='contained' color='primary' onClick={onClose}>
              <Icon icon='mdi:close-outline' />
              Hủy
            </Button>
            <Button variant='contained' color='success' type='submit'>
              <Icon icon='material-symbols:save-outline' />
              Lưu thông tin
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}

export default AddGroupStudentModal;
