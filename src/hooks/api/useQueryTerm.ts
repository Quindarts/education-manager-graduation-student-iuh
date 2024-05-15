import { getAllTerm } from "@/services/apiTerm"
import { useQuery } from "react-query"

export const useTerm = () => {
    const handleGetAllTerm = () => {
        return useQuery(['get-all-term'], () => getAllTerm())
    }

    return {
        handleGetAllTerm,
    }
}