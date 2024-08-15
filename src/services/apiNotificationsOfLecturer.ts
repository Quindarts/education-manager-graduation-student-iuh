import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

const URL = "/api/v1/notifications-lecturers"

//[GET] Get my notification
export const getMyNotification = () => {
    return axiosConfig.get<ResponseType, any>(`${URL}/me`)
}
//[GET] Get notification by id
export const getNotificationsOfLecturer = () => {
    return axiosConfig.get<ResponseType, any>(`${URL}`)
}

//[POST] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Create notification lecturer
export const createNotificationOfLecturerId = (data: { title: string, content: string, lecturerId: string }) => {
    return axiosConfig.post<ResponseType, any>(`${URL}`, data)
}
//[POST] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Create notification to all lecturerTerm
export const createAllNotificationLecturerTerms = (title: string, content: string, termId: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/terms?termId=${termId}`, { title: title, content: content, termId: termId })
}

//[PUT] Update read status
export const upateReadStatusNotification = (id: string) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}/read`)
}


