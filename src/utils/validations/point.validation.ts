export const checkDisableButton = (status: string) => {
    switch (status) {
        case 'OPEN':
            return false;
        case 'FAIL_ADVISOR':
            return true;
        case 'FAIL_REVIEWER':
            return true;
        case 'FAIL_SESSION_HOST':
            return true;
        case 'PASS_ADVISOR':
            return false;
        case 'PASS_REVIEWER':
            return false;
        case 'PASS_SESSION_HOST':
            return false;
    }
    return false;
};
export const getStatusViewPoint = (status: number) => {
    switch (status) {
        case 1:
            return 'Đã công bố';
        case 0:
            return 'Chưa';
    }
    return
};
export const checkString = (str: string) => {
    var regex = /^[a-zA-Z0-9]*$/;
    return regex.test(str);
};

export const checkPoint = (str: string) => {
    const regex = /^([0-9](\.[0-9])?|10(\.0)?)|0\.5$/;
    return regex.test(str);
};