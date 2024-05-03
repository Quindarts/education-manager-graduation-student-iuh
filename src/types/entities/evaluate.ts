export interface Evaluate {
  id: number;
  type?: 'ADVISOR' | 'REVIEWER' | 'SESSION_HOST';
  termId?: number;
  name?: string;
  gradeMax?: number;
  description?: string;
}

export const dummyEvaluateDate = [
  {
    id: '123',
    type: 'ADVISOR',
    termId: 123,
    name: 'Kỹ năng mềm',
    gradeMax: 2,
    description: 'Ứng dụng phân tích kinh doanh',
  },
  {
    id: '124',
    type: 'ADVISOR',
    termId: 123,
    name: 'Khả năng ứng dụng',
    gradeMax: 3,
    description: 'Ứng dụng hỗ trợ chấm điểm',
  },
];
