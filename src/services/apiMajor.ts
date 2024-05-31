import Major from "@/types/entities/major"
import axiosConfig from "./axiosConfig"
//[GET]
export const getAllMajor = () => {
    return axiosConfig.get("/api/v1/majors")
}
//[GET]
export const getMajorById = (id: number) => {
    return axiosConfig.get(`/api/v1/majors/${id}`)
}
//[POST]
export const createMajor = (data: Major) => {
    return axiosConfig.post("/api/v1/majors", data)
}

//UPDATE
export const updateMajor = (data: Major, id: number) => {
    return axiosConfig.put(`/api/v1/majors/${id}`, data)
}
