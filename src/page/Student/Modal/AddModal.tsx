import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { Icon } from '@iconify/react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { validateSchemaStudent } from '../Context';
import { useStudent } from '@/hooks/api/useQueryStudent';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { EnumGender } from '@/types/enum';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { convertMajorDropDown } from '@/utils/convertDataTable';

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

function AddModal(props: any) {
  const { onClose, open } = props;
  const { onCreateStudent } = useStudent();
  const { termStore } = useTerm();
  const { majorStore } = useMajor();

  const { mutate: createStudent, isSuccess: successAdd } = onCreateStudent();

  const handleSubmitStudent = (values: any) => {
    createStudent(values);
  };

  useEffect(() => {
    if (successAdd) {
      onClose();
    }
  }, [successAdd]);
  return (
    <Modal maxWidth='sm' open={open} onClose={onClose}>
      <Box p={10}>
        <TitleManager mb={10} variant='h4' textTransform={'uppercase'}>
          Tạo Sinh viên
        </TitleManager>

        <Formik
          validationSchema={validateSchemaStudent}
          initialValues={{
            username: '',
            fullName: '',
            email: '',
            phone: '',
            clazzName: 'DH',
            gender: '',
            majorId: `${majorStore.currentMajor.id}`,
            typeTraining: 'UNIVERSITY',
            termId: `${termStore.currentTerm.id}`,
          }}
          onSubmit={(values: any) => handleSubmitStudent(values)}
        >
          {({ values, errors, touched, handleSubmit, handleChange, handleBlur, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <CustomTextField
                label='Mã sinh viên'
                name='username'
                value={values.username}
                placeholder='Ví dụ: 21089141'
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.username && touched.username ? true : false}
                helperText={`${errors.username && touched.username ? errors.username : ''}`}
              />
              <CustomTextField
                value={values.fullName}
                name='fullName'
                label='Họ và tên'
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder='Họ và tên'
                error={errors.fullName && touched.fullName ? true : false}
                helperText={`${errors.fullName && touched.fullName ? errors.fullName : ''}`}
              />
              <Box display={'flex'} gap={8} alignContent={'center'}>
                <Box width={120}>
                  <DropDown

                    sx={{ mb: 8 }}
                    label='Giới tính'
                    value={`${values.gender ? values.gender : ''}`}
                    onChange={(e) => {
                      setFieldValue('gender', e.target.value);
                    }}
                    options={GenderStudent}
                  />
                </Box>
                <Box width={'100%'}>
                  <CustomTextField
                    value={values.clazzName}
                    name='clazzName'
                    label='Lớp danh nghĩa'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Ví dụ: DHKTPM17C'
                    error={errors.clazzName && touched.clazzName ? true : false}
                    helperText={`${errors.clazzName && touched.fullName ? errors.clazzName : ''}`}
                  />
                </Box>
              </Box>

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
                  disabled={true}
                  value={`${values.majorId}`}
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
                  setFieldValue('typeTraining', e.target.value);
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
      </Box>
    </Modal>
  );
}

export default AddModal;
