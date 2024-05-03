export interface Term {
  id: number;
  name: string;
  schoolYear: string;
  startDate: string;
  endDate: string;
  isGroupRegister: boolean;
  isTopicRegister: boolean;
  isPulicResult: boolean;
  createdAt: string;
  updatedAt: string;
}
export const dummyTerms = [
  {
    id: 1,
    name: 'Học kỳ 1',
    schoolYear: '2024-2025',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    isGroupRegister: true,
    isTopicRegister: false,
    isPublicResult: true,
    createdAt: '2024-01-01',
    updatedAt: '2024-03-31',
  },
  {
    id: 2,
    name: 'Học kỳ 2',
    schoolYear: '2024-2025',
    startDate: '2025-01-01',
    endDate: '2025-05-31',
    isGroupRegister: false,
    isTopicRegister: true,
    isPublicResult: true,
    createdAt: '2025-01-01',
    updatedAt: '2025-03-31',
  },
  {
    id: 3,
    name: 'Học kỳ 3',
    schoolYear: '2024-2025',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    isGroupRegister: true,
    isTopicRegister: true,
    isPublicResult: true,
    createdAt: '2025-06-01',
    updatedAt: '2025-08-31',
  },
];
