import { EnumGender } from "../enum";

export interface Student {
  id: string;
  username: string;
  fullName: string;
  phone: string;
  email: string;
  gender: EnumGender;
  dateOfBirth: string;
  clazzName: string;
  typeTraining: string;
  isActive: boolean;
  majorId: string;
  majorName: string;
}