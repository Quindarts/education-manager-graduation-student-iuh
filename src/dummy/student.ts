// import { EnumGender } from 'types/enum';
// export interface Student {
//   id: number;
//   isTopicExists: boolean;
//   username: string;
//   createdAt?: Date;
//   email?: string;
//   gender: EnumGender;
//   majors: {
//     id: number;
//   };
//   name?: string;
//   phoneNumber?: string;
//   schoolYear?: string;
//   typeTraining?: string;
//   updatedAt?: Date;
//   avatar?: string;


import { EnumGender } from "@/types/enum";

export const dummyStudentData = [
  {
    id: 1,
    isTopicExists: true,
    username: '21089141',
    createdAt: new Date('2023-09-01'),
    email: 'student1@example.com',
    gender: EnumGender.MALE,
    majors: {
      id: 123,
    },
    name: 'Nguyễn Thị A',
    phoneNumber: '0123456789',
    schoolYear: '3',
    typeTraining: 'Đại học',
    updatedAt: new Date('2024-03-15'),
    avatar: 'avatar1.jpg',
    isActive: false
  },
  {
    id: 2,
    isTopicExists: true,
    username: 'student2',
    createdAt: new Date('2023-09-01'),
    email: 'student2@example.com',
    gender: EnumGender.FEMALE,
    majors: {
      id: 456,
    },
    name: 'Trần Văn B',
    phoneNumber: '0987654321',
    schoolYear: '2',
    typeTraining: 'Đại học',
    updatedAt: new Date('2024-03-20'),
    avatar: 'avatar2.jpg',
    isActive: true
  },
  {
    id: 3,
    isTopicExists: false,
    username: 'student3',
    createdAt: new Date('2023-09-01'),
    email: 'student3@example.com',
    gender: EnumGender.FEMALE,
    majors: {
      id: 789,
    },
    name: 'Lê Thị C',
    phoneNumber: '0369852147',
    schoolYear: '4',
    typeTraining: 'Đại học',
    updatedAt: new Date('2024-03-25'),
    avatar: 'avatar3.jpg',
    isActive: true
  },
  {
    id: 4,
    isTopicExists: true,
    username: 'student4',
    createdAt: new Date('2023-09-01'),
    email: 'student4@example.com',
    gender: EnumGender.FEMALE,
    majors: {
      id: 1011,
    },
    name: 'Phạm Văn D',
    phoneNumber: '0912345678',
    schoolYear: '1',
    typeTraining: 'Đại học',
    updatedAt: new Date('2024-03-10'),
    avatar: 'avatar4.jpg',
    isActive: false
  },
  {
    id: 5,
    isTopicExists: true,
    username: 'student5',
    createdAt: new Date('2023-09-01'),
    email: 'student5@example.com',
    gender: EnumGender.MALE,
    majors: {
      id: 1213,
    },
    name: 'Hoàng Thị E',
    phoneNumber: '0975321648',
    schoolYear: '3',
    typeTraining: 'Đại học',
    updatedAt: new Date('2024-03-05'),
    avatar: 'avatar5.jpg',
    isActive: true
  },
];
