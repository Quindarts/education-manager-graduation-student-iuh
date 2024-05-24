import { getGroupStudentByTerm } from "@/services/apiGroupStudent"
import { useQuery } from "react-query"

const useGroupStudent = () => {

    const handleGetGroupStudentByTerm = (term_id: number) => {
        return useQuery(['get-group-student-by-term', term_id], () => getGroupStudentByTerm(term_id))
    }
    return {
        handleGetGroupStudentByTerm
    }
}
export default useGroupStudent