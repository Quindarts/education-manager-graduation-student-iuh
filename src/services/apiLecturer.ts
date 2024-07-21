import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig"
import { Lecturer } from "@/types/entities";

export const getLecturerByMajorId = (majorId: number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers?majorId=${majorId}`)
}

export const getAllLecturer = (termId: string, majorId: string, limit: number, page: number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers?limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}`);
}

//[Admin role]
export const searchLecturerAdmin = (termId: string, majorId: string, limit: number, page: number, searchField: 'all' | 'full_name' | 'username' | 'phone' | 'email', keywords: string | number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturers/query?searchField=${searchField}&keywords=${keywords}&limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}`);
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


