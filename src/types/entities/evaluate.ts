export interface Evaluate {
  id: number;
  type?: 'ADVISOR' | 'REVIEWER' | 'SESSION_HOST';
  termId?: number;
  name?: string;
  gradeMax?: number;
  description?: string;
}
