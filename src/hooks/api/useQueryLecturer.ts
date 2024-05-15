import { getAllLecturer, getLecturerById } from "@/services/apiLecturer"
import { useQuery } from "react-query"


export const useLecturer = () => {
    const handleGetAllLecturer = () => {
        return useQuery(['get-all-lecturer'], () => getAllLecturer())
    }
    const handleGetLecturerById = (id: number | string) => {
        return useQuery([`get-lecturer-by-id`, id], () => getLecturerById(id))
    }
    return {
        handleGetAllLecturer,
        handleGetLecturerById
    }
}

