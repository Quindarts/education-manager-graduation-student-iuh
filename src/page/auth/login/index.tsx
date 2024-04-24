import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormikHelpers, useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { LoginValidationSchema } from '@/utils/validations/auth.validation';
import { IAuth } from '@/types/auth.type';
import { APP_ROUTES } from '@/utils/app-config';
import CustomTextField from '@/components/ui/CustomTextField';
import { Icon } from '@iconify/react';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  const formik = useFormik<IAuth>({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginValidationSchema,
    onSubmit: (values: IAuth, { resetForm }: FormikHelpers<IAuth>) => {
      // alert(JSON.stringify(values, null, 2));
      resetForm();
      console.log(values);
      // resetForm();
    },
  });

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;

  return (
    <Grid container spacing={2} pb={8}>
      <Grid item xs={12}>
        <Card>
          <CardContent > 
          <Box sx={{display:'flex',flexDirection:'column', alignItems:'center', justifyItems: "center"}}>
          <img
              width={150}
              height={60}
              src='/images/logo-light.png'
              alt='logo_app'
            />
            <Typography
              variant='h5'
              component='h5'
              align='center'
              fontWeight={800}
              color='error.dark'
            >
              
              TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP.HỒ CHÍ MINH
            </Typography>
            <Typography variant='body1' component='h6' mt={4} fontWeight={600} align='center' color={'primary.main'} mb={6}>
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
                    <Typography variant='body1' color='gray'>
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
                    <InputAdornment position='end' >
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                        edge='end'
                        size='small'
                        sx={{
                          '& svg':{
                            color:'text.primary'
                          }
                        }}
                      >
                        {showPassword ? (
                          <Icon icon="mdi:eye-outline" />
                        ) : (
                          <Icon icon="mdi:eye-off-outline" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                variant='contained'
                type='submit'
                fullWidth
                sx={{
                  bgcolor: 'error.main',
                  mt: 12,
                  '&:hover': {
                    bgcolor: 'error.dark',
                  },
                }}
              >
                Đăng nhập
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
