import axiosConfig from "./axiosConfig"

export const getLecturerByMajorId = (majorId: number) => {
    return axiosConfig.get(`/api/v1/lecturers?majorId=${majorId}`)
}

export const getAllLecturer: any = () => {
    return axiosConfig.get("/api/v1/lecturers");
}

export const getLecturerById: any = (lecturer_id: number) => {
    return axiosConfig.get(`/api/v1/lecturers/${lecturer_id}`);
}
