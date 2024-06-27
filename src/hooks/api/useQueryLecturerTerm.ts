import { getListLecturerTerm } from "@/services/apiLecturerTerm"
import { useQuery } from "react-query"

export enum QueryKeysLecturerTerm {
    listLecturerTerms = 'listLecturerTerms'
}
export const useLecturerTerm = () => {

    //[GET LIST LECTURER]
    const handleGetListLecturerTerms = (termId: string) => {
        return useQuery([QueryKeysLecturerTerm.listLecturerTerms, termId], () => getListLecturerTerm(termId))
    }

    return {
        handleGetListLecturerTerms,
    }
}
