import { getGroupStudentById, getGroupStudentByTerm } from "@/services/apiGroupStudent"
import { useQuery } from "react-query"

const useGroupStudent = () => {
    //[GET BY TERM]
    const handleGetGroupStudentByTerm = (term_id: number) => {
        return useQuery(['get-group-student-by-term', term_id], () => getGroupStudentByTerm(term_id))
    }

    //[GET BY ID]
    const handleGetGroupStudentById = (id: number | string) => {
        return useQuery(['get-group-student-by-id', id], () => getGroupStudentById(id))
    }


    return {
        handleGetGroupStudentByTerm,
        handleGetGroupStudentById
    }
}
export default useGroupStudent