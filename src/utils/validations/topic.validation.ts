export const checkIsTopic = (value: boolean) => {
    if (value === true) return 'Có';
    if (value === false) return 'Chưa có';
};

export const getNameStatus = (value: string) => {
    if (value === 'REJECTED') return 'Không được duyệt';
    if (value === 'PENDING') return 'Đang chờ';
    if (value === 'APPROVED') return 'Đã duyệt';
};

export const getColorStatusTopic = (text: string) => {
    switch (text) {
        case 'REJECTED':
            return 'orange';
        case 'PENDING':
            return 'black';
        case 'APPROVED':
            return 'green';
    }
};

export const getLevelTopic = (text: string) => {
    switch (text) {
        case 'HIGH':
            return 'Rất khó';
        case 'MEDIUM':
            return 'Khó';
        case 'LOW':
            return 'Bình thường';
        case null:
            return 'Chưa xác định';
    }
};


