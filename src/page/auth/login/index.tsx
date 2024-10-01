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
import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';
import { useAuth } from '@/hooks/api/useAuth';
import { CircularProgress, Link } from '@mui/material';
import { IAuth } from '@/types/entities/user';

export default function Login() {
  const { handleLogin } = useAuth();
  const { mutate: mutateLogin, isLoading } = handleLogin();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const formik = useFormik<IAuth>({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values: IAuth, {}: FormikHelpers<IAuth>) => {
      mutateLogin(values);
    },
  });

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;
  return (
    <Grid container spacing={2} pb={8}>
      <Grid item xs={12}>
        <Card sx={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
                px: 10,
                pt: 14,
              }}
            >
              <img width={150} height={60} src='/images/logo-light.png' alt='logo_app' />
              <Typography
                mt={10}
                variant='h4'
                align='center'
                lineHeight={1.6}
                fontWeight={600}
                color='error.dark'
              >
                TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH
              </Typography>
              <Typography
                variant='h6'
                mt={4}
                fontWeight={600}
                align='center'
                color={'primary.dark'}
                mb={6}
              >
                Đăng nhập vào trang quản lý khóa luận
              </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit} mt={8} pb={20} px={4} method='POST'>
              <CustomTextField
                label='Tên đăng nhập'
                error={Boolean(errors.username) && touched.username}
                helperText={touched.username && errors.username}
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='Nhập tên đăng nhập'
                required
                // size='medium'
                id='username'
                name='username'
              />
              <CustomTextField
                label='Mật khẩu'
                required
                // size='medium'
                error={Boolean(errors.password) && touched.password}
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
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
              <Box textAlign={'end'}>
                <Link sx={{ cursor: 'pointer' }}>Quên mật khẩu?</Link>
              </Box>
              <Button
                variant='contained'
                type='submit'
                size='large'
                sx={{ mt: 10 }}
                fullWidth
                color='primary'
              >
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
