import axiosConfig from "./axiosConfig";

interface TopicBodySend {
    name?: string;
    description?: string;
    quantityGroupMax?: number;
    standardOutput?: string;
    requireInput?: string;
    target?: string;
}

export const getTopicById: any = async (topic_id: string | number) => {
    return axiosConfig.get(`/api/v1/topics/${topic_id}`)
}

export const getTopicsByTermByMajor: any = async (termId: string | number, majorId: string | number) => {
    return axiosConfig.get(`/api/v1/topics?termId=${termId}&majorId=${majorId}`)
}


export const getTopicsByLecturerByTerm: any = async (lecturerId: string | number, termId: string | number) => {
    return axiosConfig.get(`/api/v1/topics?lecturerId=${lecturerId}&termId=${termId}`)
}

//POST
export const createTopicByToken: any = async (topic: TopicBodySend, termId: string) => {
    return axiosConfig.post(`/api/v1/topics?termId=${termId}`, topic);
}

//PUT
export const updateTopicById: any = async (topicId: string | number, topic: TopicBodySend) => {
    return axiosConfig.put(`/api/v1/topics/${topicId}`, topic)
}

//PUT
export const updateStatusTopicById: any = async (topicId: string | number, data: { status: string }) => {
    return axiosConfig.put(`/api/v1/topics/${topicId}/status`, data)
}

//DELETE
export const deleteTopicById: any = async (topicId: string | number) => {

    return axiosConfig.delete(`/api/v1/topics/${topicId}`)
}
