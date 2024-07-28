import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig"
import { Lecturer } from "@/types/entities";

export const getLecturerByMajorId = (majorId: number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers?majorId=${majorId}`)
}



//[Admin role]
export const getAllLecturer = (majorId: string, limit: number | string, page: number | string, searchField: string, keywords: string) => {
    let searchFieldSend = searchField ? searchField : "username";
    let keywordSend = keywords ? keywords : ""
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&majorId=${majorId}`);
}

export const getLecturerById = (lecturerId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers/${lecturerId}`);
}

export const getNewAccessToken = (data: { refreshToken: string }) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/lecturers/refresh-token", data)
}

//Role header lecturer
export const createLecturer = (data: Partial<Lecturer>) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/lecturers", data)
}

export const updateLecturerById = (lecturerId: string, data: Partial<Lecturer>) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/lecturers/${lecturerId}`, data);
}

export const deleteLecturerById = (lecturerId: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/lecturers/${lecturerId}`)
}


