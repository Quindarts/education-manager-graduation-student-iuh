import Topic from 'types/entities/topic';
import { EnumGender } from 'types/enum';

export const dummyGroupStudentData = [
  {
    id: 1,
    name: 'Nhóm Sinh viên 1',
    term: {
      id: 101,
    },
    topic: {
      id: 1,
      name: 'Phát triển ứng dụng web',
    },
    status: 'OPEN',
    members: [
      {
        id: 1,
        student: {
          id: 1,
          username: '21089141',
          avatar: '',
          phoneNumber: '0123456789',
          email: 'sinhvien1@example.com',
          name: 'Nguyễn Văn A',
          gender: 'Nam',
          createdAt: '2023-01-01',
          updatedAt: '2024-04-05',
          majors: {
            id: 301,
          },
          typeTraining: 'Regular',
          schoolYear: 'Kỳ học 1 - 2023',
        },
        group: {
          id: 1,
        },
      },
      {
        id: 2,
        student: {
          id: 5,
          username: 'student5',
          email: 'student5@example.com',
          gender: 'Nam',
          name: 'Hoàng Thị E',
          phoneNumber: '0975321648',
          typeTraining: 'Regular',
          createdAt: new Date('2023-09-01'),
          updatedAt: new Date('2024-03-05'),
          schoolYear: 'Kỳ học 1 - 2023',
          majors: {
            id: 1213,
          },
        },
      },
    ],
  },
  {
    id: 2,
    name: 'Nhóm Sinh viên 2',
    term: {
      id: 102,
    },
    topic: {
      id: 2,
      name: 'Xây dựng ứng dụng di động',
    },
    status: 'PEDING',
    members: [
      {
        id: 2,
        student: {
          id: 1002,
          username: '21089142',
          avatar: 'avatar2.jpg',
          phoneNumber: '0987654321',
          email: 'sinhvien2@example.com',
          name: 'Trần Thị B',
          gender: 'Nữ',
          createdAt: '2023-01-02',
          updatedAt: '2024-04-05',
          majors: {
            id: 302,
          },
          typeTraining: 'Đại học',
          schoolYear: 'Kỳ học 1 - 2023',
        },
        group: {
          id: 2,
        },
      },
      // Thêm các thành viên khác của nhóm 2 ở đây nếu cần
    ],
  },
  {
    id: 3,
    name: 'Nhóm Sinh viên 3',
    term: {
      id: 103,
    },
    topic: {
      id: 203,
      name: 'Đề tài 3',
    },
    status: 'Kết thúc',
    members: [
      {
        id: 3,
        student: {
          id: 1003,
          username: 'sinhvien3',
          avatar: 'avatar3.jpg',
          phoneNumber: '0365987412',
          email: 'sinhvien3@example.com',
          name: 'Lê Thị C',
          gender: 'Nữ',
          createdAt: '2023-01-03',
          updatedAt: '2024-04-05',
          majors: {
            id: 303,
          },
          typeTraining: 'Đại học',
          schoolYear: 'Kỳ học 1 - 2023',
        },
        group: {
          id: 3,
        },
      },
      // Thêm các thành viên khác của nhóm 3 ở đây nếu cần
    ],
  },
];

// {
//   id: number;
//   name: string;
//   term: {
//     id: number;
//   };
//   topic: Topic;
//   status: string;
//   members: [
//     {
//       id: number;
//       student: {
//         id: number;
//         username: string;
//         avatar: string;
//         phoneNumber: string;
//         email: string;
//         name: string;
//         gender: string;
//         createdAt: string;
//         updatedAt: string;
//         majors: {
//           id: number;
//         };
//         typeTraining: string;
//         schoolYear: string;
//       };
//       group: {
//         id: number;
//       };
//     },
//   ];
// }
