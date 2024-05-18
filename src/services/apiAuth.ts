import { API_ROUTER } from "./apiRoute"
import axiosConfig from "./axiosConfig"


export const login  = async (data: any) => {
    return axiosConfig.post(API_ROUTER.LOGIN, data)
}
export const register = async (data: any) => {
    return axiosConfig.post(API_ROUTER.REGISTER, data)
}