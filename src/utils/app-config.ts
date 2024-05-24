
export const APP_ROUTES = {
  DASHBOARD: '/',
  TERM: {

    ALL: '/terms/all',

    ADD_NEW: '/terms/new',

    term_DETAIL: '/terms/:termId',

    EDIT: '/terms/edit',

  },
  LECTURER: {
    ALL: '/lecturer',
    MANAGEMENT: "/lecturer/all",
    DETAILS: "/lecturer/details",

  },
  STUDENT: {
    ALL: '/student/all',
  },
  GROUP_STUDENT: {

    ALL: '/group-student',
    MANAGEMENT: "/group-student/all",
    DETAIL: '/group-student/detail',

  },
  GROUP_LECTURER: {

    ALL: '/group-lecturer',

    DETAIL: '/group-lecturer/detail/:lecturer_id',

    SUPPORT: '/group-lecturer/group-support',

    ASSEMBLY: '/group-lecturer/group-assembly',

  },
  TOPIC: {

    ALL: "/topic/all",
  },

  REVIEW: {

    ALL: '/review/all',
  },
  GROUP_SUPPORT: {

    ALL: '/group-support/all',

  },
  //file upload
  FILE_UPLOADED: '/files',
  USER: {
    ALL: '/users/all',
    DETAIL: '/users/:userId',
    REGISTER: '/auth/register',
    PROFILE: '/profile',
    LOGIN: '/auth/login',
    ROLE: '/auth/role',
  },
  FORGOT_PASSWORD: '/auth/forgot-password',
  SUCCESS_MESSAGE: '/auth/success',
  NOT_FOUND: '/404',

};

export const APP_SIDEBAR = [
  {
    text: 'Trang chính',
    icon: 'flat-color-icons:home',
    link: APP_ROUTES.DASHBOARD,
    roles: ['admin', 'owner', 'mod', 'warehouse'],
    key: '/',
  },
  {
    icon: 'emojione:blue-book',
    text: 'Học kì',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.TERM.ALL],
    children: [
      {
        text: 'Danh sách học kì',
        link: APP_ROUTES.TERM.ALL,
        key: '/all',
      },
    ],
  },
  {
    icon: 'ri:account-circle-line',
    text: 'Phân quyền',
    roles: ['owner', 'admin'],
    link: [APP_ROUTES.USER.ALL, APP_ROUTES.USER.DETAIL],
    children: [
      {
        text: 'Tất cả tài khoản',
        link: APP_ROUTES.USER.ALL,
        key: '/all',
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
    icon: 'noto:teacher',
    text: 'Giảng viên',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.LECTURER.ALL],
    children: [
      {
        text: 'Danh sách giảng viên',
        link: APP_ROUTES.LECTURER.MANAGEMENT,
        key: APP_ROUTES.LECTURER.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'fluent-emoji:woman-student',
    text: 'Sinh viên',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.STUDENT.ALL],
    children: [
      {
        text: 'Danh sách sinh viên',
        link: APP_ROUTES.STUDENT.ALL,
        key: '/all',
      },
    ],
  },
  {
    icon: 'flat-color-icons:folder',
    text: 'Đề tài',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.TOPIC],
    children: [
      {
        text: 'Danh sách đề tài',
        link: APP_ROUTES.TOPIC.ALL,
        key: '/all',
      },
    ],
  },
  {
    icon: 'flat-color-icons:rating',
    text: 'Đánh giá',
    roles: ['admin', 'owner', 'mod'],
    link: APP_ROUTES.REVIEW,
    key: '/review',
    children: [
      {
        text: 'Danh sách',
        link: APP_ROUTES.REVIEW.ALL,
        key: '/all',
      },
    ],
  },
  {
    icon: 'twemoji:family',
    text: 'Nhóm sinh viên',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.GROUP_STUDENT.ALL],
    children: [
      {
        text: 'Danh sách nhóm quản lý',
        link: APP_ROUTES.GROUP_STUDENT.MANAGEMENT,
        key: '/all',
      },
    ],
  },
  {
    icon: 'noto-v1:man-teacher-medium-light-skin-tone',
    text: 'Nhóm hướng dẫn',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.GROUP_SUPPORT.ALL],
    children: [
      {
        text: 'Danh sách',
        link: APP_ROUTES.GROUP_SUPPORT.ALL,
        key: '/all',
      },
    ],
  },
  {
    icon: 'emojione:family-man-woman-girl-girl',
    text: 'Nhóm giảng viên',
    roles: ['admin', 'owner', 'mod'],
    link: [APP_ROUTES.GROUP_LECTURER.ALL],
    children: [
      {
        text: 'Nhóm chấm Hội đồng',
        link: APP_ROUTES.GROUP_LECTURER.ASSEMBLY,
        key: APP_ROUTES.GROUP_LECTURER.ASSEMBLY,
      }
    ],
  },
];

export const APP_PROFILE_MENU = [
  {
    text: 'Thông tin cá nhân',
    icon: 'mdi:account-circle',
    link: '#',
  },
  {
    text: 'Đăng xuất',
    icon: 'ri:logout-box-r-line',
    link: '/auth/login',
  },
];

export const renderType = {
  ALL: 'all',
  FILTER: 'filter',
  SEARCH: 'search',
};
