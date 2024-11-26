import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { EnumGender } from '@/types/enum';
import { convertMajorDropDown } from '@/utils/convertDataTable';
import { Icon } from '@iconify/react';
import { Box, Button, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { validateSchemaStudent } from '../Context';
import CustomTextField from '@/components/ui/CustomTextField';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { ModalProps } from '@/types/ui/Modal';
import Calendar from '@/components/ui/Calendar';
import dayjs from 'dayjs';
const GenderStudent = [
  {
    _id: EnumGender.FEMALE,
    name: 'Nữ',
  },
  {
    _id: EnumGender.MALE,
    name: 'Nam',
  },
];

const TRAINING_DROP_VALUE = [
  { _id: 'UNIVERSITY', name: 'Đại học' },
  { _id: 'COLLEGE', name: 'Cao đẳng' },
];

type EditModalType = { studentId: string };

function EditInfoModal(props: ModalProps & EditModalType) {
  const { onClose, open, studentId } = props;

  const { handleGetStudentById, onUpdateStudent } = useStudent();
  const { data, isLoading, isFetched } = handleGetStudentById(studentId);

  const { majorStore } = useMajor();
  const { mutate: upDateStudent, isSuccess } = onUpdateStudent(studentId);

  const handleSubmitStudent = (values: any) => {
    upDateStudent(values);
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);

  return (
    <Modal maxWidth='xs' open={open} onClose={onClose}>
      <Box px={10} py={6}>
        <TitleManager mb={6} variant='h5' icon='ph:student-fill' textTransform={'uppercase'}>
          Cập nhật thông tin Sinh viên
        </TitleManager>
        {isLoading && !isFetched ? (
          <Box m={'auto'} height={500}>
            <CircularProgress />
          </Box>
        ) : (
          <Formik
            validationSchema={validateSchemaStudent}
            initialValues={{
              username: `${data?.student?.username ? data?.student?.username : ''}`,
              fullName: `${data?.student?.fullName ? data?.student?.fullName : ''}`,
              email: `${data?.student?.email ? data.student.email : ''}`,
              phone: `${data?.student?.phone ? data?.student?.phone : ''}`,
              dateOfBirth: data?.student?.dateOfBirth ? dayjs(data?.student?.dateOfBirth) : null,
              clazzName: `${data?.student?.clazzName ? data?.student?.clazzName : 'DH'}`,
              gender: `${data?.student?.gender}`,
              majorId: `${data?.student?.majorId}`,
              typeTraining: `${data?.student?.typeTraining}`,
            }}
            onSubmit={(values: any) => handleSubmitStudent(values)}
          >
            {({
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box gap={8} display={'flex'}>
                  <Box width={200}>
                    <CustomTextField
                      label='Mã sinh viên'
                      name='username'
                      required
                      value={values.username}
                      placeholder='Ví dụ: 20189141'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.username && touched.username ? true : false}
                      helperText={`${errors.username && touched.username ? errors.username : ''}`}
                    />
                  </Box>
                  <Box width={'100%'}>
                    <CustomTextField
                      value={values.fullName}
                      name='fullName'
                      label='Họ và tên'
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder='Họ và tên'
                      error={errors.fullName && touched.fullName ? true : false}
                      helperText={`${errors.fullName && touched.fullName ? errors.fullName : ''}`}
                    />
                  </Box>
                </Box>

                <Box display={'flex'} gap={8} alignContent={'center'}>
                  <Box width={200}>
                    <DropDown
                      sx={{ mb: 8 }}
                      label='Giới tính'
                      value={`${values.gender}`}
                      onChange={(e) => {
                        setFieldValue('gender', e.target.value);
                      }}
                      options={GenderStudent}
                    />
                  </Box>
                  <Box width={'100%'}>
                    <Calendar
                      onChange={(value) => {
                        setFieldValue('dateOfBirth', value);
                      }}
                      format='DD/MM/YYYY'
                      name='dateOfBirth'
                      value={values.dateOfBirth}
                      sx={{ width: '100%', mb: 8 }}
                      label='Ngày sinh'
                    />
                  </Box>
                </Box>
                <CustomTextField
                  value={values.clazzName}
                  name='clazzName'
                  label='Lớp danh nghĩa'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Ví dụ: DHKTPM17C'
                  error={errors.clazzName && touched.clazzName ? true : false}
                  helperText={`${errors.clazzName && touched.clazzName ? errors.clazzName : ''}`}
                />
                <CustomTextField
                  value={values.email}
                  name='email'
                  label='Email'
                  placeholder='Nhập vào email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email ? true : false}
                  helperText={`${errors.email && touched.email ? errors.email : ''}`}
                />
                <CustomTextField
                  name='phone'
                  value={values.phone}
                  label='Số điện thoại'
                  placeholder='Nhập vào số điện thoại'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone && touched.phone ? true : false}
                  helperText={`${errors.phone && touched.phone ? errors.phone : ''}`}
                />
                <Box sx={{ mb: 8 }}>
                  <DropDown
                    label='Chuyên ngành'
                    value={values.majorId}
                    disabled
                    onChange={(e) => {
                      setFieldValue('majorId', e.target.value);
                    }}
                    options={convertMajorDropDown(majorStore.allMajor)}
                    placeholder='Chuyên ngành'
                  />
                </Box>
                {/* <DropDown
                  label='Loại đào tạo'
                  value={`${values.typeTraining}`}
                  onChange={(e) => {
                    setFieldValue('typeTraning', e.target.value);
                  }}
                  options={TRAINING_DROP_VALUE}
                /> */}
                <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                  <Button variant='contained' color='primary' onClick={onClose}>
                    <Icon icon='mdi:close-outline' />
                    Hủy
                  </Button>
                  <Button variant='contained' color='success' type='submit'>
                    <Icon icon='material-symbols:save-outline' />
                    Lưu
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
