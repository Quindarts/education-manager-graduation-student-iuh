import { IAuth, IRegister } from '@/types/entities/user';
import { EnumUser } from '@/types/enum';
import * as Yup from 'yup';

export const LoginValidationSchema: Yup.ObjectSchema<IAuth> = Yup.object().shape({
  username: Yup.string().required('Vui lòng nhập tên đăng nhập'),

  password: Yup.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(16, 'Mật khẩu có nhiều nhất 16 ký tự')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!.%*#?&])[A-Za-z\d@$.!%*#?&]{8,}$/,
      'Mật khẩu phải có ít nhất 1 chữ cái, 1 số và 1 ký tự đặc biệt @$!%*#',
    )
    .required('Vui lòng nhập mật khẩu'),
});

export const RegisterValidationSchema: Yup.ObjectSchema<IRegister> = Yup.object()
  .concat(LoginValidationSchema)
  .shape({
    email: Yup.string().email('Vui lòng nhập email hợp lệ').required('Vui lòng nhập email'),
    role: Yup.string().required('Quyền người dùng không được bỏ trống'),
  });

export const checkUser = (value: string) => {
  if (value === EnumUser.LECTURER) return 'Giảng viên';
  if (value === EnumUser.GROUP_LECTURER) return 'Nhóm giảng viên';
  if (value === EnumUser.GROUP_STUDENT) return 'Nhóm sinh viên';
  if (value === EnumUser.ALL) return 'Người dùng hệ thống';
  if (value === EnumUser.STUDENT) return 'Sinh viên';
  return;
};