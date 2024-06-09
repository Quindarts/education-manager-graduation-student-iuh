import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { FormikHelpers, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { IAuth } from '@/types/auth.type';
import { APP_ROUTES } from '@/utils/app-config';
import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';
import { EnumGender, RoleCheck } from '@/types/enum';
import { useAuth } from '@/hooks/api/useAuth';
import { CircularProgress } from '@mui/material';

interface IAuthResponseData {
  accessToken: string;
  lecturer: {
    avatar?: string;
    degree: string;
    email: string;
    fullName: string;
    gender?: EnumGender;
    id?: string;
    isAdmin: false;
    major_id: 1;
    phone: string;
    role: RoleCheck;
    username: string;
  };
}
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);
  const { handleLogin } = useAuth();
  const { mutate: mutateLogin, isLoading } = handleLogin();

  const formik = useFormik<IAuth>({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values: IAuth, { resetForm }: FormikHelpers<IAuth>) => {
      mutateLogin(values);
    },
  });
  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;

  return (
    <Grid container spacing={2} pb={8}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <img width={150} height={60} src='/images/logo-light.png' alt='logo_app' />
              <Typography
                mt={10}
                variant='h3'
                align='center'
                lineHeight={1.6}
                fontWeight={700}
                color='error.dark'
              >
                TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH
              </Typography>
              <Typography
                variant='h5'
                mt={4}
                fontWeight={600}
                align='center'
                color={'primary.main'}
                mb={6}
              >
                Đăng nhập vào trang quản lý khóa luận
              </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit} mt={8} p={4} method='POST'>
              <CustomTextField
                label='Tên đăng nhập'
                error={Boolean(errors.username) && touched.username}
                helperText={touched.username && errors.username}
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                required
                placeholder='Nhập tên đăng nhập'
                id='username'
                name='username'
              />
              <CustomTextField
                label={
                  <Box
                    component='span'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    Mật khẩu
                    <Typography variant='body2' color='gray'>
                      <Link
                        style={{
                          color: 'inherit',
                        }}
                        to={APP_ROUTES.FORGOT_PASSWORD}
                      >
                        Quên mật khẩu?
                      </Link>
                    </Typography>
                  </Box>
                }
                error={Boolean(errors.password) && touched.password}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                required
                placeholder='Nhập mật khẩu'
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                        size='small'
                        sx={{
                          '& svg': {
                            color: 'text.primary',
                          },
                        }}
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
              <Button variant='contained' type='submit' fullWidth color='primary'>
                Đăng nhập
                {isLoading && (
                  <CircularProgress
                    size={'small'}
                    sx={{ mx: 4, color: 'white', width: 20, height: 20 }}
                  />
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
