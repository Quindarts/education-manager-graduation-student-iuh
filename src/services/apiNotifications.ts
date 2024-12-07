import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

const URL = "/api/v1/notifications"



//[GET] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Get Notification 
export const getNotificationsOfFilter = (limit: number | string, page: number | string, searchField: string, keywords: string) => {
    const searchFieldSender = searchField ? searchField : "title"
    const keywordsSender = keywords ? keywords : ""
    return axiosConfig.get<ResponseType, any>(`${URL}?limit=${limit}&page=${page}&searchField=${searchFieldSender}&keywords=${keywordsSender}`)
}


//[GET BY ID] [ADMIN, HEAD_LECTURER, HEAD_COURSE]
export const getNotificationById = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`)
}

//[POST] CREATE NOTIFICATIONS ( LECTURER OR STUDENT)
export const createNotifications: any = (title: string, content: string, termId: string) => {
    axiosConfig.post<ResponseType, any>("${URL}", { title: title, content: content, termId: termId })
}

//[PUT] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Update Notification(done)
export const updateNotification: any = (id: string, title: string, content: string) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}`, { title: title, content: content })
}

//[DELETE] [ADMIN, HEAD_LECTURER, HEAD_COURSE] Delete Notification(done)
export const deleteNotifications = (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`${URL}/${id}`)
}

