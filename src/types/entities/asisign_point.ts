import { TypeEvalution } from './assign';
import Student from './student';

export default interface AssignPoint {
  id: number;
  typeEvaluation: TypeEvalution;
  updatedAt: Date;
  group: {
    id: number;
    name: string;
    term: {
      id: number;
    };
    topic: {
      id: number;
    };
    members: [
      {
        id: number;
        student: Student;
        group: {
          id: number;
        };
      },
    ];
  };
  groupLecturer: {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
