enum EnumRole {
  LECTURER = 'LECTURER',
  HEAD_LECTURER = 'HEAD_LECTURER',
  SUB_HEAD_LECTURER = 'SUB_HEAD_LECTURER',
}

enum EnumGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

enum RoleCheck {
  ADMIN = 'ADMIN',
  LECTURER = 'LECTURER',
  HEAD_LECTURER = 'HEAD_LECTURER',
  SUB_HEAD_LECTURER = 'SUB_HEAD_LECTURER',
}

export enum QueryKeys {
  topic = "topic",
  lecturer = "lecturer",
  student = "student",
  group_student = "group_student",
  major = "major",
  group_lecturer = "group_lecturer",
  evaluate = 'evaluate',

}




export { EnumRole, EnumGender, RoleCheck };
