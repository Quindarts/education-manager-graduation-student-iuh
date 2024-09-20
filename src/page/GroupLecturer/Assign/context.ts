/**
 * TODO: Handler
 *  * Tóm tắt:
 *  Nhóm GV: chứa 1 list grStd đã  trước đó
 *  Nhóm sv: toàn bộ grStd chưa được assign
 *
 *  Vấn đề:
 *      ? Làm sao để search - filter theo grStd.
 *      ? Gỡ phân công như thế nào
 *      ? Validate theo loại chấm: phản biện, poster, hội đồng
 *      ? Hiển thị đề tài được phân như thế nào
 * * Giải quyết:
 *  ?  case 1 - Hard: Nhóm GV đã được phân một vài nhóm rồi. /[DONE]
 *  ? Solution:
 * `    - Khởi tạo 1 array chứa ds nhóm svien được phân của nhóm gvA  => initGrAssigned
 *      - if(initGrAssigned)
 *          Tạo Fn cập nhật initGrAssigned => startInitGrHaveAssigned(dataGroupFromAPI)
 *      - else
 *          initGrAssigned = []
 *  ? case 2: search nhóm sinh viên theo type search
 *  ? Solution:
 *      - filter qua từng nhóm sinh viên có keywords gần đúng.
 *      - state keywords => debounce 0.5s
 *      - type search = topicName | lecturerSupportName
 *  ? case 3: conflict state - thêm bớt phân công kết hợp search
 *      - Tạo Fn updateGrNeedAssign(type, group)
 *      - Nếu event có isAssign = true => type = add
 *      - Ngược lại type = remove
 *  ? case 4: conflict data recevie
 *
 *  */

export const stylingGrHaveAssigned = (grLecturer) => {
    return grLecturer?.groupStudents?.map((group) => {
        return {
            id: group?.id,
            name: group?.name,
            topicName: group?.topicName,
            fullName: group?.lecturerName,
            lecturerTermId: group?.lecturerTermId,
        };
    });
};

export const startInitGrNeedAssign = (dataGroupFromAPI: any[]) => {
    if (!dataGroupFromAPI) {
        return [];
    }
    return dataGroupFromAPI.map((gr) => ({ ...gr, isAssign: false }));
};

export const startInitGrHaveAssigned = (dataGroupFromAPI: any[]) => {
    if (!dataGroupFromAPI) {
        return [];
    }
    return dataGroupFromAPI.map((gr) => ({ ...gr, isAssign: true }));
};

// + Hội đồng poster: các đề tài mà thành viên HĐ không là GVHD
// + Phản biện:  Các đề tài mà thành viên HĐ không là GVHD
export const isExistLecturerSupport = (
    groupLecturer: any,
    thisGrStudentNeedAssign: any,
    typeAssign?: string,
) => {
  
    //  Case poster, phan bien
    if (groupLecturer !== null && groupLecturer !== undefined && ['', ''].includes(typeAssign)) {
        const lecturerInGroupIds = groupLecturer?.members.map((mem: any) => mem.id);
        const lecturerSupport = thisGrStudentNeedAssign.lecturerId;
        return lecturerInGroupIds.filter((id: string) => id.includes(lecturerSupport)).length > 0;
    }
    //case: Hoi dong
    return false;
};


export const toggleDataByTransferId = (groups: any[], transferId: string) => {
    if (!groups || !transferId) {
        return null;
    }
    let groupTransfer: any;
    let groupUpdate: any[] = [];

    groups?.map((gr: any) => {
        gr.id.toString() !== transferId.toString() ? groupUpdate.push(gr) : (groupTransfer = gr);
    });

    return {
        groupUpdate,
        groupTransfer,
    };
};
