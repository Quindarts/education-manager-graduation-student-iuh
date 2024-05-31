import axiosConfig from "./axiosConfig"

enum TypeGroupLecturer {
    SESSION_HOST = "SESSION_HOST"
}
//[GET]
export const getGroupLecturerByType = (term_id: string | number, type: TypeGroupLecturer) => {
    return axiosConfig.get(`/api/v1/group-lecturers?${term_id}&${type}`)
}
//[GET]
export const getGroupLecturerById = (id: string | number) => {
    return axiosConfig.get(`/api/v1/group-lecturers/${id}`)
}

//[DELETE]
export const deleteGroupLecturerById = (id: string | number) => {
    return axiosConfig.delete(`/api/v1/group-lecturers/${id}`)
}

//[CREATE]
export const createGroupLecturer = (data: any) => {
    return axiosConfig.post("/api/v1/group-lecturers", data)
}

//[UPDATE]
export const updateGroupLecturerById = (id: string | number, data: any) => {
    return axiosConfig.put(`/api/v1/group-lecturers/${id}`, data)
}