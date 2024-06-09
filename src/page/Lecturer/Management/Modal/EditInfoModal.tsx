import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender, EnumRole } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, CircularProgress } from '@mui/material';
import { Formik, useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { validateSchemaLecturer } from '../../context';
import { convertMajorDropDown } from '@/utils/convertDataTable';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';

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

const DEGREE_DROP_VALUE = [
  { name: 'Tiến sĩ', _id: 'MASTER' },
  { name: 'Thạc sĩ', _id: 'DOCTOR' },
];

function EditInfoModal(props: any) {
  const { onClose, open, lecturerId } = props;

  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  const { majorStore } = useMajor();

  const { handleGetLecturerById, onUpdateLecturer } = useLecturer();
  const { data, isLoading, isFetched } = handleGetLecturerById(lecturerId);
  const { mutate: updateLecturer, isSuccess } = onUpdateLecturer(lecturerId, currentTerm.id, 20, 1);

  const handleSubmitEditLecturer = (values: any) => {
    updateLecturer(values);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal open={open} onClose={onClose}>
      <Box py={10} px={10}>
        <TitleManager mb={2} variant='h5' textTransform={'uppercase'}>
          Cập nhật thông tin Giảng viên
        </TitleManager>
        {isLoading && !isFetched ? (
          <Box m={'auto'} height={500}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            onSubmit={(values) => {
              handleSubmitEditLecturer(values);
            }}
            validationSchema={validateSchemaLecturer}
            initialValues={{
              fullName: `${data?.lecturer?.fullName}`,
              id: `${data?.lecturer?.id}`,
              email: `${data?.lecturer?.email}`,
              phone: `${data?.lecturer?.phone}`,
              gender: `${data?.lecturer?.gender}`,
              role: `${data?.lecturer?.role}`,
              degree: `${data?.lecturer?.degree}`,
              majorId: `${data?.lecturer?.majorId}`,
            }}
          >
            {({ values, handleChange, handleBlur, handleSubmit, errors, setFieldValue }) => (
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
                  value={values.id}
                  name='id'
                  label='Mã giảng viên'
                  placeholder='Mã Giảng viên'
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.id ? true : false}
                  helperText={errors.id}
                />
                <Box display={'flex'} gap={10} mt={8}>
                  <Box width={'100%'}>
                    <CustomTextField
                      value={values.fullName}
                      name='fullName'
                      label='Họ và tên'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Họ và tên'
                      error={errors.fullName ? true : false}
                      helperText={errors.fullName}
                    />
                  </Box>
                  <Box width={200}>
                    <DropDown
                      sx={{ mb: 8 }}
                      value={`${values.gender}`}
                      onChange={(e) => {
                        setFieldValue('gender', e.target.value);
                      }}
                      label='Giới tính'
                      options={GenderLecturer}
                    />
                  </Box>
                </Box>
                <CustomTextField
                  name='phone'
                  value={values.phone}
                  label='Số điện thoại'
                  placeholder='Nhập vào số điện thoại'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone ? true : false}
                  helperText={errors.phone}
                />
                <CustomTextField
                  value={values.email}
                  name='email'
                  label='Email'
                  placeholder='Nhập vào email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                />
                <Box mt={8} width={'full'}>
                  <DropDown
                    label='Chuyên ngành'
                    value={values.majorId}
                    onChange={(e) => {
                      setFieldValue('majorId', e.target.value);
                    }}
                    options={convertMajorDropDown(majorStore.allMajor)}
                  />
                </Box>{' '}
                <Box mt={8} width={'full'}>
                  <DropDown
                    value={`${values.role}`}
                    disabled
                    onChange={(e) => {
                      setFieldValue('role', e.target.value);
                    }}
                    label='Vai trò'
                    options={RoleLecturerDrop}
                  />
                </Box>
                <Box mt={8} width={'full'}>
                  <DropDown
                    label='Trình độ'
                    value={values.degree}
                    onChange={(e) => {
                      setFieldValue('degree', e.target.value);
                    }}
                    options={DEGREE_DROP_VALUE}
                  />
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
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default EditInfoModal;
