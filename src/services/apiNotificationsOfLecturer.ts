import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

const URL = "/api/v1/notification-lecturers"

//[GET] Get my notification
export const getMyNotification = (limit: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/me?limit=${limit}`)
}
//[GET] Get notification by id
export const getNotificationsOfLecturer = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`)
}

//[POST] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Create notification lecturer
export const createNotificationOfLecturerIds = (data: { title: string, content: string, lecturerIds: string[] }) => {
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

//[GROUP_LECTURER]
export const createNotificationOfGroupLecturer = (data: { title: string, content: string, groupLecturerIds: string[] }) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/group-lecturer`, data)
}