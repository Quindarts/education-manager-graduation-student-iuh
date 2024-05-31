export const getTypeGroupLecturer = (typeEvalution: string) => {
    switch (typeEvalution) {
        case 'ADVISOR':
            return 'Hướng dẫn';
        case 'REVIEWER':
            return 'Phản biện';
        case 'SESSION_HOST':
            return 'Hội đồng';
    }
}