import axiosConfig from "./axiosConfig"

export enum TypeTermStatus {
    CHOOSE_GROUP = 'choose-group',
    CHOOSE_TOPIC = 'choose-topic',
    DISCUSSION = 'discussion',
    REPORT = 'report',
    PUBLIC_RESULT = 'public-result'
}

export interface TermDataRequest {
    name: string;
    startDate: string;
    endDate: string;
    majorId: string
}

export const getAllTerm: any = () => {
    return axiosConfig.get("/api/v1/terms");
}
export const getAllTermByMajor: any = (majorId: string) => {
    return axiosConfig.get(`/api/v1/terms/major/${majorId}`);
}

export const getTermById: any = (id: number) => {
    return axiosConfig.get(`/api/v1/terms/${id}`)
}

export const getCurrentTerm: any = (majorId: string) => {
    return axiosConfig.get(`/api/v1/terms/now?majorId=${majorId}`)
}


export const getTermDetailWithType: any = (id: number | string, type: TypeTermStatus) => {
    return axiosConfig.get(`/api/v1/terms/${id}/${type}`)
}

export const updateTermWithType: any = (id: number | string, type: TypeTermStatus, data: { startDate: string, endDate: string }) => {
    return axiosConfig.put(`/api/v1/terms/${id}/${type}`, data)
}

export const createTerm = (data: TermDataRequest) => {
    return axiosConfig.post(`/api/v1/terms`, data);
}

export const updateTermById: any = (id: number | string, data: { startDate: string, endDate: string }) => {
    return axiosConfig.put(`/api/v1/terms/${id}`, data);
}

//delete term BE
export const deleteTerm = (id: number | string) => {
    return axiosConfig.post(`/api/v1/terms/${id}`);
}
