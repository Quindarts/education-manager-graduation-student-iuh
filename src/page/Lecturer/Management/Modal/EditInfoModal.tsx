import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender, EnumRole } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
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
    _id: EnumRole.HEAD_COURSE,
    name: 'Quản trị viên',
  },
  {
    _id: EnumRole.ADMIN,
    name: 'Chủ quản môn học',
  },
];

const DEGREE_DROP_VALUE = [
  { name: 'Tiến sĩ', _id: 'MASTER' },
  { name: 'Thạc sĩ', _id: 'DOCTOR' },
];

function EditInfoModal(props: any) {
  const { onClose, open, lecturerId } = props;

  const { majorStore } = useMajor();

  const { handleGetLecturerById, onUpdateLecturer } = useLecturer();
  const { data, isLoading, isFetched } = handleGetLecturerById(lecturerId);

  const { mutate: updateLecturer, isSuccess } = onUpdateLecturer(lecturerId);

  const handleSubmitEditLecturer = (values: any) => {
    updateLecturer(values);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);
  return (
    <Modal maxWidth='xs' open={open} onClose={onClose}>
      <Box py={10} px={10}>
        <TitleManager mb={6} textTransform={'uppercase'}>
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
              username: `${data?.lecturer?.username}`,
              email: `${data?.lecturer?.email}`,
              phone: `${data?.lecturer?.phone}`,
              gender: `${data?.lecturer?.gender}`,
              // role: `${data?.lecturer.role}`,
              degree: `${data?.lecturer?.degree}`,
              majorId: `${data?.lecturer?.majorId}`,
            }}
          >
            {({
              values,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  value={values.username}
                  name='username'
                  label='Mã giảng viên'
                  placeholder='Mã Giảng viên'
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username && touched.username ? true : false}
                  helperText={`${errors.username && touched.username ? errors.username : ''}`}
                />
                <Box display={'flex'} gap={10} mt={8}>
                  <Box width={'100%'}>
                    <CustomTextField
                      required
                      value={values.fullName}
                      name='fullName'
                      label='Họ và tên'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Họ và tên'
                      error={errors.fullName && touched.fullName ? true : false}
                      helperText={`${errors.fullName && touched.fullName ? errors.fullName : ''}`}
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
                  required
                  name='phone'
                  value={values.phone}
                  label='Số điện thoại'
                  placeholder='Nhập vào số điện thoại'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone && touched.phone ? true : false}
                  helperText={`${errors.phone && touched.phone ? errors.phone : ''}`}
                />
                <CustomTextField
                  required
                  value={values.email}
                  name='email'
                  label='Email'
                  placeholder='Nhập vào email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email ? true : false}
                  helperText={`${errors.email && touched.email ? errors.email : ''}`}
                />
                <Box mt={8} width={'full'}>
                  <DropDown
                    label='Chuyên ngành'
                    disabled
                    value={values.majorId}
                    onChange={(e) => {
                      setFieldValue('majorId', e.target.value);
                    }}
                    options={convertMajorDropDown(majorStore.allMajor)}
                  />
                </Box>{' '}
                <Box mt={8} width={'full'}>
                  {/* <DropDown
                    value={`${values.role}`}
                    disabled
                    onChange={(e) => {
                      setFieldValue('role', e.target.value);
                    }}
                    label='Vai trò'
                    options={RoleLecturerDrop}
                  /> */}
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
