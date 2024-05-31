import axiosConfig from "./axiosConfig";

enum TypeEvaluation {
    SESSION_HOST = "SESSION_HOST",
    ADVISOR = "ADVISOR",
    REVIEWER = "REVIEWER"
}
type EvaluationDataRequestType = {
    type: TypeEvaluation;
    termId: string;
    name?: string;
    scoreMax?: number;
    description?: string
}

//[GET]
export const getEvaluation = async () => {
    return axiosConfig.get("", {})
}

export const getEvaluationById = async (evaluation_id: number | string) => {
    return axiosConfig.get(`/api/v1/evaluations/${evaluation_id}`)
}

export const getEvaluationByTermByType = async (term_id: number | string, type: TypeEvaluation) => {
    return axiosConfig.get(`/api/v1/evaluations?${term_id}&${type}`)
}

// [CREATE]
export const createEvaluation = async (data: EvaluationDataRequestType) => {
    return axiosConfig.post(`api/v1/evaluations`, data)
}

// [UPDATE]
export const updateEvaluation = async (data: EvaluationDataRequestType) => {
    return axiosConfig.put(`api/v1/evaluations`, data)
}

//[DELETE]
export const deleteEvaluation = async (id: string | number) => {
    return axiosConfig.delete(`api/v1/evaluations/${id}`)
}

