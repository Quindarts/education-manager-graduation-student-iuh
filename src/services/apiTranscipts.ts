import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig"

export interface BodyEvaluation {
    termId?: string;
    studentId?: string;
    evaluationId?: string;
    score?: number;
}
const URL = `/api/v1/transcripts`
// [Get] statistic point of students
export const getSatisticPoints = async (termId: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/statistic?termId=${termId}`)
}
export const getTranscriptsToExport = async (termId: string, type: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/export?termId=${termId}&type=${type}`)
}
export const getTranscriptsByTypeAssign = async (termId: string, type: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/assign?termId=${termId}&type=${type}`)
}
//[GET] EVALUATION
export const getEvaluationsForScoring: any = (termId: string, type: string) => {
    return axiosConfig.get(`/api/v1/evaluations/scores?termId=${termId}&type=${type}`)
}

export const updateTranscript: any = (transcripts: BodyEvaluation[]) => {
    return axiosConfig.put(`${URL}/list`, { transcripts: transcripts })
}
// /api/v1/group-students/assign?termId=8fb8fbda-37ed-4861-a3a2-236500e62ee6&type=ADVISOR
export const getUnTranscriptGroupStudentsByType: any = (termId: string, type: string) => {
    // alert(type)
    return axiosConfig.get(`/api/v1/group-students/assign?termId=${termId}&type=${type}`)
}
export const getTranscriptOfStudentInGroup: any = (termId: string, type: string, groupStudentId: string) => {
    const typeSend = type.includes('REPORT') ? "REPORT" : type
    return axiosConfig.get(`${URL}?termId=${termId}&type=${typeSend}&groupStudentId=${groupStudentId}`)
}

export const getTranscriptsByTypeEvaluation: any = (termId: string, type: string, studentId: string) => {
    return axiosConfig.get(`${URL}?termId=${termId}&type=${type}&studentId=${studentId}`)
}

export const createTranscripts: any = (transcripts: BodyEvaluation[]) => {
    return axiosConfig.post(`${URL}/list`, { transcripts: transcripts })
}

export const getTranscriptByGroupStudent: any = (termId: string, groupStudentId: string) => {
    return axiosConfig.get(`${URL}/group-student?termId=${termId}&groupStudentId=${groupStudentId}`)
}
