import { TypeEvalution } from 'types/entities/assign';
import Student from 'types/entities/student';
import Teacher from '@/types/entities/lecturer';
export default interface AssignAdvisor {
  topic: any;
  id: number;
  typeEvaluation: TypeEvalution;

  group: {
    id: number;
    name: string;
    term: {
      id: number;
    };
    status: string;
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
    members: [Teacher];
  };
}

export default interface AssignAdvisorOfLecturer {
  id: number;
  typeEvaluation: TypeEvalution;
  name: string;
  status: string;
  member: [
    {
      id: number;
      student: Student;
      group: {
        id: number;
      };
    },
  ];
  groupOfLecturer: Teacher[];
}
