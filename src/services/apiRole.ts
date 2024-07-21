import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

export type RoleBodyRequest = { name: string, lecturerId: string }

export const getAllRoleLecturer = () => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/roles`)
}
export const assignRoleToLecturer: any = (data: RoleBodyRequest) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/roles`, data)
}

export const unAssignRoleToLecturer: any = (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/roles/${id}`)
}

export const getRoleDetailByLecturerId: any = (lecturerId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/roles/lecturer/${lecturerId}`)
}