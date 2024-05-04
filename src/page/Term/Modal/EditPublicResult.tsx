import Calendar from '@/components/ui/Calendar';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button, Switch, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';

function EditPublicResult(props: any) {
  const { onClose, open } = props;
  const [isCheckedOpenGroup, setCheckedOpenGroup] = useState(true);
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
  const handleChangeStatusGroupRegister = () => {
    setCheckedOpenGroup(!isCheckedOpenGroup);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box px={10}>
        <TitleManager mb={10} mt={4}>
          Cập nhật thông tin công bố kết quả
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <Box display={'flex'} width={'full'} justifyContent={'center'} gap={10}>
            <Calendar
              sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
              label='Thời gian bắt đầu'
              disabled={isCheckedOpenGroup === false}
            />
            <Calendar
              sx={{ '& .Mui-disabled': { '-webkit-text-fill-color': '#0052b1' } }}
              label='Thời gian kết thúc'
              disabled={isCheckedOpenGroup === false}
            />
          </Box>
          <Box mt={6}>
            <Typography variant='h6' fontWeight={'bold'} color='primary.dark'>
              Trạng thái công bố kết quả
            </Typography>
            <Switch
              onChange={handleChangeStatusGroupRegister}
              checked={isCheckedOpenGroup}
              color='success'
            />
            <Typography
              component={'span'}
              variant='h6'
              color={isCheckedOpenGroup ? 'primary' : 'error'}
            >
              {isCheckedOpenGroup ? 'Đang mở công bố kết quả' : 'Đã đóng công bố kết quả'}
            </Typography>
          </Box>

          <Box mt={20} mb={6} justifyContent={'end'} gap={8} display={'flex'}>
            <Button variant='contained' color='primary' onClick={onClose}>
              <Icon width={20} style={{ marginRight: 4 }} icon='mdi:cancel-outline' />
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

export default EditPublicResult;
