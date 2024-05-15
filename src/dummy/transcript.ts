import Student from 'types/entities/student';
import Teacher from '@/types/entities/lecturer';

export default interface TranscriptSumMary {
  student: Student;
  gradeSummary: number;
  missings: Array<{}>;
  achievements: [
    {
      id: number;
      name: string;
      bonusGrade: number;
      student: Student;
    },
  ];
  ADVISOR: {
    avgGrader: number;
    details: Array<Teacher>;
  };
  REVIEWER: {
    avgGrader: number;
    details: Array<Teacher>;
  };
  SESSION_HOST: {
    avgGrader: number;
    details: Array<Teacher>;
  };
}
