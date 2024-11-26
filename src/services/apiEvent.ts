import { ResponseType } from "@/types/axios.type";
import axiosConfig from "./axiosConfig";
import { en } from "@fullcalendar/core/internal-common";
const URL = '/api/v1/events';
// [LECTURER] Get events(done)
export const getEvents = async (termId: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}?termId=${termId}`);
}
export const getEventById = async (id: string): Promise<ResponseType> => {
    return await axiosConfig.get(`${URL}/${id}`);
}

// [LECTURER] Create event(done)
export const createEvent = async (name: string, startDate: string, endDate: string, groupStudentIds: string[], termId: string): Promise<ResponseType> => {
    return await axiosConfig.post(`${URL}`, {
        name: name,
        startDate: startDate,
        endDate: endDate,
        groupStudentIds: groupStudentIds,
        termId: termId
    });
};

// [LECTURER] Update event
export const updateEvent = async (id: string, name: string, startDate: string, endDate: string): Promise<ResponseType> => {
    return await axiosConfig.put(`${URL}/${id}`, {
        name: name,
        startDate: startDate,
        endDate: endDate,
    });
}
export const updateEndDateEvent = async (id: string, endDate: string): Promise<ResponseType> => {
    return await axiosConfig.put(`${URL}/${id}`, {
        endDate: endDate,
    });
}
// [LECTURER] Comment event(done)
export const updateCommentEventById = async (id: string, groupStudentId: string, comment: string) => {
    return await axiosConfig.put(`${URL}/${id}/comment`, {
        comment: comment,
        groupStudentId: groupStudentId
    })
}

// [LECTURER] Delete event(done)
export const deleteEventById = async (id: string): Promise<ResponseType> => {
    return await axiosConfig.delete(`${URL}/${id}`);
}