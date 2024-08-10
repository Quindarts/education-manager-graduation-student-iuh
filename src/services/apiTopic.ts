import { Topic, TopicBodyRequestType } from "@/types/entities/topic";
import axiosConfig from "./axiosConfig";
import { ResponseType } from "@/types/axios.type";


//[HEAD LEC, LEC]
export const getTopicById = async (topicId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/topics/${topicId}`)
}

export const searchTopics = async (termId: string, keywords: string, searchField: string, limit: number | string, page: number | string) => {
    let searchFieldSend = searchField ? searchField : "name";
    let keywordSend = keywords ? keywords : ""
    return axiosConfig.get<ResponseType, any>(`/api/v1/topics/query?termId=${termId}&keywords=${keywordSend}&searchField=${searchFieldSend}&limit=${limit}&page=${page}`)
}
//[HEAD LEC]
export const getTopicsByTermByMajor = async (termId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/topics?termId=${termId}`)
}

export const updateAllQuantityGroupMax = async (termId: string, quantityGroupMax: number) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/topics/quantity-group-max?termId=${termId}`, { quantityGroupMax: quantityGroupMax })
}

//[HEAD LEC, LEC]
export const getTopicsByLecturerByTerm = async (lecturerId: string, termId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/topics?lecturerId=${lecturerId}&termId=${termId}`)
}

//POST [HEAD LEC, LEC]
export const createTopicByToken = async (topic: TopicBodyRequestType, termId: string) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/topics?termId=${termId}`, topic);
}

//PUT [HEAD LEC, LEC]
export const updateTopicById = async (topicId: string, topic: TopicBodyRequestType) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/topics/${topicId}`, topic)
}

//PUT [HEAD LEC, LEC]
export const updateQuantityGroupMax = async (topicId: string, topic: TopicBodyRequestType) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/topics/${topicId}`, topic)
}
//PUT  [HEAD LEC]
export const updateStatusTopicById = async (topicId: string, data: Pick<Topic, 'status' | 'note'>) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/topics/${topicId}/status`, data)
}

//DELETE  [HEAD LEC, LEC]
export const deleteTopicById = async (topicId: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/topics/${topicId}`)
}
