

export const getStatusGroup = (status: string) => {
    switch (status) {
        case 'OPEN':
            return 'Đang học';
        case 'FAIL_ADVISOR':
            return 'Rớt hướng dẫn';
        case 'FAIL_REVIEWER':
            return 'Rớt phản biện';
        case 'FAIL_SESSION_HOST':
            return 'Rớt hội đồng';
        case 'PASS_ADVISOR':
            return 'Đậu hướng dẫn';
        case 'PASS_REVIEWER':
            return 'Đậu phản biện';
        case 'PASS_REPORT':
            return 'Đậu hội dồng';
    }
};


export const getStatusGroupColor = (status: string) => {
    switch (status) {
        case 'OPEN':
            return 'green';
        case 'FAIL_ADVISOR':
            return 'red';
        case 'FAIL_REVIEWER':
            return 'red';
        case 'red':
            return 'Rớt hội đồng';
        case 'green':
            return 'Đậu phản biện';
        case 'PASS_REVIEWER':
            return 'green';
        case 'PASS_REPORT':
            return 'green';
    }
};
export const STATUS_STYLES = {
    OPEN: {
        color: '#1565C0',
        backgroundColor: '#E3F2FD'
    },
    FAIL_ADVISOR: {
        color: '#D32F2F',
        backgroundColor: '#FFEBEE'
    },
    FAIL_REVIEWER: {
        color: '#D32F2F',
        backgroundColor: '#FFEBEE'
    },
    FAIL_REPORT: {
        color: '#D32F2F',
        backgroundColor: '#FFEBEE'
    },
    PASS_ADVISOR: {
        color: '#388E3C',
        backgroundColor: '#E8F5E9'
    },
    PASS_REVIEWER: {
        color: '#388E3C',
        backgroundColor: '#E8F5E9'
    },
    PASS_REPORT: {
        color: '#388E3C',
        backgroundColor: '#E8F5E9'
    }
};

export const getStatusStudentStyle = (statusId: string) => STATUS_STYLES[statusId] || { color: '#000', backgroundColor: '#FFF' };
