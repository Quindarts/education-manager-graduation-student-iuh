import { EnumGender } from "../enum";

export interface Student {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  gender: EnumGender;
  clazzName: string;
  typeTraining: string;
  isActive: boolean;
  majorId: string;
  majorName: string;
}