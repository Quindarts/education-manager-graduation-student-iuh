import axiosConfig from "./axiosConfig";

export enum TypeEvaluation {
    SESSION_HOST = "SESSION_HOST",
    ADVISOR = "ADVISOR",
    REVIEWER = "REVIEWER"
}
export type EvaluationDataRequestType = {
    type: TypeEvaluation;
    termId: string;
    name?: string;
    scoreMax?: number;
    description?: string
}


export const getEvaluationById: any = async (id: number | string) => {
    return axiosConfig.get(`/api/v1/evaluations/${id}`)
}

export const getEvaluationByTermByType: ReturnType<any> = async (termId: string, type: TypeEvaluation) => {
    return axiosConfig.get(`/api/v1/evaluations?termId=${termId}&type=${type}`)
}

// [CREATE]
export const createEvaluation: any = async (data: EvaluationDataRequestType) => {
    return axiosConfig.post(`api/v1/evaluations`, data)
}

// [UPDATE]
export const updateEvaluation = async (id: string, data: EvaluationDataRequestType) => {
    return axiosConfig.put(`api/v1/evaluations/${id}`, data)
}

//[DELETE]
export const deleteEvaluation = async (id: string | number) => {
    return axiosConfig.delete(`api/v1/evaluations/${id}`)
}

