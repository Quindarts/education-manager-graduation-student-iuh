import { EnumStatusStudent } from "@/types/enum";

export const isPassStatus = (status: string) => {
    return status === EnumStatusStudent.OPEN || status === EnumStatusStudent.PASS_ADVISOR || status === EnumStatusStudent.PASS_REVIEWER || status === EnumStatusStudent.PASS_REPORT;
}
export const getStatusGroup = (status: string) => {
    switch (status) {
        case EnumStatusStudent.OPEN:
            return 'Đang thực hiện';
        case EnumStatusStudent.FAIL_ADVISOR:
            return 'Không ra phản biện';
        case EnumStatusStudent.FAIL_REVIEWER:
            return 'Không ra hội đồng ';
        case EnumStatusStudent.FAIL_REPORT:
            return 'Không hoàn thành';
        case EnumStatusStudent.PASS_ADVISOR:
            return 'Được ra phản biện';
        case EnumStatusStudent.PASS_REVIEWER:
            return 'Được ra hội đồng phản biện';
        case EnumStatusStudent.PASS_REPORT:
            return 'Hoàn thành';
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
