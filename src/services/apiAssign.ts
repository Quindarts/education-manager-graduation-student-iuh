import axiosConfig from "./axiosConfig"

export const createAssignByType: any = async (type: string, data: { groupLecturerId: string, listGroupStudentId: string[] }) => {
    return axiosConfig.post(`/api/v1/assigns/type-evaluation/${type}`, data)
}
export const getGroupStudentNoAssign: any = async (type: string, termId: string) => {
    return axiosConfig.get(`/api/v1/assigns/type-evaluation/${type}/group-student/no-assign?termId=${termId}`);
}

const updateAssign = async () => { }
const getAllAssigns = async () => { }
const getAssignByLecturerId = async () => { }
const getAssignById = async () => { }
const getAssignByType = async () => { }


