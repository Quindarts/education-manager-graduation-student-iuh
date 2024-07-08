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
  const { mutate: upDateStudent, isSuccess } = onUpdateStudent(
    studentId,
    termStore.currentTerm.id,
    20,
    1,
  );

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
            {({ values, errors, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                {/* <Box
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
                </Box> */}
                <CustomTextField
                  label='Mã sinh viên'
                  name='username'
                  value={values.username}
                  placeholder='Ví dụ: 20189141'
                  disabled
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.username ? true : false}
                  helperText={errors.username}
                />
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
                <CustomTextField
                  value={values.clazzName}
                  name='clazzName'
                  label='Lớp danh nghĩa'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Ví dụ: DHKTPM17C'
                  error={errors.clazzName ? true : false}
                  helperText={errors.clazzName}
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
