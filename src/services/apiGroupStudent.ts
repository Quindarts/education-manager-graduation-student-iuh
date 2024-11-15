import { EnumStatusStudent } from "@/types/enum";
import axiosConfig from "./axiosConfig"


const URL = '/api/v1/group-students'
//[Admin role]
export const searchGroupStudentAdmin: any = (termId: string) => {
    return axiosConfig.get(`${URL}?termId=${termId}`);
}

export const getGroupByTopic: any = (termId: string, topicId: string) => {
    return axiosConfig.get(`${URL}/topic?termId=${termId}&topicId=${topicId}`);
}
export const getExportGroupStudent: any = (termId: string) => {
    return axiosConfig.get(`${URL}/export?termId=${termId}`)
}
export const getGroupStdsExportByLecturer = async (termId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/export-me?termId=${termId}`)
}
//[GET]
export const getGroupStudentByTerm: any = (termId: string, limit: number, page: number) => {
    return axiosConfig.get(`${URL}?termId=${termId}&page=${page}&limit=${limit}`)
}
//[]
export const getGroupStudentByLecturerByTerm: any = (termId: string, lecturerId: string) => {
    return axiosConfig.get(`${URL}/lecturer?termId=${termId}&lecturerId=${lecturerId}`)
}

//[GET] HEAD_LECTURER COUNT
export const getCountOfGroupStudent: any = (termId: string) => {
    return axiosConfig.get(`${URL}/count?termId=${termId}`)
}
//[GET] LECTURER COUNT
export const getCountOfGroupStudentByLecturer: any = (termId: string) => {
    return axiosConfig.get(`${URL}/count-by-lecturer?termId=${termId}`)
}
//[GET BY ID]
export const getGroupStudentById: any = (id: string) => {
    return axiosConfig.get(`${URL}/${id}`)
}

//[UPDATE]
export const updateTypeReportGroupStudent: any = (id: string, type_report: EnumStatusStudent) => {
    return axiosConfig.put(`${URL}/${id}/type-report`, type_report)
}

export const updateStatusGroupStudent: any = (id: string, statusGroupStudent: EnumStatusStudent) => {
    return axiosConfig.put(`${URL}/${id}/status`, statusGroupStudent)
}

export const importGroupStudent: any = (termId: string) => {
    return axiosConfig.post(`${URL}/import`, { termId: termId })
}



//[PUT ASSIGN TOPIC TO GROUP STUDENT]
export const assignTopic: any = (id: string, topicId: string) => {
    return axiosConfig.put(`${URL}/${id}/assign-topic`, { topicId: topicId })
}
//[PUT REMOVE ASSIGN]
export const removeAssign: any = (id: string, topicId: string) => {
    return axiosConfig.put(`${URL}/${id}/remove-topic`, { topicId: topicId })
}


//[CREATE GROUP STUDENT] BE FIX
export const createGroupStudent: any = (data: { termId: string, studentIds: string[] }) => {
    return axiosConfig.post(`/api/v1/group-students`, data)
}

export const deleteGroupStudent: any = (id: string) => {
    return axiosConfig.delete(`${URL}/${id}`)
}


//[GET MEMBER]
export const getMemberInGroupStudent: any = (id: string) => {
    return axiosConfig.get(`${URL}/${id}/members`)
}


//[ADD MEMBER]
export const addMemberInGroup: any = (id: string, data: { studentId: string, termId: string }) => {
    return axiosConfig.put(`${URL}/${id}/add-member`, data)
}


//[LEAVE MEMBER]
export const deleteMemberInGroup: any = (id: string, data: { studentId: string, termId: string }) => {
    return axiosConfig.put(`${URL}/${id}/delete-member`, data)
}