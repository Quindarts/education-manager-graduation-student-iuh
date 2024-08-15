import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

const URL = "/api/v1/notifications"

//[GET] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Get Notification
export const getMyNotification = () => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/notification-lecturers/me`)
}

//[GET] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Get Notification 
export const getNotificationsOfSearch = (limit: number, page: number, searchField: string, keywords: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}?limit=${limit}&page=${page}&searchField=${searchField}&keywords=${keywords}`)
}

export const getNotificationsOfLecturer = () => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/notification-lecturers`)
}

//[GET BY ID] [ADMIN, HEAD_LECTURER, HEAD_COURSE]
export const getMyNotificationById = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`)
}

//[POST] CREATE NOTIFICATIONS ( LECTURER OR STUDENT)
export const createNotifications = (title: string, content: string, termId: string) => {
    axiosConfig.post<ResponseType, any>("${URL}", { title: title, content: content, termId: termId })
}

//[PUT] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Update Notification(done)
export const updateNotification = (id: string, title: string, content: string) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}`, { title: title, content: content })
}

//[DELETE] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Delete Notification(done)
export const deleteNotificationLecturer = (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`${URL}/${id}`)
}

