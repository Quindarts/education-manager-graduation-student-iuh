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