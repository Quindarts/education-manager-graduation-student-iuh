export const checkGender = (value: string) => {
    if (value === 'MALE') return 'Nam';
    if (value === 'FEMALE') return 'Nữ';
};

export const checkTypeTraining = (value: string) => {
    if (value === 'UNIVERSITY') return 'Đại Học';
    if (value === 'COLLEGE') return 'Cao Đẳng';
};