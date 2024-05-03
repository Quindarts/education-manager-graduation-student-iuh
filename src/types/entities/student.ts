import { EnumGender } from '../enum';
interface Student {
  id: number;
  isTopicExists: boolean;
  username: string;
  createdAt?: Date;
  email?: string;
  gender: EnumGender;
  majors: {
    id: number;
  };
  name?: string;
  phoneNumber?: string;
  schoolYear?: string;
  typeTraining?: string;
  updatedAt?: Date;
  avatar?: string;
}
export default Student;
