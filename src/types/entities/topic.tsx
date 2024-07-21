import { LecturerTerm } from './lecturer_term';

export interface Topic {
  id: string;
  name: string;
  description: string;
  quantityGroupMax: number;
  note: string;
  target: string;
  standardOutput: string;
  requireInput: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
  lecturerTerm: Partial<LecturerTerm>;
  quantityGroup: number;
}

export type TopicBodyRequestType = Pick<
  Topic,
  'name' | 'description' | 'quantityGroupMax' | 'standardOutput' | 'requireInput' | 'target'
>;
