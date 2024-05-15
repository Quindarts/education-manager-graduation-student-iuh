import Major from "@/types/entities/major"
import axiosConfig from "./axiosConfig"

export const getAllMajor = () => {
    return axiosConfig.get("/api/v1/majors")
}
export const getMajorById = (id: number) => {
    return axiosConfig.get(`/api/v1/majors/${id}`)
}

export const createMajor = (data: Major) => {
    return axiosConfig.post("/api/v1/majors", data)
}

export const updateMajor = (data: Major, id: number) => {
    return axiosConfig.put(`/api/v1/majors/${id}`, data)
}
