import axiosConfig from "./axiosConfig";

export const getAllTopic = () => {
    return axiosConfig.get("");
}
export const getTopicById = (id: number) => {
    return axiosConfig.get(``)

}

