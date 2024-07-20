import axiosConfig from "./axiosConfig"

export type RoleBodyRequest = { name: string, lecturerId: string }

export const getAllRoleLecturer: any = () => {
    return axiosConfig.get(`/api/v1/roles`)
}
export const assignRoleToLecturer: any = (data: RoleBodyRequest) => {
    return axiosConfig.post(`/api/v1/roles`, data)
}

export const unAssignRoleToLecturer: any = (id: string) => {
    return axiosConfig.delete(`/api/v1/roles/${id}`)
}

export const getRoleDetailByLecturerId: any = (lecturerId: string) => {
    return axiosConfig.get(`/api/v1/roles/lecturer/${lecturerId}`)
}