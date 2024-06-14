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
}

export const getAllTerm: any = () => {
    return axiosConfig.get("/api/v1/terms");
}
export const getTermById: any = (id: number) => {
    return axiosConfig.get(`/api/v1/terms/${id}`)
}

export const getCurrentTerm: any = () => {
    return axiosConfig.get("/api/v1/terms/now")
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

export const updateTermById: any = (id: number | string, data: { startDate: string, endDate: string }) =>{
    return axiosConfig.put(`/api/v1/terms/${id}`, data);
}

//delete term BE
export const deleteTerm = (id: number | string) => {
    return axiosConfig.post(`/api/v1/terms/${id}`);
}
