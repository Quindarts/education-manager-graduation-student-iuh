import { TypeEvalution } from 'types/entities/assign';

export default interface Assign {
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
        student: {
          id: number;
        };
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
