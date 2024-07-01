import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { createTranscript, getEvaluationsForScoring, getTranscriptsByTypeEvaluation, getUnTranscriptStudentsByType, updateTranscript } from "@/services/apiTranscipts"
import { useSnackbar } from "notistack"
import { queryClient } from "@/providers/ReactQueryClientProvider"
export enum QueryKeysScoreStudent {
    getEvaluationsForScoring = 'getEvaluationsForScoring',
    getUnTranscriptStudentsByType = 'getUnTranscriptStudentsByType',
    getTranscriptsByTypeEvaluation = 'getTranscriptsByTypeEvaluation'
}

const useQueryTranscript = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()
    const hanleGetEvalutaionsForScoring = (type: string) => {
        return useQuery([QueryKeysScoreStudent.getEvaluationsForScoring, type], () => getEvaluationsForScoring(termStore.currentTerm.id, type), {
            staleTime: 1000,
        })
    }

    const handleGetTranscriptsByTypeEvaluation = (type: string, studentId: string) => {
        return useQuery([QueryKeysScoreStudent.getTranscriptsByTypeEvaluation, termStore.currentTerm.id, type, studentId], () => getTranscriptsByTypeEvaluation(termStore.currentTerm.id, type, studentId))
    }

    const handleGetUnTranscriptStudentsByType = (type: string) => {
        return useQuery([QueryKeysScoreStudent.getUnTranscriptStudentsByType, termStore.currentTerm.id, type], () => getUnTranscriptStudentsByType(termStore.currentTerm.id, type))

    }
    const onCreateTranscript = (studentId: string, type: string) => {
        return useMutation((data: {
            studentId: string;
            evaluationId: string;
            score: number;
        }) => createTranscript({ ...data, termId: termStore.currentTerm.id }), {

            onError: (error: Error) => {
                enqueueSnackbar('Cập nhật điểm thất bại', { variant: "error" })
            },
            onSuccess: () => {
                enqueueSnackbar('Tạo điểm thành công', { variant: "success" })
                queryClient.invalidateQueries([QueryKeysScoreStudent.getTranscriptsByTypeEvaluation, termStore.currentTerm.id, type, studentId])
            }
        })
    }
    const onUpdateTranscript = (studentId: string, type: string) => {
        return useMutation((data: { id: string, score: number }) => updateTranscript(data.id, data.score), {
            onSuccess: () => {
                enqueueSnackbar('Cập nhật điểm thành công', { variant: "success" })
                queryClient.invalidateQueries([QueryKeysScoreStudent.getTranscriptsByTypeEvaluation, termStore.currentTerm.id, type, studentId])
            }
        })
    }
    return {
        handleGetTranscriptsByTypeEvaluation,
        hanleGetEvalutaionsForScoring,
        onCreateTranscript,
        onUpdateTranscript,
        handleGetUnTranscriptStudentsByType
    }


}

export default useQueryTranscript