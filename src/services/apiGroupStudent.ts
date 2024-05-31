import axiosConfig from "./axiosConfig"

enum TypeReport {
    POSTER = 'POSTER'
}
export enum TypeStatusGroup {
    OPEN = 'OPEN',
    FAIL_ADVISOR = 'FAIL_ADVISOR',
    FAIL_REVIEWER = 'FAIL_REVIEWER',
    FAIL_SESSION_HOST = 'FAIL_SESSION_HOST',
    PASS_ADVISOR = 'PASS_ADVISOR',
    PASS_REVIEWER = 'PASS_REVIEWER',
    PASS_SESSION_HOST = 'PASS_SESSION_HOST',
}

//[GET]
export const getGroupStudentByTerm: any = (term_id: number) => {
    return axiosConfig.get(`/api/v1/group-students?termId=${term_id}`)
}

export const getGroupStudentById: any = (id: number | string) => {
    return axiosConfig.get(`/api/v1/group-students/${id}`)
}

//[UPDATE]
export const updateTypeReportGroupStudent = (id: number | string, type_report: TypeReport) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/type-report`, type_report)
}

export const updateStatusGroupStudent = (id: number | string, statusGroupStudent: TypeStatusGroup) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/status`, statusGroupStudent)
}

//[CREATE GROUP STUDENT] BE FIX
export const createGroupStudent = (data: any) => {
    return axiosConfig.post(`/api/v1/group-students`, data)
}

export const deleteGroupStudent = (id: number | string) => {
    return axiosConfig.delete(`/api/v1/group-students/${id}`)
}