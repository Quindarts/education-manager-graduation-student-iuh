import Calendar from '@/components/ui/Calendar';
import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import Modal from '@/components/ui/Modal';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender, EnumRole } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Avatar, Box, Button, CircularProgress, Paper } from '@mui/material';
import { Formik, useFormik } from 'formik';
import React, { useContext, useEffect, useState } from 'react';
import { convertMajorDropDown } from '@/utils/convertDataTable';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useAuth } from '@/hooks/api/useAuth';
import { validateSchemaLecturer } from '@/page/Lecturer/context';

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

function ProfilePage() {
  const { termStore } = useTerm();
  const { currentTerm } = termStore;
  const { majorStore } = useMajor();
  const { lecturerStore } = useAuth();
  const { handleGetLecturerById, onUpdateLecturer } = useLecturer();
  const { mutate: updateLecturer, isSuccess } = onUpdateLecturer(
    lecturerStore.me.id,
    currentTerm.id,
    20,
    1,
  );

  const handleSubmitEditLecturer = (values: any) => {
    updateLecturer(values);
  };

  return (
    <>
      <Paper elevation={6} sx={{ width: '90%', mx: 'auto', mt: 8, position: 'relative' }}>
        <Box
          sx={{
            width: '100%',
            height: '50px',
            borderRadius: '4px 4px 0 0 ',
            backgroundImage:
              'url(https://c4.wallpaperflare.com/wallpaper/798/616/951/macos-sierra-wallpaper-preview.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            zIndex: 1,
            opacity: 0.6,
          }}
        ></Box>

        <Box sx={{ px: 20, pt: '50px', zIndex: 10, position: 'relative' }}>
          <TitleManager>
            <Icon width={20} style={{ marginTop: '10px' }} icon='hugeicons:profile' />
            Thông tin cá nhân
          </TitleManager>
          <Box py={10} px={5}>
            <Formik
              onSubmit={(values) => {
                handleSubmitEditLecturer(values);
              }}
              validationSchema={validateSchemaLecturer}
              initialValues={{
                fullName: `${lecturerStore.me.fullName}`,
                username: `${lecturerStore.me.username}`,
                email: `${lecturerStore.me.email}`,
                phone: `${lecturerStore.me.phone}`,
                gender: `${lecturerStore.me.gender}`,
                role: `${lecturerStore.me.role}`,
                degree: `${lecturerStore.me.degree}`,
                majorId: `${lecturerStore.me.majorId}`,
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box display={'flex'} gap={20}>
                    <Box flex={1}>
                      <Box
                        mx={'auto'}
                        position={'relative'}
                        height={200}
                        width={200}
                        mb={3}
                        sx={{ borderRadius: '20%', bgcolor: '#f3f3f9' }}
                      >
                        {' '}
                        <img
                          style={{ borderRadius: '10%', width: '200px', height: '200px' }}
                          alt=''
                          src={'https://img.artpal.com/867752/16-22-10-3-9-27-51m.jpg'}
                        />
                        <Box
                          sx={{
                            border: '6px solid white',
                            backgroundColor: 'primary.main',
                            cursor: 'pointer',
                          }}
                          borderRadius={'50%'}
                          height={50}
                          width={50}
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
                            <input
                              type='file'
                              style={{ display: 'none' }}
                              onChange={(event) => {}}
                            />
                          </label>
                        </Box>
                      </Box>
                      <CustomTextField
                        required
                        value={values.username}
                        name='username'
                        label='Mã giảng viên'
                        placeholder='Mã Giảng viên'
                        disabled
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors.username ? true : false}
                        helperText={errors.username}
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
                    </Box>
                    <Box flex={1}>
                      <CustomTextField
                        required
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
                        required
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
                          disabled
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
                    </Box>
                  </Box>

                  <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                    <Button variant='contained' color='primary' type='submit'>
                      <Icon icon='material-symbols:save-outline' />
                      Cập nhật thông tin cá nhân
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default ProfilePage;
