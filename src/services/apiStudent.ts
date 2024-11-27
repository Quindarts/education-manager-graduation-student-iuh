import { Student } from "@/types/entities";
import axiosConfig from "./axiosConfig"
import { EnumStatusStudent } from "@/types/enum";
import { ResponseType } from "@/types/axios.type";
const URL = `/api/v1/students`
// [Get] statistic students(done) pass or fail status
export const getStatisticStatusOfStudents = async (termId: string, status: EnumStatusStudent): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/count?termId=${termId}&status=${status}`)
}
//[GET] STUDENT
export const getCountOfStudent: any = (termId: string) => {
    return axiosConfig.get(`${URL}/count?termId=${termId}`)
}
//[GET] STUDENT
export const getDemonstrateStudentScore = async (termId: string): Promise<ResponseType> => {
    return axiosConfig.get(`${URL}/export-test?termId=${termId}`)
}

//[GET]
export const getSearchStudentBasic: any = (termId: string, keywords: string, searchField: string) => {
    const searchFieldSender = searchField ? searchField : 'studentName'
    const keywordsSender = keywords ? keywords : ""
    return axiosConfig.get(`${URL}/search?termId=${termId}&keywords=${keywordsSender}&searchField=${searchFieldSender}`)
}
//[GET]
export const getStudentsToExport: any = (termId: string, majorId: string) => {
    return axiosConfig.get(`${URL}/export?termId=${termId}&majorId=${majorId}`)
}

//[Admin role]
export const getStudentOfSearch: any = (termId: string, majorId: string, limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email', sort: string, keywords: string) => {
    let searchFieldSend = searchField ? searchField : "full_name";
    let keywordSend = keywords ? keywords : ""
    let sortSend = sort ? sort : "ASC"
    return axiosConfig.get<ResponseType, any>(`${URL}/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}}&sort=${sortSend}`);
}
//[GET]
export const getStudentsNoHaveGroup: any = (termId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/no-have-group?termId=${termId}`)
}
//[GET]
export const getAllStudentByMajor = async (termId: string, majorId: string, limit: number, page: number) => {
    return axiosConfig.get<ResponseType, any>(`${URL}?limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}`);
}

//[GET]
export const getAllStudent = async (termId: string, limit: number, page: number) => {
    return axiosConfig.get<ResponseType, any>(`${URL}?limit=${limit}&page=${page}&termId=${termId}`);
}

//[GET BY ID]
export const getStudentById = async (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`)
}

//[Fix lecturer can updatePass.]
export const updatePasswordStudent = async (data: { password: string, newPassword: string }) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/update-password`, data)
}


//[LOCK ACCOUNT]
export const lockOnlyStudent = async (id: string, status: boolean) => {
    const locker = status ? 'lock' : 'unlock'
    return axiosConfig.post<ResponseType, any>(`${URL}/${locker}`, { id: id })
}
//[LOCK ACCOUNT]
export const lockAllStudents = async (termId: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/lock`, { termId })
}

//[CREATE STUNDENT]
export const createStudent = async (data: Partial<Student>) => {
    return axiosConfig.post<ResponseType, any>(`${URL}`, data)
}

//[DELETE STUNDENT]
export const deleteStudent = async (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`${URL}/${id}`)
}


//[UPDATE STUDENT]
export const updateStudent = async (id: string | number, data: Partial<Student>) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}`, data)
}
//[UPDATE STUDENT]
export const updateStatusStudent = async (id: string, data: { status: string, termId: string }) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}/status`, data)
}


//[DELETE STUDENT]

//[CHANGE ACTIVE STUDENT]

export const resetPasswordStudent: any = async (id: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/reset-password`, { id: id })
}

