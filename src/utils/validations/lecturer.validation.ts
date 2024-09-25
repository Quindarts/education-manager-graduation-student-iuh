import { EnumRole } from "@/types/enum";

export const checkDegree = (value: string) => {
    if (value === 'MASTER') return 'Tiến sĩ';
    if (value === 'DOCTOR') return 'Thạc sĩ';
    return;
};

export const checkRoleLecturer = (value: string) => {
    if (value === EnumRole.LECTURER) return 'Giảng viên';
    if (value === EnumRole.HEAD_LECTURER) return 'Chủ nhiệm ngành';
    if (value === EnumRole.HEAD_COURSE) return 'Chủ quản môn học';
    if (value === EnumRole.ADMIN) return 'Quản trị viên';
    return;
};
export const checkRoleLecturerColor = (value: string) => {
    if (value === EnumRole.LECTURER) return '#207D47';
    if (value === EnumRole.HEAD_LECTURER) return '#F1970F';
    if (value === EnumRole.HEAD_COURSE) return '#3498DB';
    if (value === EnumRole.ADMIN) return '#FF5733';
    return;
};

export const getColorLecturer = (typeEvalution: string) => {
    switch (typeEvalution) {
        case 'ADVISOR':
            return 'green';
        case 'REVIEWER':
            return 'blue';
        case 'SESSION_HOST':
            return 'red';
    }
};