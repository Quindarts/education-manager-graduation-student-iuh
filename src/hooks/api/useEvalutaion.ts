import { queryClient } from "@/providers/ReactQueryClientProvider"
import { EvaluationDataRequestType, TypeEvaluation, createEvaluation, deleteEvaluation, getEvaluationById, getEvaluationByTermByType, updateEvaluation } from "@/services/apiEvaluation"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"

export enum QueryEvaluation {
    getEvaluationByType = 'getEvaluationByType',
    getEvaluationById = 'getEvaluationById'
}
const useEvaluation = () => {
    const { enqueueSnackbar } = useSnackbar()

    const handleGetEvalutationByType = (termId: number | string, type: TypeEvaluation) => {
        return useQuery([QueryEvaluation.getEvaluationByType, termId, type], () => getEvaluationByTermByType(termId, type))
    }
    const handleGetEvaluationById = (evaluationId: string) => {
        return useQuery([QueryEvaluation.getEvaluationById, evaluationId], () => getEvaluationById(evaluationId), {
            enabled: !!evaluationId
        })
    }

    const onCreateEvaluation = (termId: number | string, type: TypeEvaluation) => {
        return useMutation((data: EvaluationDataRequestType) => createEvaluation(data), {
            onSuccess() {
                enqueueSnackbar('Tạo tiêu chí đánh giá thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationByType, termId, type] })
            },
            onError() {
                enqueueSnackbar('Tạo tiêu chí đánh giá thất bại', { variant: "error" })
            }
        })
    }
    const onUpdateEvaluationById = (termId: number | string, type: TypeEvaluation, evaluationId: string) => {
        return useMutation((data: EvaluationDataRequestType) => updateEvaluation(evaluationId, data), {
            onSuccess() {
                enqueueSnackbar('Cập nhật tiêu chí đánh giá thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationByType, termId, type] })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationById, evaluationId] })

            },
            onError() {
                enqueueSnackbar('Cập nhật tiêu chí đánh giá thất bại', { variant: "error" })
            }
        })
    }
    const onDeleteEvaluationById = (termId: number | string, type: TypeEvaluation, evaluationId: string) => {
        return useMutation(() => deleteEvaluation(evaluationId), {
            onSuccess() {
                enqueueSnackbar('Xóa tiêu chí đánh giá thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationByType, termId, type] })
            },
            onError() {
                enqueueSnackbar('Xóa tiêu chí đánh giá thất bại', { variant: "error" })
            }
        })
    }
    return {
        handleGetEvalutationByType, handleGetEvaluationById, onUpdateEvaluationById, onDeleteEvaluationById, onCreateEvaluation
    }
}
export default useEvaluation