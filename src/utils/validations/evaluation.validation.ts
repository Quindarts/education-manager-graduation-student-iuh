export const getTypeEvaluation = (typeEvaluation: string) => {
    switch (typeEvaluation) {
        case 'ADVISOR':
            return 'Hướng dẫn';
        case 'REVIEWER':
            return 'Phản biện';
        case 'REPORT':
            return 'Hội đồng (Báo cáo)';
    }
    return;
};

export const getFileNameExportEvaluation = (typeEvaluation: string) => {
    switch (typeEvaluation) {
        case 'ADVISOR':
            return 'GVHD_PhieuChamDiem_CuoiKy_KLTN';
        case 'REVIEWER':
            return 'GVPB_PhieuChamDiem_CuoiKy_KLTN';
        case 'REPORT':
            return 'Hoidong_PhieuChamDiem_CuoiKy_KLTN';
    }
    return;
};