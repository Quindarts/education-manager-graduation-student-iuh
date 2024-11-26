import { EnumAnalysis } from "@/types/enum"
import { useTerm } from "./useQueryTerm"
import * as AnalysisService from '@/services/apiAnalysis'
import { useQuery } from "react-query"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { QueryKeysLecturerTerm } from "./useQueryLecturerTerm"
import { QueryKeysAssign } from "./useQueryAssign"
import { useSnackbar } from "notistack"

enum QueryAnalysis {
    getCategories = 'getCategories'
}
const useAnalysis = () => {
    const { termStore } = useTerm()
    const { enqueueSnackbar } = useSnackbar()
    const termId = termStore.currentTerm.id
    const onCreateEntitiesAnalysis = async (category: string[]) => {
        const entites_promise = await Promise.all(
            [AnalysisService.createEntitiesAnalysis(termId, category, EnumAnalysis.LECTURER),
            AnalysisService.createEntitiesAnalysis(termId, category, EnumAnalysis.TOPICS)])
        if (entites_promise.every(res => res.success === true) === true) {
            queryClient.invalidateQueries(QueryAnalysis.getCategories)
            queryClient.invalidateQueries(QueryKeysLecturerTerm.listLecturerTerms)
            queryClient.invalidateQueries(QueryKeysLecturerTerm.listLecturerTerms)
            queryClient.invalidateQueries(QueryKeysAssign.getGroupStudentNoAssignByType)
            enqueueSnackbar('Phân tích thành công', { variant: 'success' });
        }
        return entites_promise.every(res => res.success === true)
    }
    const handleGetCategories = () => {
        return useQuery([QueryAnalysis.getCategories], () => AnalysisService.getCategories(), {
        })
    }
    return {
        onCreateEntitiesAnalysis,
        handleGetCategories
    }

}

export default useAnalysis