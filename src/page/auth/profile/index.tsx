import CustomTextField from '@/components/ui/CustomTextField';
import DropDown from '@/components/ui/Dropdown';
import TitleManager from '@/components/ui/Title';
import { useLecturer } from '@/hooks/api/useQueryLecturer';
import { EnumGender } from '@/types/enum';
import { Icon } from '@iconify/react';
import { Box, Button, Paper } from '@mui/material';
import { convertMajorDropDown } from '@/utils/convertDataTable';
import { useTerm } from '@/hooks/api/useQueryTerm';
import { useMajor } from '@/hooks/api/useQueryMajor';
import { useAuth } from '@/hooks/api/useAuth';
import { validateSchemaLecturer } from '@/page/Lecturer/context';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

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
const DEGREE_DROP_VALUE = [
  { name: 'Tiến sĩ', _id: 'MASTER' },
  { name: 'Thạc sĩ', _id: 'DOCTOR' },
];

function ProfilePage() {
  const { termStore } = useTerm();
  const { majorStore } = useMajor();
  const { lecturerStore } = useAuth();
  const { onUpdateLecturer } = useLecturer();
  const { mutate: updateLecturer } = onUpdateLecturer();

  const handleSubmitEditLecturer = (values: any) => {
    updateLecturer(values);
  };

  const navigate = useNavigate();
  return (
    <>
      <Paper elevation={1} sx={{ width: '100%', mx: 'auto', mt: 8, position: 'relative' }}>
        <Box
          sx={{
            width: '100%',
            height: '20px',
            borderRadius: '4px 4px 0 0 ',
            bgcolor: 'primary.dark',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'absolute',
            zIndex: 1,
            opacity: 0.6,
          }}
        ></Box>

        <Box sx={{ px: 20, pt: '30px', zIndex: 10, position: 'relative' }}>
          <TitleManager icon='vaadin:user-card' variant='h5' textTransform={'uppercase'}>
            Thông tin cá nhân
          </TitleManager>
          <Box py={10} px={5}>
            <Formik
              onSubmit={(values) => {
                handleSubmitEditLecturer(values);
              }}
              validationSchema={validateSchemaLecturer}
              initialValues={{
                fullName: `${lecturerStore.me.user.fullName}`,
                username: `${lecturerStore.me.user.username}`,
                email: `${lecturerStore.me.user.email}`,
                phone: `${lecturerStore.me.user.phone}`,
                gender: `${lecturerStore.me.user.gender}`,
                degree: `${lecturerStore.me.user.degree}`,
                majorId: `${lecturerStore.me.user.majorId}`,
              }}
            >
              {({ values, handleChange, handleBlur, handleSubmit, errors, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                  <Box display={'flex'} gap={20}>
                    <Box flex={1}>
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
                      <Box width={'full'}>
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
                    </Box>
                  </Box>

                  <Box mt={10} justifyContent={'end'} gap={4} display={'flex'}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => navigate('/profile/update-password')}
                    >
                      Đổi mật khẩu <Icon width={20} icon='carbon:password' />
                    </Button>

                    <Button variant='contained' color='success' type='submit'>
                      Cập nhật thông tin <Icon width={20} icon='ic:twotone-update' />
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
