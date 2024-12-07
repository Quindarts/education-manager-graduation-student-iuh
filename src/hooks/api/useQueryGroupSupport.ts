import { getMyGroupSupport, getStudentMemberToScoring } from "@/services/apiGroupSupport"
import { useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { getGroupStdsExportByLecturer } from "@/services/apiGroupStudent"

export enum QuertKeysGroupSupport {
    getMyGroupSupport = 'getMyGroupSupport',
    getStudentMemberToScoring = 'getStudentMemberToScoring',
    getGrStdToExport = "getGrStdToExport"
}

function useGroupSupport() {
    const { termStore } = useTerm()
    const handleGetMyGroupSupport = () => {
        return useQuery([QuertKeysGroupSupport.getMyGroupSupport, termStore.currentTerm.id], () => getMyGroupSupport(termStore.currentTerm.id))

    }
    const handleGetStudentMemberToScoring = (termId?: string) => {
        return useQuery([QuertKeysGroupSupport.getStudentMemberToScoring, termStore.currentTerm.id], () => getStudentMemberToScoring(termStore.currentTerm.id))
    }
    const handleGetGrToExport = () => {
        return useQuery([QuertKeysGroupSupport.getGrStdToExport, termStore.currentTerm.id], () => getGroupStdsExportByLecturer(termStore.currentTerm.id))
    }
    return {
        handleGetGrToExport,
        handleGetMyGroupSupport,
        handleGetStudentMemberToScoring
    }
}

export default useGroupSupport