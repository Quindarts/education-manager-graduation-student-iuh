import axiosConfig from "./axiosConfig"

enum TypeGroupLecturer {
    SESSION_HOST = "SESSION_HOST",
    REVIEWER = 'REVIEWER'
}
//[GET]
export const getGroupLecturerByType: any = async (term_id: string | number, type: TypeGroupLecturer) => {
    return axiosConfig.get(`/api/v1/group-lecturers?${term_id}&${type}`)
}

//[GET]
export const getLecturerNoGroupByTypeGroup: any = async (type: string, termId: string) => {
    return axiosConfig.get(`/api/v1/group-lecturers/${type}/no-group?termId=${termId}`)
}


//[GET]
export const getGroupLecturerById: any = (id: string | number) => {
    return axiosConfig.get(`/api/v1/group-lecturers/${id}`)
}

//[DELETE]
export const deleteGroupLecturerById: any = (id: string | number) => {
    return axiosConfig.delete(`/api/v1/group-lecturers/${id}`)
}

//[CREATE]
export const createGroupLecturer: any = (type: string, data: { termId: string, lecturers: string[] }) => {
    return axiosConfig.post(`/api/v1/group-lecturers/${type}`, data)
}

//[UPDATE]
export const updateGroupLecturerById = (id: string | number, data: any) => {
    return axiosConfig.put(`/api/v1/group-lecturers/${id}`, data)
}

//[GET MEMBER]

//[ADD MEMBER]
export const addMemberToGroupLecturerById: any = (id: string, data: { lecturerId: string }) => {
    return axiosConfig.post(`/api/v1/group-lecturers/${id}/members`, data)
}
//[DELETE MEMBER]
export const removeMemberFromGroupLecturerById: any = (id: string, data: { lecturerId: string }) => {
    return axiosConfig.put(`/api/v1/group-lecturers/${id}/members`, data)

}
