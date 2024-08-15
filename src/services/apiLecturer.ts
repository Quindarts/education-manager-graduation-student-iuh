import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig"
import { Lecturer } from "@/types/entities";

//[GET] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getLecturerByMajorId = (majorId: number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers?majorId=${majorId}`)
}

//[GET] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getCountOfMajorLecturer = (majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers/count?majorId=${majorId}`)
}

//[GET ALL] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getAllLecturer = (majorId: string, limit: number | string, page: number | string, searchField: string, keywords: string) => {
    let searchFieldSend = searchField ? searchField : "username";
    let keywordSend = keywords ? keywords : ""
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&majorId=${majorId}`);
}

//[GET BY ID] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getLecturerById = (lecturerId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers/${lecturerId}`);
}
//[POST] [LECTURER] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getNewAccessToken = (data: { refreshToken: string }) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/lecturers/refresh-token", data)
}

//[POST] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const createLecturer = (data: Partial<Lecturer>) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/lecturers", data)
}

//[PUT] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const updateLecturerById = (lecturerId: string, data: Partial<Lecturer>) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/lecturers/${lecturerId}`, data);
}

//[PUT] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const deleteLecturerById = (lecturerId: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/lecturers/${lecturerId}`)
}

//[PUT] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const resetPassword = (lecturerId: string) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/lecturers/reset-password`, { id: lecturerId })
}
