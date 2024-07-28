import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

export const getNotificationsOfLecturer = () => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/notification-lecturers`)
}

export const getMyNotification = () => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/notification-lecturers/me`)
}
export const getMyNotificationById = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/notification-lecturers/${id}`)
}
export const deleteNotificationLecturer = (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/notification-lecturers/${id}`)
}

export const updateNotificationLecturer = (id: string, data: { message: string, type: string, lecturerId: string }) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/notification-lecturers/${id}`, data)

}
export const upateReadStatusNotification = (id: string) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/notification-lecturers/${id}/read`)

}
export const createNotificationOfLecturerId = (data: { message: string, type: string, lecturerId: string }) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/notification-lecturers`, data)

}

export const createAllNotificationStudentTerms = (message: string, termId: string) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/notification-students/terms?termId=${termId}`, { message: message })
}
export const createAllNotificationLecturerTerms = (message: string, termId: string) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/notification-lecturers/terms?termId=${termId}`, { message: message })
}






