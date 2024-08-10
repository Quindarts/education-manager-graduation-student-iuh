import { RoleCheck } from "@/types/enum";

export const APP_ROUTES = {
  DASHBOARD: '/',
  GUIDE: '/user-guide',
  TOOL: '/tool',
  MAJOR: {
    MANAGEMENT: '/majors',
    CREATE: '/majors/create',
    EDIT: '/majors/edit',
  },
  TERM: {
    MANAGEMENT: '/terms',
    ADD_NEW: '/terms/new',
    term_DETAIL: '/terms/:termId',
    EDIT: '/terms/edit',
  },
  ROLE: {
    ALL: '/auth/role',
  },
  LECTURER: {
    MANAGEMENT: "/lecturers",
    DETAILS: "/lecturers/detail/:lecturer_id",
  },
  LECTURER_TERM: {
    MANAGEMENT: "/lecturer-terms",
    DETAILS: "/lecturer-terms/detail/:lecturer_id"
  },
  NOTIFICATION: {
    MANAGEMENT: "/notifications",
    DETAILS: "/notifications/:id",
    CREATE: "/notifications/create",
  },
  SCORE_STUDENT: {
    MANAGEMENT: "/scores"
  },
  STUDENT: {
    MANAGEMENT: '/students/query',
  },
  GROUP_STUDENT: {
    MANAGEMENT: "/group-students",
    DETAIL: '/group-students/detail/:group_id',
  },
  GROUP_LECTURER: {
    MANAGEMENT: '/group-lecturers',
    DETAIL: '/group-lecturers/details/:id',
    SUPPORT: '/group-lecturers/group-support',
    REPORT: '/group-lecturers/group-report',
    CREATE: '/group-lecturers/create',
    ME: "/my-group-lecturers",
    MY_DETAIL_GROUP: "/my-group-lecturers/detail/:groupLecturerId",
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
    DETAIL: '/group-supports/detail/:group_id',
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
    UPDATE_PASS: '/profile/update-password',
    FORGOT: '/auth/forgot-password'
  },
  USER_AUTHORIZATION: {
    MANAGEMENT: "/authorizations",
    UPDATE_ROLE: "/authorizations/change",
    DETAIL: '/authorizations/lecturer'
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
    roles: [RoleCheck.HEAD_COURSE, RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN, RoleCheck.LECTURER],
    key: '/',
  },
  {
    text: 'Chuyên Ngành',
    icon: 'simple-icons:gitbook',
    link: [APP_ROUTES.MAJOR.MANAGEMENT],
    roles: [RoleCheck.ADMIN],
    children: [
      {
        text: 'Danh sách chuyên ngành',
        link: APP_ROUTES.MAJOR.MANAGEMENT,
        key: APP_ROUTES.MAJOR.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'mage:book-fill',
    text: 'Học kì',
    roles: [RoleCheck.HEAD_COURSE, RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN],
    link: [APP_ROUTES.TERM.MANAGEMENT],
    key: '/terms',
    children: [
      {
        text: 'Danh sách học kì',
        link: APP_ROUTES.TERM.MANAGEMENT,
        key: APP_ROUTES.TERM.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'fluent-mdl2:permissions',
    text: 'Phân quyền',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
    link: [APP_ROUTES.USER_AUTHORIZATION.MANAGEMENT],
    children: [
      {
        text: 'Danh sách người dùng',
        link: APP_ROUTES.USER_AUTHORIZATION.MANAGEMENT,
        key: APP_ROUTES.USER_AUTHORIZATION.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'mdi:teach-poll',
    text: 'Giảng viên ',
    roles: [RoleCheck.HEAD_LECTURER],
    link: [APP_ROUTES.LECTURER.MANAGEMENT],
    children: [
      {
        text: 'Danh sách GV chuyên ngành',
        link: APP_ROUTES.LECTURER.MANAGEMENT,
        key: APP_ROUTES.LECTURER.MANAGEMENT,
        roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
      },
      {
        text: 'Danh sách GV hướng dẫn',
        link: APP_ROUTES.LECTURER_TERM.MANAGEMENT,
        key: APP_ROUTES.LECTURER_TERM.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'mdi:teach-poll',
    text: 'Giảng viên Hướng dẫn',
    roles: [RoleCheck.HEAD_COURSE],
    link: APP_ROUTES.LECTURER_TERM.MANAGEMENT,
  },
  {
    icon: 'mdi:teach-poll',
    text: 'Giảng viên Chuyên ngành',
    roles: [RoleCheck.ADMIN],
    link: APP_ROUTES.LECTURER.MANAGEMENT,
  },
  {
    icon: 'mdi:account-student',
    text: 'Sinh viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN, RoleCheck.HEAD_COURSE],
    link: [APP_ROUTES.STUDENT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách sinh viên',
        link: APP_ROUTES.STUDENT.MANAGEMENT,
        key: APP_ROUTES.STUDENT.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'material-symbols:topic',
    text: 'Đề tài',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE],
    link: [APP_ROUTES.TOPIC.MANAGEMENT],
    children: [
      {
        text: 'Danh sách đề tài',
        link: APP_ROUTES.TOPIC.MANAGEMENT,
        key: APP_ROUTES.TOPIC.MANAGEMENT,
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
    text: 'Tiêu chí Đánh giá',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.LECTURER, RoleCheck.HEAD_COURSE],
    link: APP_ROUTES.REVIEW.MANAGEMENT,
    key: '/review',
    children: [
      {
        text: 'Danh sách',
        link: APP_ROUTES.REVIEW.MANAGEMENT,
        key: APP_ROUTES.REVIEW.MANAGEMENT,

      },
    ],
  },
  {
    icon: 'icon-park-outline:message',
    text: 'Thông báo',
    roles: [RoleCheck.HEAD_LECTURER],
    link: [APP_ROUTES.NOTIFICATION.MANAGEMENT],
    children: [
      {
        text: 'Danh sách Thông báo',
        link: APP_ROUTES.NOTIFICATION.MANAGEMENT,
        key: APP_ROUTES.NOTIFICATION.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'healthicons:i-exam-multiple-choice',
    text: 'Chấm điểm',
    roles: [RoleCheck.LECTURER],
    link: [APP_ROUTES.SCORE_STUDENT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách Chấm điểm',
        link: APP_ROUTES.SCORE_STUDENT.MANAGEMENT,
        key: APP_ROUTES.SCORE_STUDENT.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'material-symbols:group',
    text: 'Nhóm sinh viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE],
    link: [APP_ROUTES.GROUP_STUDENT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách nhóm quản lý',
        link: APP_ROUTES.GROUP_STUDENT.MANAGEMENT,
        key: APP_ROUTES.GROUP_STUDENT.MANAGEMENT,
      },
    ],
  },
  {
    icon: 'fa6-solid:hand-holding-hand',
    text: 'Nhóm hướng dẫn',
    roles: [RoleCheck.LECTURER],
    link: [APP_ROUTES.GROUP_SUPPORT.MANAGEMENT],
    children: [
      {
        text: 'Danh sách nhóm sinh viên',
        link: APP_ROUTES.GROUP_SUPPORT.MANAGEMENT,
        key: APP_ROUTES.GROUP_SUPPORT.MANAGEMENT,
      },
      {
        text: 'Chấm điểm hướng dẫn',
        link: APP_ROUTES.GROUP_SUPPORT.SCORE,
        key: APP_ROUTES.GROUP_SUPPORT.SCORE,
      },
    ],
  },
  {
    icon: 'typcn:group',
    text: 'Nhóm giảng viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE],
    link: [APP_ROUTES.GROUP_LECTURER.MANAGEMENT],
    children: [
      {
        text: 'Danh sách nhóm',
        link: APP_ROUTES.GROUP_LECTURER.MANAGEMENT,
        key: APP_ROUTES.GROUP_LECTURER.MANAGEMENT,
      },
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
    text: 'Nhóm chấm điểm',
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
    text: 'Thay đổi vai trò',
    icon: 'hugeicons:user-switch',
    link: '/auth/role',
  },
  {
    text: 'Hướng dẫn sử dụng',
    icon: 'ic:baseline-help',
    link: '/user-guide',
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
