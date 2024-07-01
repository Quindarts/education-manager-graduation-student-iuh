export const typeConvertGroupLecturer = (type: string) => {
    switch (type) {
        case 'reviewer':
            return 'Nhóm chấm Phản biện';
        case 'report_poster':
            return 'Nhóm chấm Poster';
        case 'report_council':
            return 'Nhóm chấm Hội đồng';
    }
    return;
};

export const ENUM_STATUS_LECTURER = {
    NO_GROUP: 'NO_GROUP',
    HAVE_GROUP: 'HAVE_GROUP',
};
export const ENUM_GROUP_LECTURER_REPORT = [
    {
        _id: 'report_poster',
        name: 'Nhóm chấm poster',
    },
    {
        _id: 'report_council',
        name: 'Nhóm chấm hội đồng',
    },
];
export const ENUM_GROUP_LECTURER = [
    {
        name: 'Nhóm chấm Phản biện',
        _id: 'reviewer',
    },
    {
        name: 'Nhóm chấm Poster',
        _id: 'report_poster',
    },
    {
        name: 'Nhóm chấm Hội đồng',
        _id: 'report_council',
    },
];