import axiosConfig from "./axiosConfig"

export const getAllTerm: any = () => {
    return axiosConfig.get("/api/v1/terms");
}
export const getTermById: any = (id: number) => {
    return axiosConfig.get(`terms/${id}`)
}

export const getCurrentTerm: any = () => {
    return axiosConfig.get("/api/v1/terms/now")
}  