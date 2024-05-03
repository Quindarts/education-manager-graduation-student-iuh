import { EnumRole, EnumGender } from '../enum';

interface Teacher {
  lecturer: any;
  id: any;
  username: string;
  avatar: string;
  name: string;
  email: string;
  phoneNumber: string;
  gender: EnumGender;
  role: EnumRole;
  majors: {
    id: number;
  };
  degree: string;
  isAdmin: boolean;
}

export default Teacher;
