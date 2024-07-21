import Major from "@/types/entities/major"
import axiosConfig from "./axiosConfig"
import { ResponseType } from "@/types/axios.type"
//[GET]
export const getAllMajor = () => {
    return axiosConfig.get<ResponseType, any>("/api/v1/majors")
}
//[GET]
export const getMajorById = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/majors/${id}`)
}
//[POST]
export const createMajor = (data: Pick<Major, 'name'>) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/majors", data)
}

//UPDATE
export const updateMajor = (id: string, data: Pick<Major, 'name'>,) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/majors/${id}`, data)
}

//DELETE
export const deleteMajor = (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/majors/${id}`)
}
