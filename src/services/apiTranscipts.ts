import axiosConfig from "./axiosConfig"

export interface BodyEvaluation {
    termId?: string;
    studentId?: string;
    evaluationId?: string;
    score?: number;
}

export const getEvaluationsForScoring: any = (termId: string, type: string) => {
    return axiosConfig.get(`/api/v1/evaluations/scores?termId=${termId}&type=${type}`)
}

export const updateTranscript: any = (transcripts: BodyEvaluation[]) => {
    return axiosConfig.put(`/api/v1/transcripts/list`, { transcripts: transcripts })
}

export const getUnTranscriptGroupStudentsByType: any = (termId: string, type: string) => {
    return axiosConfig.get(`/api/v1/transcripts/scoring/${type}/listStudentsNoTranscript?termId=${termId}`)
}
export const getTranscriptOfStudentInGroup: any = (termId: string, type: string, groupStudentId: string) => {
    return axiosConfig.get(`/api/v1/transcripts?termId=${termId}&type=${type}&groupStudentId=${groupStudentId}`)
}

export const getTranscriptsByTypeEvaluation: any = (termId: string, type: string, studentId: string) => {
    return axiosConfig.get(`/api/v1/transcripts?termId=${termId}&type=${type}&studentId=${studentId}`)
}

export const createTranscripts: any = (transcripts: BodyEvaluation[]) => {
    return axiosConfig.post("/api/v1/transcripts/list", { transcripts: transcripts })
}

export const getTranscriptByGroupStudent: any = (termId: string, groupStudentId: string) => {
    return axiosConfig.get(`/api/v1/transcripts/group-student?termId=${termId}&groupStudentId=${groupStudentId}`)
}
