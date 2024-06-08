import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button } from '@mui/material';
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
          Tạo sinh viên mới
        </TitleManager>
        <form onSubmit={formik.handleSubmit}>
          <Box
            mx={'auto'}
            position={'relative'}
            height={80}
            width={80}
            mb={3}
            sx={{ borderRadius: '50%', bgcolor: '#f3f3f9' }}
          >
            <img style={{ borderRadius: '50%' }} alt='' src={'/'} />
            <Box
              sx={{ border: '3px solid white', backgroundColor: 'primary.main', cursor: 'pointer' }}
              borderRadius={'50%'}
              height={32}
              width={32}
              position={'absolute'}
              top={0}
              right={'4px'}
              color={'white'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <label style={{ cursor: 'pointer' }}>
                <Icon icon='heroicons:camera-solid' width={16} />
                <input type='file' style={{ display: 'none' }} onChange={(event) => {}} />
              </label>
            </Box>
          </Box>
          <CustomTextField label='Mã sinh viên' placeholder='Mã sinh viên' />
          <CustomTextField label='Họ và tên' placeholder='Họ và tên' />
          <Box display={'flex'} gap={8} alignContent={'center'}>
            <Box width={'50%'}>
              <DropDown sx={{ mb: 8 }} label='Giới tính' placeholder='Giới tính' options={[]} />
            </Box>
            <Calendar sx={{ width: '100%', mb: 8 }} label='Ngày sinh' />
          </Box>
          <CustomTextField label='Email' placeholder='Nhập vào email' />
          <DropDown label='Loại đào tạo' placeholder='Loại đào tạo' options={[]} />

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

export default AddModal;
