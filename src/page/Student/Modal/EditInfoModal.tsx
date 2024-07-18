import Calendar from '@/components/ui/Calendar';
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
import { useTerm } from '@/hooks/api/useQueryTerm';
import dayjs from 'dayjs';
import { useMajor } from '@/hooks/api/useQueryMajor';
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
function EditInfoModal(props: any) {
  const { onClose, open, studentId } = props;

  const { handleGetStudentById, onUpdateStudent } = useStudent();
  const { data, isLoading, isFetched } = handleGetStudentById(studentId);

  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  const { mutate: upDateStudent, isSuccess } = onUpdateStudent(studentId);

  const handleSubmitStudent = (values: any) => {
    upDateStudent(values);
  };
  useEffect(() => {
    onClose();
  }, [isSuccess]);

  return (
    <Modal maxWidth='xs' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
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
              username: `${data?.student?.username}`,
              fullName: `${data?.student?.fullName}`,
              email: `${data?.student?.email}`,
              phone: `${data?.student?.phone}`,
              dateOfBirth: data?.student.dateOfBirth ? dayjs(data?.student.dateOfBirth) : null,
              clazzName: `${data?.student?.clazzName}`,
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
                <CustomTextField
                  label='Mã sinh viên'
                  name='username'
                  required
                  value={values.username}
                  placeholder='Ví dụ: 20189141'
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username && touched.username ? true : false}
                  helperText={`${errors.username && touched.username ? errors.username : ''}`}
                />
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
                <Box display={'flex'} gap={8} alignContent={'center'}>
                  <Box width={'50%'}>
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
                  <CustomTextField
                    value={values.clazzName}
                    name='clazzName'
                    label='Lớp danh nghĩa'
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Ví dụ: DHKTPM17C'
                    error={errors.clazzName && touched.clazzName ? true : false}
                    helperText={`${errors.clazzName && touched.clazzName ? errors.clazzName : ''}`}
                  />
                </Box>

                <CustomTextField
                  value={values.email}
                  name='email'
                  label='Email'
                  required
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
                  required
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
                    onChange={(e) => {
                      setFieldValue('majorId', e.target.value);
                    }}
                    options={convertMajorDropDown(majorStore.allMajor)}
                    placeholder='Chuyên ngành'
                  />
                </Box>
                <DropDown
                  label='Loại đào tạo'
                  value={`${values.typeTraining}`}
                  onChange={(e) => {
                    setFieldValue('typeTraning', e.target.value);
                  }}
                  options={TRAINING_DROP_VALUE}
                />
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
            )}
          </Formik>
        )}
      </Box>
    </Modal>
  );
}

export default EditInfoModal;
