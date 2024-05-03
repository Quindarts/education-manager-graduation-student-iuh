export interface Evaluate {
  id: number;
  type: 'ADVISOR' | 'REVIEWER' | 'SESSION_HOST';
  termId: number;
  name: string;
  gradeMax: number;
  description: string;
}


export const dummyEvaluate: Evaluate[] = [
  {
    id: 0,
    type: "ADVISOR",
    termId: 0,
    name: "Khả năng ứng dụng công nghệ mới",
    gradeMax: 10,
    description: "sádkskjfdghlfdafhafhaskfhsfhl",

  }
]