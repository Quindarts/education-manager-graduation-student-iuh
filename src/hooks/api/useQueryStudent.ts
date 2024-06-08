import { getAllStudent, getStudentById } from '@/services/apiStudent'
import { useQuery } from 'react-query'


export const useStudent = () => {

    const handleGetAllStudent = (termId: string | number, limit: number, page: number) => {
        return useQuery(['get-all-student', termId, limit, page], () => getAllStudent(termId, limit, page))
    }
    const handleGetStudentById = (id: number) => {
        return useQuery([`get-student-by-id`, id], () => getStudentById(id), {
            enabled: !!id
        })
    }

    return {
        handleGetStudentById,
        handleGetAllStudent
    }
}