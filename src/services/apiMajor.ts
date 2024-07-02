import Major from "@/types/entities/major"
import axiosConfig from "./axiosConfig"
//[GET]
export const getAllMajor = (): any => {
    return axiosConfig.get("/api/v1/majors")
}
//[GET]
export const getMajorById = (id: string) => {
    return axiosConfig.get(`/api/v1/majors/${id}`)
}
//[POST]
export const createMajor = (data: Pick<Major, 'name'>) => {
    return axiosConfig.post("/api/v1/majors", data)
}

//UPDATE
export const updateMajor = (id: string, data: Pick<Major, 'name'>,) => {
    return axiosConfig.put(`/api/v1/majors/${id}`, data)
}

//DELETE
export const deleteMajor = (id: string) => {
    return axiosConfig.delete(`/api/v1/majors/${id}`)
}
