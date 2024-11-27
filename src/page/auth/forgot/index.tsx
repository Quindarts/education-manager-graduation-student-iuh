import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomTextField from '@/components/ui/CustomTextField';
import { CircularProgress } from '@mui/material';
import { useAuth } from '@/hooks/api/useAuth';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const ForgotValidationSchema = Yup.object({
  username: Yup.string()
    .matches(/^\d{6,}$/, 'Mã giảng viên chỉ gồm chữ số và lớn hơn 6 ký tự')
    .required('Mã giảng viên không được để trống'),
});

function ForgotPassword() {
  const { onForgotPassword } = useAuth();
  const { mutate: forgotPass, isLoading } = onForgotPassword();

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: ForgotValidationSchema,
    onSubmit: (values: { username: string }) => {
      forgotPass(values.username);
    },
  });

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} pb={8}>
      <Grid item xs={12}>
        <Card sx={{bgcolor:'grey.50'}}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
              }}
            >
              <img width={150} height={60} src='/images/logo-light.webp' alt='logo_app' />
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
                variant='h3'
                mt={4}
                fontWeight={600}
                align='center'
                color={'grey.700'}
                mb={2}
                textTransform={'uppercase'}
              >
                Quên Mật Khẩu
              </Typography>
            </Box>
            <Box component='form' onSubmit={handleSubmit} mt={4} p={4} method='POST'>
              <CustomTextField
                label='Nhập vào mã giảng viên'
                error={Boolean(errors.username) && touched.username}
                helperText={touched.username && errors.username}
                value={values.username}
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder='01xxxxx'
                id='username'
                name='username'
              />
              <Button sx={{ mt: 6 }} variant='contained' type='submit' fullWidth color='primary'>
                Quên mật khẩu
                {isLoading && (
                  <CircularProgress
                    size={'small'}
                    sx={{ mx: 4, color: 'white', width: 20, height: 20 }}
                  />
                )}
              </Button>
              <Typography my={2} textAlign={'center'} variant='body1' color='grey.600'>
                Hoặc
              </Typography>
              <Typography
                variant='body1'
                onClick={() => navigate('/auth/login')}
                sx={{
                  '&:hover': {
                    color: 'primary.dark',
                    cursor: 'pointer',
                  },
                  fontWeight: 'bold',
                }}
                color='primary'
                textTransform={'uppercase'}
                textAlign={'center'}
              >
                Đăng Nhập
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ForgotPassword;
