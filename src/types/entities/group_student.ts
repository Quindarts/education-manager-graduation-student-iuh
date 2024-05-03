import Topic from './topic';

export default interface GroupStudent {
  id: number;
  name: string;
  term: {
    id: number;
  };
  topic: Topic;
  status: string;
  members: [
    {
      id: number;
      student: {
        id: number;
        username: string;
        avatar: string;
        phoneNumber: string;
        email: string;
        name: string;
        gender: string;
        createdAt: string;
        updatedAt: string;
        majors: {
          id: number;
        };
        typeTraining: string;
        schoolYear: string;
      };
      group: {
        id: number;
      };
    },
  ];
}
