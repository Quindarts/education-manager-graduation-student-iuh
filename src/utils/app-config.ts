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
    DETAILS: "/lecturer-terms/detail/:id"
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
  ANALYSIS: {
    MANAGEMENT: '/analysis',
    DETAILS: '/analysis/detail/:id',
  },
  EVENT: {
    MANAGEMENT: '/events',
    DETAILS: '/events/:id',
  },
  ARTICLE: {
    MANAGEMENT: '/articles',
    DETAILS: '/articles/:id',
  },
  FINAL_REPORT: {
    MANAGEMENT: '/final-reports',
    DETAILS: '/final-reports/:id',
  },
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
    text: 'Bảng điều khiển',
    icon: 'bi:calendar-event',
    link: APP_ROUTES.DASHBOARD,
    roles: [RoleCheck.HEAD_COURSE, RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN, RoleCheck.LECTURER],
    key: APP_ROUTES.DASHBOARD,
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
    icon: 'fluent-mdl2:date-time-12',
    text: 'Học kì',
    roles: [RoleCheck.HEAD_COURSE, RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN],
    link: APP_ROUTES.TERM.MANAGEMENT,
    key: '/terms',

  },

  {
    icon: 'mingcute:paper-line',
    text: 'Đề tài',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE, RoleCheck.ADMIN],
    link: APP_ROUTES.TOPIC.MANAGEMENT,
  },
  {
    icon: 'ph:article-ny-times',
    text: 'Quản lý bài báo',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE, RoleCheck.LECTURER, RoleCheck.ADMIN],
    link: APP_ROUTES.ARTICLE.MANAGEMENT
  },
  {
    icon: 'file-icons:readthedocs',
    text: 'Quản lý báo cáo cuối kỳ',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE, RoleCheck.LECTURER, RoleCheck.ADMIN],
    link: APP_ROUTES.FINAL_REPORT.MANAGEMENT
  },
  {
    icon: 'fluent-mdl2:learning-tools',
    text: 'Giảng viên ',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN],
    link: [APP_ROUTES.LECTURER.MANAGEMENT],
    children: [
      {
        text: 'Danh sách GV hướng dẫn',
        link: APP_ROUTES.LECTURER_TERM.MANAGEMENT,
        key: APP_ROUTES.LECTURER_TERM.MANAGEMENT,
      },
      {
        text: 'Danh sách GV chuyên ngành',
        link: APP_ROUTES.LECTURER.MANAGEMENT,
        key: APP_ROUTES.LECTURER.MANAGEMENT,
        roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
      },

    ],
  },
  {
    icon: 'fluent-mdl2:learning-tools',
    text: 'Giảng viên Hướng dẫn',
    roles: [RoleCheck.HEAD_COURSE],
    link: APP_ROUTES.LECTURER_TERM.MANAGEMENT,
  },

  {
    icon: 'typcn:group',
    text: 'Nhóm giảng viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE, RoleCheck.ADMIN],
    link: APP_ROUTES.GROUP_LECTURER.MANAGEMENT,
  },
  {
    icon: 'mdi:account-student',
    text: 'Sinh viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN, RoleCheck.HEAD_COURSE],
    link: APP_ROUTES.STUDENT.MANAGEMENT

  },
  {
    icon: 'material-symbols:group',
    text: 'Nhóm sinh viên',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.HEAD_COURSE, RoleCheck.ADMIN],
    link: APP_ROUTES.GROUP_STUDENT.MANAGEMENT,

  },

  {
    icon: 'mingcute:paper-line',
    text: 'Đề tài của tôi',
    roles: [RoleCheck.LECTURER],
    link: APP_ROUTES.TOPIC.LECTURER,
  },
  {
    icon: 'lsicon:tree-filled',
    text: 'Nhóm sinh viên hướng dẫn',
    roles: [RoleCheck.LECTURER],
    link: APP_ROUTES.GROUP_SUPPORT.MANAGEMENT,
  },
  {
    icon: 'typcn:group',
    text: 'Nhóm giảng viên của tôi',
    roles: [RoleCheck.LECTURER],
    link: APP_ROUTES.GROUP_LECTURER.ME,
  },
  {
    icon: 'simple-line-icons:docs',
    text: 'Tiêu chí Đánh giá',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.LECTURER, RoleCheck.HEAD_COURSE, RoleCheck.ADMIN],
    link: APP_ROUTES.REVIEW.MANAGEMENT,
    key: APP_ROUTES.REVIEW.MANAGEMENT,
  },
  {
    icon: 'icon-park-outline:message',
    text: 'Thông báo',
    roles: [RoleCheck.HEAD_LECTURER, RoleCheck.ADMIN, RoleCheck.HEAD_COURSE],
    link: [APP_ROUTES.NOTIFICATION.MANAGEMENT],
    children: [
      {
        text: 'Danh sách Thông báo',
        link: APP_ROUTES.NOTIFICATION.MANAGEMENT,
        key: APP_ROUTES.NOTIFICATION.MANAGEMENT,
      },
      {
        text: 'Tạo Thông báo',
        link: APP_ROUTES.NOTIFICATION.CREATE,
        key: APP_ROUTES.NOTIFICATION.CREATE,
      },
    ],
  },
  {
    icon: 'healthicons:i-exam-multiple-choice',
    text: 'Chấm điểm',
    roles: [RoleCheck.LECTURER],
    link: APP_ROUTES.SCORE_STUDENT.MANAGEMENT,
  },

  {
    icon: 'material-symbols:settings',
    text: 'Phân quyền',
    roles: [RoleCheck.ADMIN, RoleCheck.HEAD_LECTURER],
    link: APP_ROUTES.USER_AUTHORIZATION.MANAGEMENT,
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
