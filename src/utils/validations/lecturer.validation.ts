import { EnumRole } from "@/types/enum";

export const checkDegree = (value: string) => {
    if (value === 'DOCTOR') return 'Tiến sĩ';
    if (value === 'MASTER') return 'Thạc sĩ';
    return;
};

export const checkRoleLecturer = (value: string) => {
    if (value === EnumRole.LECTURER) return 'Giảng viên';
    if (value === EnumRole.HEAD_LECTURER) return 'Trưởng bộ môn';
    if (value === EnumRole.SUB_HEAD_LECTURER) return 'Phó bộ môn';

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