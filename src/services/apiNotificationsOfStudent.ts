import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"

const URL = "/api/v1/notification-students"

//[GET] Get my notification
export const getMyNotification = () => {
    return axiosConfig.get<ResponseType, any>(`${URL}/me`)
}
//[GET] Get notification by id
export const getNotificationsOfStudent = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`)
}

//[POST] [ADMIN, HEAD_Student, HEAD_COURSE] Create notification Student
export const createNotificationOfStudentId = (data: { title: string, content: string, studentId: string }) => {
    return axiosConfig.post<ResponseType, any>(`${URL}`, data)
}

//[POST] [ADMIN, HEAD_Student, HEAD_COURSE] Create notification to all StudentTerm
export const createAllNotificationStudentTerms = (title: string, content: string, termId: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/terms`, { title: title, content: content, termId: termId })
}

//[PUT] Update read status
export const upateReadNotificationStudent = (id: string) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}/read`)
}


