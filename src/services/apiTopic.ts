import axiosConfig from "./axiosConfig";

interface TopicBodySend {
    name?: string;
    description?: string;
    quantityGroupMax?: number;
    standardOutput?: string;
    requireInput?: string;
    target?: string;
}
//[HEAD LEC, LEC]
export const getTopicById: any = async (topic_id: string | number) => {
    return axiosConfig.get(`/api/v1/topics/${topic_id}`)
}

//[HEAD LEC]
export const getTopicsByTermByMajor: any = async (termId: string, majorId: string) => {
    return axiosConfig.get(`/api/v1/topics?termId=${termId}&majorId=${majorId}`)
}

//[HEAD LEC, LEC]
export const getTopicsByLecturerByTerm: any = async (lecturerId: string | number, termId: string | number) => {
    return axiosConfig.get(`/api/v1/topics?lecturerId=${lecturerId}&termId=${termId}`)
}

//POST [HEAD LEC, LEC]
export const createTopicByToken: any = async (topic: TopicBodySend, termId: string) => {
    return axiosConfig.post(`/api/v1/topics?termId=${termId}`, topic);
}

//PUT [HEAD LEC, LEC]
export const updateTopicById: any = async (topicId: string | number, topic: TopicBodySend) => {
    return axiosConfig.put(`/api/v1/topics/${topicId}`, topic)
}

//PUT  [HEAD LEC]
export const updateStatusTopicById: any = async (topicId: string | number, data: { status: string, note: string }) => {
    return axiosConfig.put(`/api/v1/topics/${topicId}/status`, data)
}

//DELETE  [HEAD LEC, LEC]
export const deleteTopicById: any = async (topicId: string | number) => {

    return axiosConfig.delete(`/api/v1/topics/${topicId}`)
}
