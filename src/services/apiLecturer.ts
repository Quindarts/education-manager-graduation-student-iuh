import axiosConfig from "./axiosConfig"

export const getLecturerByMajorId = (majorId: number) => {
    return axiosConfig.get(`/api/v1/lecturers?majorId=${majorId}`)
}

export const getAllLecturer: any = (termId: string | number, limit: number, page: number) => {
    return axiosConfig.get(`/api/v1/lecturers?limit=${limit}&page=${page}&termId=${termId}`);
}

export const getLecturerById: any = (lecturer_id: number | string) => {
    return axiosConfig.get(`/api/v1/lecturers/${lecturer_id}`);
}

export const getNewAccessToken: any = (data: { refreshToken: string }) => {
    return axiosConfig.post("/api/v1/lecturers/refresh-token", data)
}

//Role header lecturer
export const createLecturer: any = (data: any) => {
    return axiosConfig.post("/api/v1/lecturers", data)
}

export const updateLecturerById: any = (lecturer_id: number | string, data: any) => {
    return axiosConfig.put(`/api/v1/lecturers/${lecturer_id}`, data);
}

export const deleteLecturerById: any = (lecturer_id: number | string) => {
    return axiosConfig.delete(`/api/v1/lecturers/${lecturer_id}`)
}


