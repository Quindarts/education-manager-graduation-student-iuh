import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig";
const URL = '/api/v1/articles';

// [HEAD_LECTURER,HEAD_COURSE] Get article by Id(done)
export const getArticleById = async (id: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/${id}`);
};

// [HEAD_LECTURER,HEAD_COURSE] Update status article(done)
export const updateStatusArticle = async (id: string, status: string, comment: string, bonusScore: number): Promise<ResponseType> => {
    return await axiosConfig.put(`${URL}/${id}/status`, { status: status, comment: comment, bonusScore });
};
//[HEAD_LECTURER,HEAD_COURSE] Get articles(done)
export const getArticles = async (termId: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}?termId=${termId}`);
};

//[LECTURER] get articles by lecturer(done)
export const getArticlesByLecturer = async (termId: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/lecturer?termId=${termId}`);
}