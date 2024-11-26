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

enum EnumUser {
  LECTURER = 'LECTURER',
  STUDENT = 'STUDENT',
  GROUP_STUDENT = 'GROUP_STUDENT',
  GROUP_LECTURER = 'GROUP_LECTURER',
  ALL = 'ALL',
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

enum EnumIndustryKey {
  WEB = 'WEB',
  APP = 'APP',
  SYSTEM = 'SYSTEM',
  AI = 'AI',
  DATA = 'DATA',
  SECURITY = 'SECURITY',
  OTHER = 'OTHER',
  NETWORK = 'NETWORK',
}

enum EnumAnalysis {
  LECTURER = 'lecturers',
  TOPICS = 'topics',
}
enum EnumStatusStudent {
  OPEN = 'OPEN',
  FAIL_ADVISOR = 'FAIL_ADVISOR',
  FAIL_REVIEWER = 'FAIL_REVIEWER',
  FAIL_REPORT = 'FAIL_REPORT',
  PASS_ADVISOR = 'PASS_ADVISOR',
  PASS_REVIEWER = 'PASS_REVIEWER',
  PASS_REPORT = 'PASS_REPORT',
}
export {
  EnumRole,
  EnumGender,
  EnumUser,
  RoleCheck,
  EnumIndustryKey,
  EnumAnalysis,
  EnumStatusStudent,
};
