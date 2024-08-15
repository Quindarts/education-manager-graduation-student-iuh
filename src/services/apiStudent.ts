import { Student } from "@/types/entities";
import axiosConfig from "./axiosConfig"

//[GET] STUDENT
export const getCountOfStudent: any = (termId: string) => {
    return axiosConfig.get(`/api/v1/students/count?termId=${termId}`)
}

//[GET]
export const getStudentsAssignTopic: any = (termId: string, keywords: string, searchField: string) => {
    const searchFieldSender = searchField ? searchField : 'studentName'
    const keywordsSender = keywords ? keywords : ""
    return axiosConfig.get(`/api/v1/students/search?termId=${termId}&keywords=${keywordsSender}&searchField=${searchFieldSender}`)
}

//[Admin role]
export const getStudentOfSearch: any = (termId: string, majorId: string, limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email', keywords: string) => {
    let searchFieldSend = searchField ? searchField : "username";
    let keywordSend = keywords ? keywords : ""
    return axiosConfig.get<ResponseType, any>(`/api/v1/students/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}`);
}
//[GET]
export const getStudentsNoHaveGroup: any = (termId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/students/no-have-group?termId=${termId}`)
}
//[GET]
export const getAllStudentByMajor = async (termId: string, majorId: string, limit: number, page: number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/students?limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}`);
}

//[GET]
export const getAllStudent = async (termId: string, limit: number, page: number) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/students?limit=${limit}&page=${page}&termId=${termId}`);
}

//[GET BY ID]
export const getStudentById = async (id: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/students/${id}`)
}

//[Fix lecturer can updatePass.]
export const updatePasswordStudent = async (data: { password: string, newPassword: string }) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/students/update-password", data)
}


//[LOCK ACCOUNT]
export const lockOnlyStudent = async (id: string, status: boolean) => {
    const locker = status ? 'lock' : 'unlock'
    return axiosConfig.post<ResponseType, any>(`/api/v1/students/${locker}`, { id: id })
}

//[CREATE STUNDENT]
export const createStudent = async (data: Partial<Student>) => {
    return axiosConfig.post<ResponseType, any>("/api/v1/students", data)
}

//[DELETE STUNDENT]
export const deleteStudent = async (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/students/${id}`)
}


//[UPDATE STUDENT]
export const updateStudent = async (id: string | number, data: Partial<Student>) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/students/${id}`, data)
}
//[UPDATE STUDENT]
export const updateStatusStudent = async (id: string, data: { status: string, termId: string }) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/students/${id}/status`, data)
}


//[DELETE STUDENT]

//[CHANGE ACTIVE STUDENT]

export const resetPasswordStudent: any = async (id: string) => {
    return axiosConfig.post<ResponseType, any>(`api/v1/students/reset-password`, { id: id })
}

