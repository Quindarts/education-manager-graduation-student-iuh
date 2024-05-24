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

export enum TypeMess {
  create = "create",
  update = "update",
  getAll = "getAll",
  getById = "getById",
  delete = "delete",
}
export const MESSAGE_STORE_SUCCESS = (type: TypeMess, entity: string): string => {
  let mess: string = '';
  switch (type) {
    case TypeMess.create:
      mess = "Tạo " + entity + " thành công";
      break
    case TypeMess.update:
      mess = "Cập nhật " + entity + " thành công";
      break
    case TypeMess.getAll:
      break
    case TypeMess.getById:
      break
    case TypeMess.delete:
      mess = "Xóa " + entity + " thành công";
      break
  }
  return mess;
}

export { EnumRole, EnumGender, RoleCheck };
