import { RoleCheck } from "@/types/enum";

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
    DETAILS: "/lecturer/details/:lecturer_id",
  },
  SCORE_STUDENT: {
    ALL: '/score',
    MANAGEMENT: "/score/all"
  },
  STUDENT: {
    ALL: '/student/all',
  },
  GROUP_STUDENT: {

    ALL: '/group-student',
    MANAGEMENT: "/group-student/all",
    DETAIL: '/group-student/detail/:group_id',

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
    ALL: '/group-support',
    MANAGEMENT: "/group-support/all",
    SCORE: '/group-support/score',
    DETAIL_SCORE_GROUP: '/group-support/score/group_student_id'
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
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
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
    icon: 'fa-solid:user-cog',
    text: 'Phân quyền',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
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
    icon: 'mdi:teach-poll',
    text: 'Giảng viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER],
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
    icon: 'mdi:account-student',
    text: 'Sinh viên',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
    link: [APP_ROUTES.STUDENT],
    children: [
      {
        text: 'Danh sách sinh viên',
        link: APP_ROUTES.STUDENT.ALL,
        key: '/all',
      },
    ],
  },
  {
    icon: 'material-symbols:topic',
    text: 'Đề tài',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
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
    icon: 'fluent-mdl2:review-solid',
    text: 'Đánh giá',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
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
    icon: 'healthicons:i-exam-multiple-choice',
    text: 'Chấm điểm',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
    link: [APP_ROUTES.SCORE_STUDENT.ALL],
    children: [
      {
        text: 'Danh sách Chấm điểm',
        link: APP_ROUTES.SCORE_STUDENT.MANAGEMENT,
        key: '/all',
      },
    ],
  },
  {
    icon: 'material-symbols:group',
    text: 'Nhóm sinh viên',
    roles: [RoleCheck.HEAD_LECTURER],
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
    icon: 'fa6-solid:hand-holding-hand',
    text: 'Nhóm hướng dẫn',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER, RoleCheck.SUB_HEAD_LECTURER, RoleCheck.LECTURER],
    link: [APP_ROUTES.GROUP_SUPPORT.ALL],
    children: [
      {
        text: 'Danh sách nhóm sinh viên',
        link: APP_ROUTES.GROUP_SUPPORT.MANAGEMENT,
        key: '/all',
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
