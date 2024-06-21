import { Box, Breadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { Link, matchPath, useLocation, useNavigate, useParams } from 'react-router-dom';
const ROUTE_LABELS: { [key: string]: string } = {
  '/': 'Trang chủ',
  '/terms': 'Quản lý Học kì',
  '/terms/new': 'Thêm Học kì mới',
  '/terms/:termId': 'Chi tiết Học kì',
  '/terms/edit': 'Chỉnh sửa Học kì',

  '/lecturers': 'Quản lý Giảng viên',
  '/lecturers/detail': 'Chi tiết Giảng viên',
  '/scores': 'Quản lý Chấm điểm',

  '/students': 'Quản lý Sinh viên',

  '/group-students': 'Quản lý Nhóm Sinh viên',
  '/group-students/detail': 'Chi tiết nhóm',
  '/group-lecturers': 'Quản lý Nhóm giảng viên',
  '/group-lecturers/details': 'Chi tiết Nhóm giảng viên',
  '/group-lecturers/group-support': 'Hỗ trợ nhóm',
  '/group-lecturers/group-report': 'Phân công Chấm điểm',
  '/group-lecturers/create': 'Tạo nhóm Giảng viên',

  '/topics': 'Quản lý Đề tài',
  '/reviews': 'Quản lý Tiêu chí đánh giá',

  '/group-supports': 'Quản lý Nhóm hướng dẫn',
  '/group-supports/score': 'Điểm Nhóm hướng dẫn',
  '/group-supports/score/group_student_id': 'Chi tiết điểm nhóm',
  '/files': 'Tệp đã tải lên',
  '/users': 'Quản lý người dùng',
  '/users/:userId': 'Chi tiết người dùng',

  '/profile': 'Thông tin cá nhân',
  '/auth/register': 'Đăng ký',
  '/auth/login': 'Đăng nhập',
  '/auth/role': 'Vai trò',
  '/auth/forgot-password': 'Quên mật khẩu',
  '/auth/success': 'Thành công',
  '/404': 'Không tìm thấy',
};

const findBreadcrumbName = (path: string) => {
  for (const route in ROUTE_LABELS) {
    if (matchPath(route, path)) {
      return ROUTE_LABELS[route];
    }
  }
  return null;
};
function BreadCrumbRouting() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const validPaths = pathnames
    .map((value, index) => `/${pathnames.slice(0, index + 1).join('/')}`)
    .filter((path) => ROUTE_LABELS[path]);

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <Link style={{ color: '#0052b1', fontWeight: '600', fontSize: 16 }} to='/'>
        Trang chủ
      </Link>
      {validPaths.map((path, index) => {
        const breadcrumbName = findBreadcrumbName(path);
        return index === validPaths.length - 1 ? (
          <Typography color='grey.500' fontWeight={600} variant='h6' key={path}>
            {breadcrumbName}
          </Typography>
        ) : (
          <Link style={{ color: '#0052b1', fontWeight: '600', fontSize: 16 }} to={path} key={path}>
            {breadcrumbName}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default BreadCrumbRouting;
