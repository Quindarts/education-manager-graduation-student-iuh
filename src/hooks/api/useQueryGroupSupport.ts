import { getMyGroupSupport, getStudentMemberToScoring } from "@/services/apiGroupSupport"
import { useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"

export enum QuertKeysGroupSupport {
    getMyGroupSupport = 'getMyGroupSupport',
    getStudentMemberToScoring = 'getStudentMemberToScoring'
}

function useGroupSupport() {
    const { termStore } = useTerm()
    const handleGetMyGroupSupport = (termId?: string) => {
        return useQuery([QuertKeysGroupSupport.getMyGroupSupport, termStore.currentTerm.id], () => getMyGroupSupport(termStore.currentTerm.id))

    }
    const handleGetStudentMemberToScoring = (termId?: string) => {
        return useQuery([QuertKeysGroupSupport.getStudentMemberToScoring, termStore.currentTerm.id], () => getStudentMemberToScoring(termStore.currentTerm.id))
    }
    return {
        handleGetMyGroupSupport,
        handleGetStudentMemberToScoring
    }
}

export default useGroupSupport