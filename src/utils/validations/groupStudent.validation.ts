export const getStatusGroup = (status: string) => {
    switch (status) {
        case 'OPEN':
            return 'Nhóm mới tạo';
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
        case 'PASS_SESSION_HOST':
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
        case 'PASS_SESSION_HOST':
            return 'green';
    }
};

;