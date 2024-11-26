import axiosConfig from "./axiosConfig"
export enum TypeGroupLecturer {
    REPORT = "report",
    REVIEWER = 'reviewer'
}
const URL = '/api/v1/group-lecturers'

//[GET] COUNT GROUP LECTURER HEAD_LECTURER
export const getCountOfGroupLecturer = (termId: string) => {
    return axiosConfig.get(`${URL}/count?termId=${termId}`)
}
//[GET] COUNT GROUP LECTURER BY LECTURER
export const getCountOfGroupLecturerByLecturer: any = (termId: string) => {
    return axiosConfig.get(`${URL}/count-by-lecturer?termId=${termId}`)
}

//[GET]
export const getGroupLecturerByType: any = async (termId: string, type: string) => {
    return axiosConfig.get(`${URL}?termId=${termId}&type=${type}`)
}
//[GET]
export const getGroupLecturerByTypeEvaluation: any = async (termId: string, type: string) => {
    return axiosConfig.get(`${URL}/evaluation?termId=${termId}&type=${type}`)
}

export const getGrLecturerByTypeEvaluationByLecturer: any = async (termId: string, type: string, lecturerId: string) => {
    return axiosConfig.get(`${URL}/evaluation-lecturer?termId=${termId}&type=${type}&lecturerId=${lecturerId}`)
}

export const searchGroupLecturerByName: any = async (termId: string, name: string) => {
    return axiosConfig.get(`${URL}/search?termId=${termId}&name=${name}`)
}

//[GET] 
export const getLecturerNoGroupByTypeGroup: any = async (type: string, termId: string) => {
    return axiosConfig.get(`${URL}/${type}/no-group?termId=${termId}`)
}
//[GET] 
export const getGroupLecturerByLecturerId: any = async (termId: string, lecturerId: string, type: string) => {
    return axiosConfig.get(`${URL}/lecturer?lecturerId=${lecturerId}&termId=${termId}&type=${type}`)
}

//[GET]
export const getGroupLecturerById: any = (id: string) => {
    return axiosConfig.get(`${URL}/${id}`)
}

//[DELETE]
export const deleteGroupLecturerById: any = (id: string | number) => {
    return axiosConfig.delete(`${URL}/${id}`)
}
//[CREATE]
export const createGroupLecturer: any = (type: string, data: { termId: string, lecturers: string[], type: string, keywords?: string }) => {
    return axiosConfig.post(`${URL}`, { type, ...data })
}

//[UPDATE]
export const updateGroupLecturerById = (id: string | number, data: any) => {
    return axiosConfig.put(`${URL}/${id}`, data)
}

//[GET MEMBER]

//[ADD MEMBER]
export const addMemberToGroupLecturerById: any = (id: string, lecturerId: string) => {
    return axiosConfig.post(`${URL}/${id}/members`, { lecturerId: lecturerId })
}
//[DELETE MEMBER]
export const removeMemberFromGroupLecturerById: any = (id: string, data: { lecturerId: string }) => {
    return axiosConfig.put(`${URL}/${id}/members`, data)

}
