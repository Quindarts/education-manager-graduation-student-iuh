import axiosConfig from './axiosConfig'; // Make sure to adjust the import according to your project structure


//[GET LIST]
export const getListLecturerTerm: any = async (termId: string) => {
    return axiosConfig.get(`api/v1/lecturer-terms/list?termId=${termId}`);
}
//[CREATE]
export const createLecturerTerm: any = async (data: any) => {
    return axiosConfig.post("/api/v1/lecturer-terms", data);
}
//[UPDATE]
export const updateLecturerTermById: any = async (lecturerTermId: number | string, data: any) => {
    return axiosConfig.put(`/api/v1/lecturer-terms/${lecturerTermId}`, data);
}
//[DELETE]
export const deleteLecturerTermById: any = async (lecturerId: string, termId: string) => {
    return axiosConfig.delete(`/api/v1/lecturer-terms?lecturerId=${lecturerId}&termId=${termId}`);
}

export const importLecturerTerm: any = async (termId: number | string) => {
    return axiosConfig.post(`/api/v1/lecturer-terms/import`, { termId: termId })
}