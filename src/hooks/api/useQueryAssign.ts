import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { useSnackbar } from "notistack"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { QueryKeysGroupLecturer } from "./useQueryGroupLecturer"
import * as AssignServices from "@/services/apiAssign"

export enum QueryKeysAssign {
    getGroupStudentNoAssignByType = 'getGroupStudentNoAssignByType',
    getExportAssignGroup = "getExportAssignGroup"
}
const useAssign = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm();
    const termId = termStore.currentTerm.id
    const handletGetGroupStudentNoAssignByType = (type: string) => {
        return useQuery([QueryKeysAssign.getGroupStudentNoAssignByType, type, termId], () => AssignServices.getGroupStudentNoAssign(type, termId))
    }
    const onCreateAssignByType = (type: string, groupLecturerId: string) => {
        return useMutation((data: { groupLecturerId: string, listGroupStudentId: string[], type: string }) => AssignServices.createAssignByType(data), {
            onSuccess() {
                enqueueSnackbar("Phân công chấm điểm thành công", { variant: "success" })
                queryClient.invalidateQueries(QueryKeysAssign.getGroupStudentNoAssignByType)
                queryClient.invalidateQueries(QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup)
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getGroupLecturerById, groupLecturerId] })
                queryClient.invalidateQueries(QueryKeysAssign.getExportAssignGroup)
            },
            onError(err: any) {
                enqueueSnackbar(err.message, { variant: "error" })
            }
        })
    }
    const onUpdateAssignByType = (type: string, groupLecturerId: string) => {
        return useMutation((data: { groupLecturerId: string, listGroupStudentId: string[], type: string }) => AssignServices.updateAssignByType(data), {
            onSuccess() {
                enqueueSnackbar("Cập nhật phân công thành công", { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysAssign.getGroupStudentNoAssignByType, type, termId] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getGroupLecturerById, groupLecturerId] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysAssign.getExportAssignGroup, termId, type] })
            },
            onError(err: any) {
                enqueueSnackbar(err.message, { variant: "error" })
            }
        })
    }
    const handleGetExportAssignGroup = (type: string) => {
        let typeSend = type === 'reviewer' ? type : 'report'
        return useQuery([QueryKeysAssign.getExportAssignGroup, termId, typeSend], () => AssignServices.getExportAssignGroup(termId, typeSend), {
            refetchOnMount: true,
            enabled: !!typeSend
        })
    }
    // {{url}}/api/v1/assigns/export-me?termId=8fb8fbda-37ed-4861-a3a2-236500e62ee6&type=report
    const handleExportExcelAssignByLecturerId = (type: string) => {
        let typeSend = type === 'reviewer' ? type : 'report'
        return useQuery([QueryKeysAssign.getExportAssignGroup, termId, type], () => AssignServices.getExportAssignGrByLecturerId(termId, typeSend), {
            refetchOnMount: true,
            enabled: !!termId
        })
    }
    return {
        handletGetGroupStudentNoAssignByType,
        handleGetExportAssignGroup,
        onCreateAssignByType,
        handleExportExcelAssignByLecturerId,
        onUpdateAssignByType
    }
}

export default useAssign    