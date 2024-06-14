import { RoleCheck } from "@/types/enum";

export const APP_ROUTES = {
  DASHBOARD: '/',
  TERM: {
    MANAGEMENT: '/terms',
    ADD_NEW: '/terms/new',
    term_DETAIL: '/terms/:termId',
    EDIT: '/terms/edit',
  },
  ROLE: {
    ALL: '/auth/role'
  },
  LECTURER: {
    MANAGEMENT: "/lecturers",
    DETAILS: "/lecturers/detail/:lecturer_id",
  },
  SCORE_STUDENT: {
    MANAGEMENT: "/scores"
  },
  STUDENT: {
    MANAGEMENT: '/students',
  },
  GROUP_STUDENT: {
    MANAGEMENT: "/group-students",
    DETAIL: '/group-students/detail/:group_id',
  },
  GROUP_LECTURER: {
    MANAGEMENT: '/group-lecturers',
    DETAIL: '/group-lecturers/detail/:lecturer_id',
    SUPPORT: '/group-lecturers/group-support',
    REPORT: '/group-lecturers/group-report',
    CREATE: '/group-lecturers/create',
    ME: "/my-group-lecturers",
  },
  TOPIC: {
    MANAGEMENT: "/topics",
    LECTURER: '/topic-lecturers'
  },
  REVIEW: {
    MANAGEMENT: '/reviews',
  },
  GROUP_SUPPORT: {
    MANAGEMENT: "/group-supports",
    SCORE: '/group-supports/score',
    DETAIL_SCORE_GROUP: '/group-supports/score/group_student_id'
  },
  FILE_UPLOADED: '/files',
  USER: {
    MANAGEMENT: '/users',
    DETAIL: '/users/:userId',
    REGISTER: '/auth/register',
    PROFILE: '/profile',
    LOGIN: '/auth/login',
    ROLE: '/',
  },
  FORGOT_PASSWORD: '/auth/forgot-password',
  SUCCESS_MESSAGE: '/auth/success',
  NOT_FOUND: '/404',

};
export interface ItemAppSiderbarType {
  text: string,
  icon: string,
  link: string,
  roles?: [],
  key: string,
}
export interface AppSiderBarType {
  text: string,
  icon?: string,
  link: string,
  roles: [],
  key: string,
  children?: ItemAppSiderbarType[]
}
export const APP_SIDEBAR = [
  {
    text: 'Trang chính',
    icon: 'ic:baseline-home',
    link: APP_ROUTES.DASHBOARD,
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
    key: '/',
  },
  {
    icon: 'mage:book-fill',
    text: 'Học kì',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER],
    link: [APP_ROUTES.TERM.MANAGEMENT],
    key: '/terms',
    children: [
      {
        text: 'Danh sách học kì',
        link: APP_ROUTES.TERM.MANAGEMENT,
        key: '/MANAGEMENT',
      },
    ],
  },
  {
    icon: 'fa-solid:user-cog',
    text: 'Phân quyền',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
    link: [APP_ROUTES.USER.MANAGEMENT, APP_ROUTES.USER.DETAIL],
    children: [
      {
        text: 'Tất cả tài khoản',
        link: APP_ROUTES.USER.MANAGEMENT,
        key: '/MANAGEMENT',
      },
      {
        text: 'Đăng ký người dùng',
        link: APP_ROUTES.USER.REGISTER,
        key: '/auth/register',
      },
      {
        text: 'Quản lý quyền hạn',
        link: APP_ROUTES.USER.ROLE,
        key: '/auth/role',
      },
    ],
  },
  {
    icon: 'mdi:teach-poll',
    text: 'Giảng viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER],
    link: [APP_ROUTES.LECTURER.MANAGEMENT],
    children: [
      {
        text: 'Danh sách giảng viên',
        link: APP_ROUTES.LECTURER.MANAGEMENT,
        key: APP_ROUTES.LECTURER.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'mdi:account-student',
    text: 'Sinh viên',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
    link: [APP_ROUTES.STUDENT],
    children: [
      {
        text: 'Danh sách sinh viên',
        link: APP_ROUTES.STUDENT.MANAGEMENT,
        key: '/MANAGEMENT',
      },
    ],
  },
  {
    icon: 'material-symbols:topic',
    text: 'Đề tài',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER],
    link: [APP_ROUTES.TOPIC],
    children: [
      {
        text: 'Danh sách đề tài',
        link: APP_ROUTES.TOPIC.MANAGEMENT,
        key: '/MANAGEMENT',
      },
    ],
  },
  {
    icon: 'material-symbols:topic',
    text: 'Đề tài của tôi',
    roles: [RoleCheck.LECTURER],
    link: [APP_ROUTES.TOPIC.LECTURER],
    children: [
      {
        text: 'Danh sách đề tài của tôi',
        link: APP_ROUTES.TOPIC.LECTURER,
        key: APP_ROUTES.TOPIC.LECTURER,
      },
    ],
  },
  {
    icon: 'fluent-mdl2:review-solid',
    text: 'Đánh giá',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
    link: APP_ROUTES.REVIEW,
    key: '/review',
    children: [
      {
        text: 'Danh sách',
        link: APP_ROUTES.REVIEW.MANAGEMENT,
        key: '/MANAGEMENT',
      },
    ],
  },
  {
    icon: 'healthicons:i-exam-multiple-choice',
    text: 'Chấm điểm',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
    link: [APP_ROUTES.SCORE_STUDENT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách Chấm điểm',
        link: APP_ROUTES.SCORE_STUDENT.MANAGEMENT,
        key: '/MANAGEMENT',
      },
    ],
  },
  {
    icon: 'material-symbols:group',
    text: 'Nhóm sinh viên',
    roles: [RoleCheck.HEAD_LECTURER],
    link: [APP_ROUTES.GROUP_STUDENT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách nhóm quản lý',
        link: APP_ROUTES.GROUP_STUDENT.MANAGEMENT,
        key: '/MANAGEMENT',
      },
    ],
  },
  {
    icon: 'fa6-solid:hand-holding-hand',
    text: 'Nhóm hướng dẫn',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
    link: [APP_ROUTES.GROUP_SUPPORT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách nhóm sinh viên',
        link: APP_ROUTES.GROUP_SUPPORT.MANAGEMENT,
        key: '/MANAGEMENT',
      },
      {
        text: 'Chấm điểm hướng dẫn',
        link: APP_ROUTES.GROUP_SUPPORT.SCORE,
        key: '/score',
      },
    ],
  },
  {
    icon: 'typcn:group',
    text: 'Nhóm giảng viên',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER],
    link: [APP_ROUTES.GROUP_LECTURER.MANAGEMENT],
    children: [
      {
        text: 'Phân công chấm điểm',
        link: APP_ROUTES.GROUP_LECTURER.REPORT,
        key: APP_ROUTES.GROUP_LECTURER.REPORT,
      },
      {
        text: 'Tạo nhóm chấm',
        link: APP_ROUTES.GROUP_LECTURER.CREATE,
        key: APP_ROUTES.GROUP_LECTURER.CREATE,
      }
    ],
  },
  {
    icon: 'typcn:group',
    text: 'Nhóm giảng viên của tôi',
    roles: [RoleCheck.LECTURER],
    link: [APP_ROUTES.GROUP_LECTURER.ME],
    children: [
      {
        text: 'Danh sách nhóm',
        link: APP_ROUTES.GROUP_LECTURER.ME,
        key: APP_ROUTES.GROUP_LECTURER.ME,
      },
    ],
  },
];

export const APP_PROFILE_MENU = [
  {
    text: 'Thông tin cá nhân',
    icon: 'mdi:account-circle',
    link: '/profile',
  },
  {
    text: 'Đăng xuất',
    icon: 'ri:logout-box-r-line',
    link: '/auth/login',
  },
];

export const renderType = {
  MANAGEMENT: 'MANAGEMENT',
  FILTER: 'filter',
  SEARCH: 'search',
};
