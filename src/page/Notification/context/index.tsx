export const DROP_ENUM_ROLE_NOTI = [
  {
    _id: 'students',
    name: 'Gửi đến sinh viên',
  },
  // {
  //   _id: 'admin',
  //   name: 'Gửi đến Quản trị viên',
  // },
  {
    _id: 'lecturers',
    name: 'Gửi đến giảng viên',
  },
  // {
  //   _id: 'head_lecturers',
  //   name: 'Gửi đến Chủ nhiệm ngành',
  // },
  // {
  //   _id: 'group_students',
  //   name: 'Gửi đến Nhóm sinh viên',
  // },
  // {
  //   _id: 'group_lecturers',
  //   name: 'Gửi đến Nhóm giảng viên',
  // },
];
export const DROP_ENUM_QUANTITY_NOTI = [
  {
    _id: 'many',
    name: 'Tất cả',
  },
  {
    _id: 'few',
    name: 'Một hoặc nhiều',
  },
];
export const DROP_ENUM_QUANTITY_NOTI_FEW = [
  // {
  //   _id: 'many',
  //   name: 'Tất cả',
  // },
  {
    _id: 'few',
    name: 'Một hoặc nhiều',
  },
];

export const DROP_ENUM_SEARCH_NOTI = [
  {
    _id: 'username',
    name: 'Mã giảng viên',
  },
  {
    _id: 'fullname',
    name: 'Tên giảng viên',
  },
  // {
  //   _id: 'one',
  //   name: 'Duy nhất',
  // },
];

import * as Yup from 'yup';

export const validateSchemaNotify = Yup.object().shape({
  title: Yup.string().min(5, 'Tiêu đề ít nhất 5 ký tự').required('Tiêu đề không được để trống'),
  content: Yup.string().min(5, 'Nội dung ít nhất 5 ký tự').required('Nội dung không được để trống'),
});
