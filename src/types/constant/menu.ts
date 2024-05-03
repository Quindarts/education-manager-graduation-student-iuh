import { AiOutlineCalendar } from 'react-icons/ai';

import { FcCalendar, FcViewDetails, FcManager, FcTodoList, FcPortraitMode, FcNews, FcReading, FcGrid } from 'react-icons/fc';

export const menusAdmin = {
  ADMIN: [
    {
      name: 'Quản lý chuyên ngành',
      image: FcReading,
      url: '/major',
    },
    {
      name: 'Quản lý Giảng Viên',
      image: FcManager,
      url: '/teacher',
    },
  ],
};

const menus = {
  HEAD_LECTURER: [
    {
      name: 'Quản lý Học Kỳ',
      image: FcCalendar,
      url: '/term',
    },
    {
      name: 'Quản lý Giảng Viên',
      image: FcManager,
      url: '/teacher',
    },
    {
      name: 'Quản lý Sinh Viên',
      image: FcPortraitMode,
      url: '/student',
    },
    {
      name: 'Duyệt Đề tài',
      image: FcViewDetails,
      url: '/topic',
    },
    {
      name: 'Quản lý Đánh giá',
      image: FcTodoList,
      url: '/evaluate',
    },
    {
      name: 'Quản lý nhóm sinh viên',
      image: FcPortraitMode,
      url: '/group',
    },
    {
      name: 'Quản lý Nhóm hội đồng',
      image: FcManager,
      url: '/group-lecturer',
    },
  ],

  LECTURER: [
    {
      name: 'Thông tin Học Kỳ',
      image: FcCalendar,
      url: '/term-info',
    },
    {
      name: 'Quản lý Đề tài',
      image: FcViewDetails,
      url: '/management-topic',
    },
    {
      name: 'Quản lý Nhóm hướng dẫn',
      image: FcGrid,
      url: '/group-advisor-of-lecturer',
    },

    {
      name: 'Quản Lý Đánh giá',
      image: FcNews,
      url: '/evaluation-group-of-lecturer',
    },
  ],
};

export default menus;
