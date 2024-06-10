import dayjs from "dayjs"

enum ENUM_STATUS_OF_DATE_TERM {
    ACTIVE = 'ACTIVE',
    INACTIVE = "INACTIVE",
    EXPIRED = 'EXPIRED'
}
export const statusOfDate = (startDate: string, endDate: string) => {
    const dayOfStartDate = dayjs(startDate)
    const dayOfEndDate = dayjs(endDate)
    let currentStatus;
    const dateNow = dayjs();
    if (dateNow < dayOfStartDate)
        currentStatus = ENUM_STATUS_OF_DATE_TERM.INACTIVE
    else if (dateNow > dayOfEndDate)
        currentStatus = ENUM_STATUS_OF_DATE_TERM.EXPIRED
    else
        currentStatus = ENUM_STATUS_OF_DATE_TERM.ACTIVE
    return currentStatus
}