import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CustomTextField from '@/components/ui/CustomTextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '@/utils/app-config';
import { FormikHelpers, useFormik } from 'formik';
import { IRegister } from '@/types/auth.type';
import { RegisterValidationSchema } from '@/utils/validations/auth.validation';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { Icon } from '@iconify/react';
import DropDown from '@/components/ui/Dropdown';

const ROLE_REGISTER = [
  {
    name: 'Admin',
    _id: 'admin',
  },
  {
    name: 'Factory',
    _id: 'factory',
  },
  {
    name: 'Agency',
    _id: 'agency',
  },
];

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
  const formik = useFormik<IRegister>({
    initialValues: {
      email: '',
      username: '',
      password: '',
      role: '',
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: (values, { resetForm }: FormikHelpers<IRegister>) => {
      alert(JSON.stringify(values, null, 2));
      resetForm();
      // console.log(values);
      // resetForm();
    },
  });
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;

  return (
    // <Grid
    //   container
    //   direction='column'
    //   justifyContent='center'
    //   alignItems='center'
    //   marginY={8}
    //   spacing={2}
    //   pb={8}
    // >
        <Card>
          <CardContent>
            <Typography
              variant='h5'
              component='h5'
              align='center'
              fontWeight={500}
              color='primary.main'
              mb={4}
            >
              Tạo tài khoản
            </Typography>
            <Typography variant='body1' component='h6' align='center' color='gray.600' mb={8}>
              Đăng ký tài khoản để sử dụng dịch vụ của chúng tôi
            </Typography>

            <Box component='form' mt={12} p={4} onSubmit={handleSubmit} method='POST'>
              <DropDown
                error={Boolean(errors.role) && touched.role}
                helperText={errors.role}
                id='role'
                name='role'
                label='Quyền người dùng'
                options={ROLE_REGISTER}
                onChange={handleChange}
              />
              <CustomTextField
                name='email'
                id='email'
                label='Email'
                required
                placeholder='Nhập email'
                error={Boolean(errors.email) && touched.email}
                helperText={touched.email && errors.email}
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <CustomTextField
                name='username'
                id='username'
                label='Tên đăng nhập'
                required
                placeholder='Nhập tên đăng nhập'
                error={Boolean(errors.username) && touched.username}
                helperText={touched.username && errors.username}
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <CustomTextField
                name='password'
                id='password'
                label='Mật khẩu'
                type={showPassword ? 'text' : 'password'}
                required
                placeholder='Nhập mật khẩu'
                error={Boolean(errors.password) && touched.password}
                helperText={touched.password && errors.password}
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                      >
                        {showPassword ? (
                      <Icon icon='mdi:eye-outline' />
                    ) : (
                      <Icon icon='mdi:eye-off-outline' />
                    )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Typography
                variant='body1'
                component='p'
                fontSize='12px'
                color='gray.600'
                display='flex'
                justifyItems='center'
              >
                Đăng ký tài khoản, bạn đã đồng ý với{' '}
                <Typography
                  variant='body1'
                  ml={2}
                  component='span'
                  color='primary.main'
                  fontWeight={500}
                  fontSize='12px'
                  sx={{
                    textDecoration: 'underline',
                  }}
                >
                  <Link style={{ color: 'inherit' }} to={APP_ROUTES.USER.REGISTER}>
                    Điều khoản sử dụng
                  </Link>
                </Typography>
              </Typography>
              <Button
                variant='contained'
                type='submit'
                fullWidth
                sx={{
                  bgcolor: 'success.main',
                  mt: 12,
                  '&:hover': {
                    bgcolor: 'success.dark',
                  },
                }}
              >
                Đăng ký
              </Button>
            </Box>
          </CardContent>
        </Card>
      // </Grid>
  );
}
