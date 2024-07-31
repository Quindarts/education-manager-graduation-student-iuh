import { LecturerTerm } from './lecturer_term';

export interface Topic {
  id: string;
  name: string;
  description: string;
  quantityGroupMax: number;
  expectedResult: string;
  target: string;
  standardOutput: string;
  requireInput: string;
  status: string;
  note: string;
  createdAt?: string;
  updatedAt?: string;
  lecturerTerm: Partial<LecturerTerm>;
  quantityGroup: number;
}

export type TopicBodyRequestType = Pick<
  Topic,
  | 'name'
  | 'description'
  | 'quantityGroupMax'
  | 'standardOutput'
  | 'requireInput'
  | 'target'
  | 'expectedResult'
>;
