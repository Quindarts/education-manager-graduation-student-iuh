import { ResponseType } from '@/types/axios.type';
import axiosConfig from './axiosConfig'; // Make sure to adjust the import according to your project structure



//[Admin role]
export const getAllLecturerTermByParams = (majorId: string, termId: string, limit: number | string, page: number | string, searchField: 'full_name' | 'username' | 'phone' | 'email', keywords: string) => {
    let searchFieldSend = searchField ? searchField : "";
    let keywordSend = keywords ? keywords : ""
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturer-terms/query?searchField=${searchFieldSend}&keywords=${keywordSend}&limit=${limit}&page=${page}&majorId=${majorId}&termId=${termId}`);
}


//[GET LIST Major]
export const getListLecturerTermByMajor: any = async (termId: string, majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturer-terms/list?termId=${termId}&majorId=${majorId}`);
}

export const getListLecturerTermToAdding = async (termId: string, majorId: string) => {
    return axiosConfig.get<ResponseType, any>(`/api/v1/lecturer-terms/to-adding?termId=${termId}&majorId=${majorId}`);
}

//[GET LIST]
export const getListLecturerTerm: any = async (termId: string) => {
    return axiosConfig.get<ResponseType, any>(`api/v1/lecturer-terms/list?termId=${termId}`);
}
//[CREATE]
export const createLecturerTerm: any = async (data: { lecturerId: string, termId: string }) => {
    return axiosConfig.post("/api/v1/lecturer-terms", data);
}
//[UPDATE]
export const updateLecturerTermById: any = async (lecturerTermId: number | string, data: any) => {
    return axiosConfig.put<ResponseType, any>(`/api/v1/lecturer-terms/${lecturerTermId}`, data);
}
//[DELETE]
export const deleteLecturerTermById: any = async (lecturerId: string, termId: string) => {
    return axiosConfig.delete<ResponseType, any>(`/api/v1/lecturer-terms?lecturerId=${lecturerId}&termId=${termId}`);
}

export const importLecturerTerm: any = async (termId: string, majorId: string) => {
    return axiosConfig.post<ResponseType, any>(`/api/v1/lecturer-terms/import`, { termId: termId, majorId: majorId })
}