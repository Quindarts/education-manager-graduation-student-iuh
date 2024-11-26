import { ResponseType } from '@/types/axios.type';
import axiosConfig from './axiosConfig'; // Make sure to adjust the import according to your project structure
const URL = '/api/v1/lecturer-terms'

//[Admin role]
export const getAllLecturerTermByParams = (termId: string, limit: number | string, page: number | string, searchField: string, sort: string, keywords: string) => {
    let searchFieldSend = searchField ? searchField : "full_name";
    let keywordSend = keywords ? keywords : ""
    let sortSend = sort ? sort : "ASC"
    return axiosConfig.get<ResponseType, any>(`${URL}/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&termId=${termId}&sort=${sortSend}`);
}

//[GET] 
export const getCountOfLecturerTerm: any = (termId: string) => {
    return axiosConfig.get(`${URL}/count?termId=${termId}`)
}

export const getListLecturerTermToAdding = async (termId: string, majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/to-adding?termId=${termId}&majorId=${majorId}`);
}

//[GET BY ID] [HEAD LECTURER] [ADMIN] [HEAD COURSE]
export const getLecturerTermById = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`);
}

//[GET LIST]
export const getListLecturerTerm: any = async (termId: string, searchField: string) => {
    const searchFieldSend = searchField ? searchField : "default";
    return axiosConfig.get<ResponseType, any>(`${URL}?termId=${termId}&searchField=${searchFieldSend}`);
}
//[CREATE]
export const createLecturerTerm: any = async (data: { lecturerId: string, termId: string }) => {
    return axiosConfig.post(`${URL}`, data);
}
export const getLecturerTermToExport: any = async (termId: string) => {
    return axiosConfig.get(`${URL}/export?termId=${termId}`)
}
//[UPDATE]
export const updateLecturerTermById: any = async (lecturerTermId: number | string, data: any) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${lecturerTermId}`, data);
}
//[DELETE]
export const deleteLecturerTermById: any = async (id: string) => {
    return axiosConfig.delete<ResponseType, any>(`${URL}/${id}`);
}

export const importLecturerTerm: any = async (termId: string, majorId: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/import`, { termId: termId, majorId: majorId })
}