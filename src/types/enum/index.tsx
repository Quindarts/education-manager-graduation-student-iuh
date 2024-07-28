enum EnumRole {
  LECTURER = 'LECTURER',
  HEAD_LECTURER = 'HEAD_LECTURER',
  HEAD_COURSE = 'HEAD_COURSE',
  ADMIN = 'ADMIN',
}

enum EnumGender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

enum RoleCheck {
  HEAD_COURSE = 'HEAD_COURSE',
  LECTURER = 'LECTURER',
  HEAD_LECTURER = 'HEAD_LECTURER',
  ADMIN = 'ADMIN',
}

export enum QueryKeys {
  topic = 'topic',
  lecturer = 'lecturer',
  student = 'student',
  group_student = 'group_student',
  major = 'major',
  group_lecturer = 'group_lecturer',
  evaluate = 'evaluate',
}

export { EnumRole, EnumGender, RoleCheck };
