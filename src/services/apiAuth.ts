import { IAuth, LoginResponse } from "@/types/entities/user"
import { API_ROUTER } from "./apiRoute"
import axiosConfig from "./axiosConfig"
import { AxiosResponse } from "axios"

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
export const updatePassword = async (data: { password: string; newPassword: string }) => {
    return await axiosConfig<AxiosResponse>({
        url: `/api/v1/lecturers/update-password`,
        method: 'put',
        data,
    });
}

export const logout = async () => {
    return await axiosConfig<AxiosResponse>({
        url: `/api/v1/lecturers/logout`,
        method: 'delete',
    })
}
export const forgotPass = async (username: string) => {
    return await axiosConfig<AxiosResponse>({
        url: `/api/v1/lecturers/forgot-password`,
        method: 'post',
        data: { username: username }
    })
}