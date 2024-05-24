import axiosConfig from "./axiosConfig";

interface TopicBodySend {
    name?: string;
    description?: string;
    quantityGroupMax?: number;
    standardOutput?: string;
    requireInput?: string;
    target?: string;
}

export const getTopicsByTermByMajor: any = async (termId: string | number, majorId: string | number) => {
    return axiosConfig.get(`/api/v1/topics?termId=${termId}&majorId=${majorId}`)

}

export const getTopicsByLecturerByTerm: any = async (lecturerId: string | number, termId: string | number) => {
    return axiosConfig.get(`/api/v1/topics?lecturerId=${lecturerId}&termId=${termId}`)
}

//POST
export const createTopicByToken: any = async (topic: TopicBodySend) => {
    return axiosConfig.post("/api/v1/topics", topic);
}

//PUT
export const updateTopicById: any = async (topicId: string | number, topic: TopicBodySend) => {
    return axiosConfig.put(`/api/v1/topics/${topicId}`, topic)
}

//DELETE
export const deleteTopicById: any = async (topicId: string | number) => {

    return axiosConfig.delete(`/api/v1/topics/${topicId}`)
}
