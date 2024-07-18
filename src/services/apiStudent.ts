import axiosConfig from "./axiosConfig"

//[Admin role]
export const searchStudentAdmin: any = (termId: string | number, limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email', keywords: string | number) => {
    return axiosConfig.get(`/api/v1/students/query?searchField=${searchField}&keywords=${keywords}&limit=${limit}&page=${page}&termId=${termId}`);
}


//[GET]
export const getAllStudentByMajor: any = async (termId: string, majorId: string, limit: number, page: number) => {
    return axiosConfig.get(`/api/v1/students?limit=${limit}&page=${page}&termId=${termId}&majorId=${majorId}`);
}

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

//[LOCK ACCOUNT]
export const lockOnlyStudent: any = async (id: string, status: boolean) => {
    const locker = status ? 'lock' : 'unlock'
    return axiosConfig.post(`/api/v1/students/${locker}`, { id: id })
}

//[CREATE STUNDENT]
export const createStudent: any = async (data: any) => {
    return axiosConfig.post("/api/v1/students", data)
}

//[DELETE STUNDENT]
export const deleteStudent: any = async (id: string) => {
    return axiosConfig.delete(`/api/v1/students/${id}`)
}


//[UPDATE STUDENT]
export const updateStudent: any = async (id: string | number, data: any) => {
    return axiosConfig.put(`/api/v1/students/${id}`, data)
}
//[UPDATE STUDENT]
export const updateStatusStudent: any = async (id: string, data: { status: string, termId: string }) => {
    return axiosConfig.put(`/api/v1/students/${id}/status`, data)
}


//[DELETE STUDENT]

//[CHANGE ACTIVE STUDENT]

//
export const resetPasswordStudent: any = async (id: string) => {
    return axiosConfig.post(`api/v1/students/reset-password`, { id: id })
}

