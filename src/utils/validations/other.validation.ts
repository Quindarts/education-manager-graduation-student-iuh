import theme from "@/theme/theme";

export const checkString = (str: string) => {
    var regex = /^[a-zA-Z0-9]*$/;
    return regex.test(str);
};

export const getNameColorStatus = (value: string) => {
    switch (value) {
        case 'REFUSE':
            return theme.palette.error.dark;
        case 'PEDING':
            return theme.palette.success.dark;
        case 'ACCEPT':
            return theme.palette.primary.dark;
    }
    return
};

export const formatString = (text: string) => {
    return text
        ?.replace(/2\./g, '\n2.' || '\n-')
        .replace(/3\./g, '\n3.' || '\n-')
        .replace(/4\./g, '\n4.' || '\n-')
        .replace(/5\./g, '\n5.' || '\n-')
        .replace(/6\./g, '\n6.' || '\n-')
        .replace(/7\./g, '\n7.' || '\n-')
        .replace(/8\./g, '\n8.' || '\n-');
};

