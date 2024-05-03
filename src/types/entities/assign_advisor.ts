import { TypeEvalution } from './assign';
import Student from './student';
import Teacher from './teacher';
import Topic from './topic';

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
