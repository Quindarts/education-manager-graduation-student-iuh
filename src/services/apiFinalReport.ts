import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig";

const URL = '/api/v1/final-reports';

// [HEAD_LECTURER,HEAD_COURSE] Get FinalReport by Id(done)
export const getFinalReportById = async (id: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/${id}`);
};

// [HEAD_LECTURER,HEAD_COURSE] Update status FinalReport(done)
export const updateCommentFinalReport = async (id: string, comment: string): Promise<ResponseType> => {
    return await axiosConfig.put(`${URL}/${id}/comment`, { comment: comment });
};
//[HEAD_LECTURER,HEAD_COURSE] Get FinalReports(done)
export const getFinalReports = async (termId: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}?termId=${termId}`);
};
//[LECTURER]
export const getFinalReportsByLecturerId = async (termId: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/lecturer?termId=${termId}`);
}
