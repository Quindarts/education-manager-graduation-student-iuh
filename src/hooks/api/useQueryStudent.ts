import { getAllStudent, getStudentById } from '@/services/apiStudent'
import { useQuery } from 'react-query'


export const useStudent = () => {

    const handleGetAllStudent = () => {
        return useQuery(['get-all-student'], () => getAllStudent())
    }
    const handleGetStudentById = (id: number) => {
        return useQuery([`get-student-by-id`, id], () => getStudentById(id))
    }

    return {
        handleGetStudentById,
        handleGetAllStudent
    }
}