// {{url}}/api/v1/final-reports?termId=8fb8fbda-37ed-4861-a3a2-236500e62ee6
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import * as FinalReportService from "@/services/apiFinalReport"
import { useTerm } from "./useQueryTerm"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { useLecturer } from './useQueryLecturer';
import { EnumRole } from '@/types/enum';
enum QueryKeysFinalReport {
    getAllFinalReport = 'getAllFinalReport',
    getFinalReportByLecturer = "getFinalReportByLecturer",
    getFinalReportById = 'getFinalReportById',
}
function useFinalReport() {
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id
    const { enqueueSnackbar } = useSnackbar()
    const { currentRoleRender } = useLecturer()

    const handlegetAllFinalReport = () => {
        if (currentRoleRender === EnumRole.LECTURER) {
            return useQuery(QueryKeysFinalReport.getFinalReportByLecturer, () => FinalReportService.getFinalReportsByLecturerId(termId), {
                refetchOnMount: true,
                enabled: !!termId
            })
        }
        return useQuery(QueryKeysFinalReport.getAllFinalReport, () => FinalReportService.getFinalReports(termId), {
            refetchOnMount: true,
            enabled: !!termId
        })
    }
    const handlegetFinalReportById = (id: string) => {
        return useQuery(QueryKeysFinalReport.getFinalReportById, () => FinalReportService.getFinalReportById(id), {
            refetchOnMount: true,
            enabled: !!id
        })
    }
    const onCommentFinalReport = (id: string) => {
        return useMutation((comment: string) => FinalReportService.updateCommentFinalReport(id, comment), {
            onSuccess: (data) => {
                queryClient.invalidateQueries(QueryKeysFinalReport.getAllFinalReport)
                queryClient.invalidateQueries(QueryKeysFinalReport.getFinalReportByLecturer)
                if (data.success === true) {
                    enqueueSnackbar('Cập nhật trạng thái file báo cáo thành công', { variant: 'success' })
                }
                else {
                    enqueueSnackbar('Cập nhật trạng thái file báo cáo thất bại', { variant: 'error' })
                }
            }
        })
    }
    return {
        handlegetAllFinalReport,
        onCommentFinalReport,
        handlegetFinalReportById,
    }
}

export default useFinalReport