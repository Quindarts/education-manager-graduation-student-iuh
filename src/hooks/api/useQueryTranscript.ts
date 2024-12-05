import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { BodyEvaluation, createTranscripts, getEvaluationsForScoring, getTranscriptByGroupStudent, getTranscriptOfStudentInGroup, getTranscriptsByTypeEvaluation, getTranscriptsToExport, getUnTranscriptGroupStudentsByType, updateTranscript } from "@/services/apiTranscipts"
import { useSnackbar } from "notistack"
import { queryClient } from "@/providers/ReactQueryClientProvider"
export enum QueryKeysScoreStudent {
    getEvaluationsForScoring = 'getEvaluationsForScoring',
    getUnTranscriptGroupStudentsByType = 'getUnTranscriptGroupStudentsByType',
    getTranscriptsByTypeEvaluation = 'getTranscriptsByTypeEvaluation',
    getTranscriptsByGroupStudent = "getTranscriptsByGroupStudent",
    getTranscriptOfStudentInGroup = "getTranscriptOfStudentInGroup",
    getTranscriptExport = "getTranscriptExport"
}

const useTranscript = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()

    const hanleGetEvalutaionsForScoring = (type: string) => {
        return useQuery([QueryKeysScoreStudent.getEvaluationsForScoring, type], () => getEvaluationsForScoring(termStore.currentTerm.id, type), {
            staleTime: 1000,
        })
    }
    const handleGetTranscriptsByGroupStudent = (groupStudentId: string) => {
        return useQuery([QueryKeysScoreStudent.getTranscriptsByGroupStudent, groupStudentId], () => getTranscriptByGroupStudent(termStore.currentTerm.id, groupStudentId), {
            refetchOnMount: true,
        })
    }
    const handleGetTranscriptOfStudentInGroup = (type: string, groupStudentId: string) => {
        return useQuery([QueryKeysScoreStudent.getTranscriptOfStudentInGroup, termStore.currentTerm.id, type, groupStudentId], () => getTranscriptOfStudentInGroup(termStore.currentTerm.id, type, groupStudentId), {
            refetchOnMount: true,
        })
    }
    const handleGetTranscriptsByTypeEvaluation = (type: string, studentId: string) => {
        return useQuery([QueryKeysScoreStudent.getTranscriptsByTypeEvaluation, termStore.currentTerm.id, type, studentId], () => getTranscriptsByTypeEvaluation(termStore.currentTerm.id, type, studentId),{
            refetchOnMount: true,
        })
    }

    const handleGetUnTranscriptGroupStudentsByType = (type: string) => {
        return useQuery([QueryKeysScoreStudent.getUnTranscriptGroupStudentsByType, termStore.currentTerm.id, type], () => getUnTranscriptGroupStudentsByType(termStore.currentTerm.id, type), {
            staleTime: 1000,
            refetchOnMount: true,
        })
    }

    const onCreateTranscripts = (groupStudentId: string) => {
        return useMutation((transcripts: BodyEvaluation[]) => createTranscripts(transcripts), {
            onSuccess(data) {
                enqueueSnackbar("Lưu điểm thành công", { variant: "success" })
                queryClient.invalidateQueries([QueryKeysScoreStudent.getTranscriptsByGroupStudent, groupStudentId])
            },
            onError(error) {
                enqueueSnackbar("Thất bại, vui lòng thử lại", { variant: "error" })

            }
        })
    }
    const onCreateTranscriptTypeExcelUI = () => {
        return useMutation((transcripts: BodyEvaluation[]) => createTranscripts(transcripts), {
            onSuccess(data) {
                enqueueSnackbar("Lưu điểm thành công", { variant: "success" })
                queryClient.invalidateQueries(QueryKeysScoreStudent.getTranscriptsByGroupStudent)
            },
            onError(error) {
                enqueueSnackbar("Thất bại, vui lòng thử lại", { variant: "error" })

            }
        })
    }
    const onUpdateTranscripts = () => {
        return useMutation((transcripts: BodyEvaluation[]) => updateTranscript(transcripts), {
            onSuccess: () => {
                enqueueSnackbar('Cập nhật điểm thành công', { variant: "success" })
                queryClient.invalidateQueries(QueryKeysScoreStudent.getTranscriptsByGroupStudent)
                queryClient.invalidateQueries(QueryKeysScoreStudent.getTranscriptsByTypeEvaluation)
                queryClient.invalidateQueries(QueryKeysScoreStudent.getTranscriptOfStudentInGroup)
                queryClient.invalidateQueries(QueryKeysScoreStudent.getTranscriptExport)
            }
        })
    }
    const handleExportTranscripts = () => {
        return useQuery([QueryKeysScoreStudent.getTranscriptExport, termStore.currentTerm.id], () => getTranscriptsToExport(termStore.currentTerm.id), {
            refetchOnMount: true,
        })
    }
    return {
        handleGetTranscriptsByGroupStudent,
        handleGetTranscriptsByTypeEvaluation,
        hanleGetEvalutaionsForScoring,
        handleGetTranscriptOfStudentInGroup,
        handleExportTranscripts,
        onCreateTranscriptTypeExcelUI,
        onCreateTranscripts,
        onUpdateTranscripts,
        handleGetUnTranscriptGroupStudentsByType
    }


}

export default useTranscript