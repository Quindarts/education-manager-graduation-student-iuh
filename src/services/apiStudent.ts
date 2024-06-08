import axiosConfig from "./axiosConfig"

//[GET]
export const getAllStudent: any = async (termId: string | number, limit: number, page: number) => {
    return axiosConfig.get(`/api/v1/students?limit=${limit}&page=${page}&termId=${termId}`);
}

//[GET BY ID]
export const getStudentById: any = async (id: number) => {
    return axiosConfig.get(`/api/v1/students/${id}`)
}

//[Fix lecturer can updatePass.]
export const updatePasswordStudent: any = async (data: { password: string, newPassword: string }) => {
    return axiosConfig.post("/api/v1/students/update-password", data)
}
//[CREATE STUNDENT]
export const createStudent = async (data: any) => {
    return axiosConfig.post("/api/v1/students", data)
}
//[UPDATE STUDENT]

//[DELETE STUDENT]

//[CHANGE ACTIVE STUDENT]
