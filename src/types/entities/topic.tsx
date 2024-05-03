import Teacher from './teacher';

interface Topic {
  id: number;
  comment: string;
  description: string;
  lecturer?: Teacher;
  name: string;
  note: string;
  quantityGroupMax: number;
  requireInput: string;
  standradOutput: string;
  status: string;
  target: string;
  term: {
    id: number;
  };
  totalGroupChoose: number;
  level: string;
}
export default Topic;
