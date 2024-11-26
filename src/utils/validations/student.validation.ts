export const checkTraining = (value: string) => {
    if (value === 'UNIVERSITY') return 'Đại học';
    if (value === 'MASTER') return 'Cao đẳng';
    return;
};

// 'OPEN', 'FAIL_ADVISOR', 'FAIL_REVIEWER', 'FAIL_SESSION_HOST', 'PASS_ADVISOR', 'PASS_REVIEWER', 'PASS_SESSION_HOST'

export const checkStatusStudent = (value: string) => {
    switch (value) {
        case "OPEN": return "Đang học";
        case "FAIL_ADVISOR": return "rớt";
        case "FAIL_REVIEWER": return "rớt";
        case "FAIL_SESSION_HOST": return "rớt";
        case "PASS_ADVISOR": return "Đậu hướng dẫn";
        case "PASS_REVIEWER": return "Đậu báo cáo phản biện";
        case "PASS_SESSION_HOST": return "";
    }
} 