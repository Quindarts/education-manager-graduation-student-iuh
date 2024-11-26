import { queryClient } from "@/providers/ReactQueryClientProvider"
import { EvaluationDataRequestType, TypeEvaluation, createEvaluation, deleteEvaluation, getEvaluationById, getEvaluationByTermByType, updateEvaluation } from "@/services/apiEvaluation"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useAuth } from "./useAuth"
import { RoleCheck } from "@/types/enum"
import { EvaluationLecturer, GroupLecturerServiceKeys } from "@/page/ReviewManager/Entity/EvaluationManager"
import { useTerm } from './useQueryTerm';

export enum QueryEvaluation {
    getEvaluationByType = 'getEvaluationByType',
    getEvaluationById = 'getEvaluationById'
}

const useEvaluation = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { lecturerStore } = useAuth();
    const { termStore } = useTerm();

    const termId = termStore.currentTerm.id
    const lecturerId = lecturerStore.me.user.id
    const currentRole = lecturerStore.currentRoleRender;

    //? [UI]
    const handleUiRender = (): string[] => {
        var permissions: string[] = []
        if (currentRole === RoleCheck.HEAD_COURSE || currentRole === RoleCheck.HEAD_LECTURER) {
            permissions.push('all')
        }
        else {
            permissions.push('crud')
        }
        return permissions
    }
    //? [GET]
    const handleGetDataToExportReportDocx = async (typeEvaluation: string) => {
        const EvaluationAPIClass = new EvaluationLecturer(typeEvaluation);
        let apiName: GroupLecturerServiceKeys
        let params: string[];
        switch (currentRole) {
            case RoleCheck.LECTURER:
                apiName = 'getGrLecturerByTypeEvaluationByLecturer'
                params = [termId, typeEvaluation.toLowerCase(), lecturerId]
                break;
            case RoleCheck.HEAD_LECTURER:
                apiName = 'getGroupLecturerByTypeEvaluation'
                params = [termId, typeEvaluation.toLowerCase()]
                break;
            case RoleCheck.HEAD_COURSE:
                apiName = 'getGroupLecturerByTypeEvaluation'
                params = [termId, typeEvaluation.toLowerCase()]
                break;
        }
        const res = await EvaluationAPIClass.apiGetGroupLecturer(apiName, params);
        return res
    }
    //? [GET]
    const handleGetEvalutationByType = (termId?: string, type?: TypeEvaluation) => {
        return useQuery([QueryEvaluation.getEvaluationByType, termId, type], () => getEvaluationByTermByType(termId, type), {
            staleTime: 1000 * (60 * 20)
        })
    }

    //? [GET]
    const handleGetEvaluationById = (evaluationId?: string) => {
        return useQuery([QueryEvaluation.getEvaluationById, evaluationId], () => getEvaluationById(evaluationId), {
            enabled: !!evaluationId
        })
    }
    //? [POST]
    const onCreateEvaluation = (termId?: string, type?: TypeEvaluation) => {
        return useMutation((data: EvaluationDataRequestType) => createEvaluation(data), {
            onSuccess() {
                enqueueSnackbar('Tạo tiêu chí đánh giá thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationByType, termId, type] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //? [PUT]
    const onUpdateEvaluationById = (termId?: string, type?: TypeEvaluation, evaluationId?: string) => {
        return useMutation((data: EvaluationDataRequestType) => updateEvaluation(evaluationId, data), {
            onSuccess() {
                enqueueSnackbar('Cập nhật tiêu chí đánh giá thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationByType, termId, type] })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationById, evaluationId] })

            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //? [DELETE]
    const onDeleteEvaluationById = (termId?: string, type?: TypeEvaluation, evaluationId?: string) => {
        return useMutation(() => deleteEvaluation(evaluationId), {
            onSuccess() {
                enqueueSnackbar('Xóa tiêu chí đánh giá thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryEvaluation.getEvaluationByType, termId, type] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    return {
        handleGetEvalutationByType,
        handleGetDataToExportReportDocx,
        handleUiRender,
        handleGetEvaluationById,
        onUpdateEvaluationById,
        onDeleteEvaluationById,
        onCreateEvaluation
    }
}
export default useEvaluation