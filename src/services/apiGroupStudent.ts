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
export const searchGroupStudentAdmin: any = (termId: string, limit: number, page: number, searchField: 'name', keywords: string) => {
    return axiosConfig.get(`/api/v1/groupStudents/query?searchField=${searchField}&keywords=${keywords}&limit=${limit}&page=${page}&termId=${termId}`);
}

export const getGroupByTopic: any = (termId: string, topicId: string) => {
    return axiosConfig.get(`/api/v1/group-students/topic?termId=${termId}&topicId=${topicId}`);
}


//[GET]
export const getGroupStudentByTerm: any = (termId: string, limit: number, page: number) => {
    return axiosConfig.get(`/api/v1/group-students?termId=${termId}&page=${page}&limit=${limit}`)
}
//[GET]
export const getGroupStudentByLecturerByTerm: any = (termId: string, lecturerId: string) => {
    return axiosConfig.get(`/api/v1/group-students/lecturer?termId=${termId}&lecturerId=${lecturerId}`)
}
//[GET]
export const getCountOfGroupStudent: any = (termId: string) => {
    return axiosConfig.get(`/api/v1/group-students/count?termId=${termId}`)
}
//[GET BY ID]
export const getGroupStudentById: any = (id: string) => {
    return axiosConfig.get(`/api/v1/group-students/${id}`)
}

//[UPDATE]
export const updateTypeReportGroupStudent: any = (id: string, type_report: TypeReport) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/type-report`, type_report)
}

export const updateStatusGroupStudent: any = (id: string, statusGroupStudent: TypeStatusGroup) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/status`, statusGroupStudent)
}

export const importGroupStudent: any = (termId: string) => {
    return axiosConfig.post(`/api/v1/group-students/import`, { termId: termId })
}



//[PUT ASSIGN TOPIC TO GROUP STUDENT]
export const assignTopic: any = (id: string, topicId: string) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/assign-topic`, { topicId: topicId })
}
//[PUT REMOVE ASSIGN]
export const removeAssign: any = (id: string, topicId: string) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/remove-topic`, { topicId: topicId })
}


//[CREATE GROUP STUDENT] BE FIX
export const createGroupStudent: any = (data: { termId: string, studentIds: string[] }) => {
    return axiosConfig.post(`/api/v1/group-students`, data)
}

export const deleteGroupStudent: any = (id: string) => {
    return axiosConfig.delete(`/api/v1/group-students/${id}`)
}


//[GET MEMBER]
export const getMemberInGroupStudent: any = (id: string) => {
    return axiosConfig.get(`/api/v1/group-students/${id}/member`)
}


//[ADD MEMBER]
export const addMemberInGroup: any = (id: string, data: { studentId: string, termId: string }) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/add-member`, data)
}


//[LEAVE MEMBER]
export const deleteMemberInGroup: any = (id: string, data: { studentId: string, termId: string }) => {
    return axiosConfig.put(`/api/v1/group-students/${id}/delete-member`, data)
}