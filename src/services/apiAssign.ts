import axiosConfig from "./axiosConfig"

const URL = "/api/v1/assigns"

export const createAssignByType: any = async (data: { groupLecturerId: string, listGroupStudentId: string[], type: string }) => {
    return axiosConfig.post(`${URL}`, data)
}

export const updateAssignByType: any = async (data: { groupLecturerId: string, listGroupStudentId: string[], type: string }) => {
    return axiosConfig.put(`${URL}`, data)
}
export const getGroupStudentNoAssign: any = async (type: string, termId: string) => {
    return axiosConfig.get(`${URL}/type-evaluation/${type}/group-student/no-assign?termId=${termId}`);
}

export const getExportAssignGroup: any = async (termId: string, type: string) => {
    return axiosConfig.get(`${URL}/export?termId=${termId}&type=${type}`)
}

export const getExportAssignGrByLecturerId: any = async (termId: string, type: string) => {
    return axiosConfig.get(`${URL}/export-me?termId=${termId}&type=${type}`)
}
