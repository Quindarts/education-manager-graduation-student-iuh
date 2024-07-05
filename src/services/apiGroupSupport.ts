import axiosConfig from "./axiosConfig"

export const getMyGroupSupport = (termId: string): any => {
    return axiosConfig.get(`/api/v1/transcripts/lecturer-supports?termId=${termId}`)
}
export const getStudentMemberToScoring = (termId: string): any => {
    return axiosConfig.get(`/api/v1/transcripts/lecturer-supports/group-student-to-scoring?termId=${termId}`)
}