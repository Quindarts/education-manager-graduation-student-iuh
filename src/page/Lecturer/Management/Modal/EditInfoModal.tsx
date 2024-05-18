import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender, EnumRole } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';

const GenderLecturer = [
  {
    _id: EnumGender.FEMALE,
    name: 'Nữ',
  },
  {
    _id: EnumGender.MALE,
    name: 'Nam',
  },
];
const RoleLecturerDrop = [
  {
    _id: EnumRole.LECTURER,
    name: 'Giảng viên',
  },
  {
    _id: EnumRole.HEAD_LECTURER,
    name: 'Trưởng bộ môn',
  },
  {
    _id: EnumRole.SUB_HEAD_LECTURER,
    name: 'Phó bộ môn',
  },
];

function EditInfoModal(props: any) {
  const { onClose, open, lecturer_id } = props;
  const { handleGetLecturerById } = useLecturer();
  const { data, isLoading } = handleGetLecturerById(lecturer_id);

  const formik = useFormik({
    initialValues: {
      fullName: `${data?.lecturer?.fullName}`,
      id: `${data?.lecturer?.id}`,
      email: `${data?.lecturer?.email}`,
      phone: `${data?.lecturer?.phone}`,
    },
    onSubmit: (values: any) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const { values, handleSubmit } = formik;

  return (
    <Modal open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Cập nhật thông tin Giảng viên
        </TitleManager>
        {isLoading ? (
          <Box m={'auto'} height={500}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
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
                sx={{
                  border: '3px solid white',
                  backgroundColor: 'primary.main',
                  cursor: 'pointer',
                }}
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
            <CustomTextField
              value={data?.lecturer?.id}
              name='id'
              label='Mã giảng viên'
              placeholder='Mã Giảng viên'
              disabled
            />
            <CustomTextField
              value={data?.lecturer?.fullName}
              name='fullName'
              label='Họ và tên'
              placeholder='Họ và tên'
            />
            <Box display={'flex'} gap={8} alignContent={'center'}>
              <Box width={'50%'}>
                <DropDown
                  sx={{ mb: 8 }}
                  defaultValue={`${data?.lecturer?.gender}`}
                  label='Giới tính'
                  options={GenderLecturer}
                />
              </Box>
              <Calendar sx={{ width: '100%', mb: 8 }} label='Ngày sinh' />
            </Box>
            <CustomTextField
              name='phone'
              value={data?.lecturer?.phone}
              label='Số điện thoại'
              placeholder='Nhập vào số điện thoại'
            />
            <CustomTextField
              value={data?.lecturer?.email}
              name='email'
              label='Email'
              placeholder='Nhập vào email'
            />
            <Box width={'full'}>
              <DropDown
                defaultValue={`${data.lecturer?.role}`}
                label='Vai trò'
                options={RoleLecturerDrop}
              />
            </Box>
            <Box mt={8} width={'full'}>
              <DropDown label='Trình độ' placeholder='Trình độ' options={[]} />
            </Box>{' '}
            <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
              <Button variant='contained' color='primary' onClick={onClose}>
                <Icon icon='mdi:close-outline' />
                Hủy
              </Button>
              <Button variant='contained' color='success' type='submit'>
                <Icon icon='material-symbols:save-outline' />
                Cập nhật giảng viên
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
}

export default EditInfoModal;
