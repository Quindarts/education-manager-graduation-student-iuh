import { createAssignByType, getExportAssignGroup, getGroupStudentNoAssign, updateAssignByType } from "@/services/apiAssign"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { useSnackbar } from "notistack"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import * as AssignServices from "@/services/apiAssign"
import { QueryKeysGroupLecturer } from "./useQueryGroupLecturer"

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
                queryClient.invalidateQueries([QueryKeysAssign.getGroupStudentNoAssignByType, type, termId])
                queryClient.invalidateQueries([QueryKeysGroupLecturer.getGroupLecturerById, groupLecturerId])
                queryClient.invalidateQueries([QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId])
                queryClient.invalidateQueries([QueryKeysAssign.getExportAssignGroup, termId, type])

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
                queryClient.invalidateQueries([QueryKeysAssign.getGroupStudentNoAssignByType, type, termId])
                queryClient.invalidateQueries([QueryKeysGroupLecturer.getGroupLecturerById, groupLecturerId])
                queryClient.invalidateQueries([QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId])
                queryClient.invalidateQueries([QueryKeysAssign.getExportAssignGroup, termId, type])
            },
            onError(err: any) {
                enqueueSnackbar(err.message, { variant: "error" })
            }
        })
    }
    const handleGetExportAssignGroup = (type: string) => {
        let typeSend = type === 'reviewer' ? type : 'report'
        return useQuery([QueryKeysAssign.getExportAssignGroup, termId, typeSend], () => AssignServices.getExportAssignGroup(termId, typeSend))
    }

    return {
        handletGetGroupStudentNoAssignByType,
        handleGetExportAssignGroup,
        onCreateAssignByType,
        onUpdateAssignByType
    }
}

export default useAssign    