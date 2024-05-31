import axiosConfig from './axiosConfig'; // Make sure to adjust the import according to your project structure

//[GET]
export const getLecturerTermByTermId = async (termId: number | string) => {
    return axiosConfig.get(`/api/v1/lecturer-terms?termId=${termId}`);
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
export const deleteLecturerTermById: any = async (lecturerTermId: number | string) => {
    return axiosConfig.delete(`/api/v1/lecturer-terms/${lecturerTermId}`);
}
