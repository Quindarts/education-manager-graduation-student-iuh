export const checkTraining = (value: string) => {
    if (value === 'UNIVERSITY') return 'Đại học';
    if (value === 'MASTER') return 'Cao đẳng';
    return;
};