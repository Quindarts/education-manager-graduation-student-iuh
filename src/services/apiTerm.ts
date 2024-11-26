import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig"
import { Term, } from "@/types/entities/term";

export enum TypeTermStatus {
    CHOOSE_GROUP = 'choose-group',
    CHOOSE_TOPIC = 'choose-topic',
    DISCUSSION = 'discussion',
    REPORT = 'report',
    PUBLIC_RESULT = 'public-result',
    PUBLIC_TOPIC = "public-topic"
}

const URL = "/api/v1/terms"

export const getAllTerm = () => {
    return axiosConfig.get<ResponseType, any>(`${URL}`);
}
export const getAllTermByMajor = (majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/major/${majorId}`);
}

export const getTermById = (id: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}`)
}

export const getCurrentTerm = (majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/now?majorId=${majorId}`)
}

export const getTermsByLecturer = () => {
    return axiosConfig.get<ResponseType, any>(`${URL}/lecturer`)
}


export const getTermDetailWithType = (id: string, type: TypeTermStatus) => {
    return axiosConfig.get<ResponseType, any>(`${URL}/${id}/${type}`)
}

export const updateTermWithType = (id: string, type: TypeTermStatus, data: Pick<Term, 'startDate' | 'endDate'>) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}/${type}`, data)
}

export const createTerm = (data: Pick<Term, 'name' | 'startDate' | 'endDate' | 'majorId'>) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/terms`, data);
}

export const updateTermById = (id: string, data: Pick<Term, 'startDate' | 'endDate'>) => {
    return axiosConfig.put<ResponseType, any>(`${URL}/${id}`, data);
}

//delete term BE
export const deleteTerm = (id: string) => {
    return axiosConfig.post<ResponseType, any>(`${URL}/${id}`);
}
