import { TypeEvalution } from 'types/entities/assign';
import { EnumGender, EnumRole } from 'types/enum';

export const dummyGroupLecturer = [
  {
    id: 1,
    name: 'Nhóm Giảng viên 1',
    type: TypeEvalution.ADVISOR,
    members: [
      {
        id: 1,
        lecturer: {
          // id: 101,
          // name: 'Nguyễn Văn A',
          // expertise: "Khoa học máy tính",
          id: 1,
          username: 'teacher1',
          avatar: 'avatar1.jpg',
          name: 'Nguyễn Văn A',
          email: 'teacher1@example.com',
          phoneNumber: '0123456789',
          gender: EnumGender.MALE,
          role: EnumRole.LECTURER,
          degree: 'MASTERS',
        },
        groupLecturer: 1,
      },
    ],
  },
  {
    id: 2,
    name: 'Nhóm Giảng viên 2',
    type: TypeEvalution.ADVISOR,
    members: [
      {
        id: 2,
        lecturer: {
          // id: 2,
          // name: 'Trần Thị B',
          // expertise: "Kỹ Thuật Phần mềm",
          id: 2,
          username: 'teacher2',
          avatar: 'avatar2.jpg',
          name: 'Trần Thị B',
          email: 'teacher2@example.com',
          phoneNumber: '0987654321',
          gender: EnumGender.FEMALE,
          role: EnumRole.LECTURER,
          degree: 'DOCTER',
        },
        groupLecturer: 2,
      },
      // Thêm các thành viên khác của nhóm 2 ở đây nếu cần
    ],
  },
  {
    id: 3,
    name: 'Nhóm Giảng viên 3',
    type: TypeEvalution.ADVISOR,

    members: [
      {
        id: 3,
        lecturer: {
          // id: 3,
          // name: 'Lê Văn C',
          // expertise: "Hệ thống thông tin",
          username: 'teacher3',
          avatar: 'avatar3.jpg',
          name: 'Lê Văn C',
          email: 'teacher3@example.com',
          phoneNumber: '0369852147',
          gender: EnumGender.FEMALE,
          role: EnumRole.LECTURER,
          degree: 'MASTERS',
        },
        groupLecturer: 3,
      },
    ],
  },
];
