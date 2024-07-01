import axiosConfig from "./axiosConfig"

interface BodyEvaluation {
    termId: string;
    studentId: string;
    evaluationId: string;
    score: number;
}

export const getEvaluationsForScoring: any = (termId: string, type: string) => {
    return axiosConfig.get(`/api/v1/evaluations/scores?termId=${termId}&type=${type}`)
}

export const createTranscript: any = (data: BodyEvaluation) => {
    return axiosConfig.post("/api/v1/transcripts", data)
}

export const updateTranscript: any = (id: string, score: number) => {
    return axiosConfig.put(`/api/v1/transcripts/${id}`, { score: score })
}

export const getUnTranscriptStudentsByType: any = (termId: string, type: string) => {
    return axiosConfig.get(`/api/v1/transcripts/scoring/${type}/listStudentsNoTranscript?termId=${termId}`)
}


export const getTranscriptsByTypeEvaluation: any = (termId: string, type: string, studentId: string) => {
    return axiosConfig.get(`/api/v1/transcripts?termId=${termId}&type=${type}&studentId=${studentId}`)
}