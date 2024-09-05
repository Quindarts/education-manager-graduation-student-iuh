import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig"
import { Lecturer } from "@/types/entities";

const URL = `/api/v1/lecturers`
//[GET] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getLecturerByMajorId = (majorId: number) => {
    return axiosConfig.get<ResponseType, any>(`${URL}?majorId=${majorId}`)
}

//[GET] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getCountOfMajorLecturer = (majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/count?majorId=${majorId}`)
}

//[GET ALL] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getAllLecturer = (majorId: string, limit: number | string, page: number | string, searchField: string, sort: string, keywords: string) => {
    let searchFieldSend = searchField ? searchField : "full_name";
    let keywordSend = keywords ? keywords : ""
    let sortSend = sort ? sort : "ASC"
    return axiosConfig.get<ResponseType, any>(`${URL}/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&majorId=${majorId}&sort=${sortSend}`);
}

//[GET BY ID] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getLecturerById = (lecturerId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${lecturerId}`);
}
//[POST] [LECTURER] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getNewAccessToken = (data: { refreshToken: string }) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/refresh-token`, data)
}
//[POST]
export const getLecturerToExport = (majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/export?majorId=${majorId}`)
}

//[POST] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const createLecturer = (data: Partial<Lecturer>) => {
    return axiosConfig.post<ResponseType, any>(`${URL}`, data)
}

//[PUT] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const updateLecturerById = (lecturerId: string, data: Partial<Lecturer>) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${lecturerId}`, data);
}

//[PUT] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const deleteLecturerById = (lecturerId: string) => {
    return axiosConfig.delete<ResponseType, any>(`${URL}/${lecturerId}`)
}

//[PUT] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const resetPassword = (lecturerId: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/reset-password`, { id: lecturerId })
}
