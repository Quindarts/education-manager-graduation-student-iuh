import axiosConfig from "./axiosConfig"

export const getGroupStudentByTerm: any = (term_id: number) => {
    return axiosConfig.get(`/api/v1/group-students?termId=${term_id}`)
}