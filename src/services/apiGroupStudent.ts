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
//[Admin role]
export const searchGroupStudentAdmin: any = (termId: string | number, limit: number, page: number, searchField: 'name', keywords: string | number) => {
    return axiosConfig.get(`/api/v1/groupStudents/query?searchField=${searchField}&keywords=${keywords}&limit=${limit}&page=${page}&termId=${termId}`);
}
//[GET]
export const getGroupStudentByTerm: any = (term_id: number, limit: number, page: number) => {
    return axiosConfig.get(`/api/v1/group-students?termId=${term_id}&page=${page}&limit=${limit}`)
}

//[GET BY ID]
export const getGroupStudentById: any = (id: number | string) => {
    return axiosConfig.get(`/api/v1/group-students/${id}`)
}

//[UPDATE]
export const updateTypeReportGroupStudent: any = (id: number | string, type_report: TypeReport) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/type-report`, type_report)
}

export const updateStatusGroupStudent: any = (id: number | string, statusGroupStudent: TypeStatusGroup) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/status`, statusGroupStudent)
}

export const importGroupStudent: any = (termId: string) => {
    return axiosConfig.post(`/api/v1/group-students/import`, { termId: termId })
}

//[GET MEMBER]
export const getMemberInGroupStudent: any = (id: string) => {
    return axiosConfig.get(`/api/v1/group-students/${id}/member`)
}


//[PUT ASSIGN TOPIC TO GROUP STUDENT]
export const assignTopic: any = (id: string, topicId: string) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/assign-topic`, { topicId: topicId })
}


//[CREATE GROUP STUDENT] BE FIX
export const createGroupStudent: any = (data: any) => {
    return axiosConfig.post(`/api/v1/group-students`, data)
}

export const deleteGroupStudent: any = (id: number | string) => {
    return axiosConfig.delete(`/api/v1/group-students/${id}`)
}