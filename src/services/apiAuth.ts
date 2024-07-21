import { IAuth, LoginResponse } from "@/types/entities/user"
import { API_ROUTER } from "./apiRoute"
import axiosConfig from "./axiosConfig"

//[POST]
export const login = async (data: IAuth) => {
    return axiosConfig.post<LoginResponse, any>(API_ROUTER.LOGIN, data)
}

//[POST]
export const register = async (data: any) => {
    return axiosConfig.post(API_ROUTER.REGISTER, data)
}

//[GET]
export const getMe = async () => {
    return await axiosConfig.get('/api/v1/lecturers/me')
}