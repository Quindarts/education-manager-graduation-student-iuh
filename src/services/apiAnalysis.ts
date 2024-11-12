import { ResponseType } from "@/types/axios.type"
import axiosConfig from "./axiosConfig"
import { config } from "dotenv"
import { getValueFromLocalStorage } from "@/utils/localStorage"

const URL = '/api/v1/analysis'
//[HEAD_LECTURER,HEAD_COURSE] Get keywords
const getCategories: any = async () => {
    return await axiosConfig.get(`${URL}`)
}

axiosConfig.interceptors.request.use((config) => {
    config.timeout = 60000
    const accessToken = getValueFromLocalStorage("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
},
    (error) => {
        return Promise.reject(error);
    },
)

// [HEAD_LECTURER,HEAD_COURSE] Analysis of topics
const createEntitiesAnalysis: any = async (termId: string, category: string[], type: 'lecturers' | 'topics') => {
    return await axiosConfig.post(`${URL}/${type}`, {
        termId: termId,
        category: category
    })
}

export {
    getCategories,
    createEntitiesAnalysis
}