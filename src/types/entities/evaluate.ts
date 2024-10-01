export interface Evaluate {
  id: number;
  type?: 'ADVISOR' | 'REVIEWER' | 'REPORT';
  termId?: number;
  name?: string;
  gradeMax?: number;
  description?: string;
}
