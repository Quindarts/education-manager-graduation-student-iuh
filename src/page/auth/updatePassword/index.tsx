import CustomTextField from '@/components/ui/CustomTextField';
import TitleManager from '@/components/ui/Title';
import { useAuth } from '@/hooks/api/useAuth';
import { Icon } from '@iconify/react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

const UpdatePassValidationSchema = Yup.object({
  password: Yup.string()
    .min(8, 'Mật khẩu chứa ít nhất 8 ký tự')
    .required('Mật khẩu không được để trống'),
  newPassword: Yup.string()
    .min(8, ' Mật khẩu mới chứa ít nhất 8 ký tự')
    .required('Mật khẩu mới không được để trống'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Không trùng với mật khẩu mới')
    .required('Nhập lại mật khẩu không được để trống'),
});

function UpdatePassword() {
  const { onUpdatePassword } = useAuth();
  const { mutate: onUpdate, isLoading } = onUpdatePassword();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmNewPassword: '',
      newPassword: '',
    },
    validationSchema: UpdatePassValidationSchema,
    onSubmit: (values) => {
      const data = {
        password: values.password,
        newPassword: values.newPassword,
      };
      onUpdate(data);
    },
  });

  //pass
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show: boolean) => !show);

  //new pass
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleClickShowNewPassword = () => setShowNewPassword((show: boolean) => !show);

  //confirm pass
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show: boolean) => !show);

  const { values, handleChange, handleBlur, errors, touched, handleSubmit } = formik;
  return (
    <Box>
      <Card sx={{ width: 600, m: 'auto', my: 20, boxShadow:'0px 0px 0px white' }}>
        <CardContent>
          <TitleManager icon='solar:key-bold' color='grey.700' textTransform={'uppercase'}>
            {' '}
            Cập nhật mật khẩu
          </TitleManager>
          <Box component='form' onSubmit={handleSubmit} mt={8} p={4} method='POST'>
            <CustomTextField
              label='Mật khẩu cũ'
              error={Boolean(errors.password) && touched.password}
              helperText={touched.password && errors.password}
              value={values.password}
              required
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder='Nhập Mật khẩu cũ'
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
            <CustomTextField
              label='Mật khẩu mới'
              error={Boolean(errors.newPassword) && touched.newPassword}
              helperText={touched.newPassword && errors.newPassword}
              onBlur={handleBlur}
              required
              onChange={handleChange}
              placeholder='Nhập Mật khẩu mới'
              id='newPassword'
              name='newPassword'
              type={showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowNewPassword}
                      edge='end'
                      size='small'
                      sx={{
                        '& svg': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      {showNewPassword ? (
                        <Icon icon='mdi:eye-outline' />
                      ) : (
                        <Icon icon='mdi:eye-off-outline' />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <CustomTextField
              label='Nhập lại Mật khẩu mới'
              error={Boolean(errors.confirmNewPassword) && touched.confirmNewPassword}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
              onBlur={handleBlur}
              required
              onChange={handleChange}
              placeholder='Nhập lại Mật khẩu mới'
              id='confirmNewPassword'
              name='confirmNewPassword'
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowConfirmPassword}
                      edge='end'
                      size='small'
                      sx={{
                        '& svg': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      {showConfirmPassword ? (
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
              Cập nhật mật khẩu
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
    </Box>
  );
}

export default UpdatePassword;
