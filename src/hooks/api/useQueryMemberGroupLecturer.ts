import { useSnackbar } from "notistack"
import { useMutation } from "react-query"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { addMemberToGroupLecturerById, removeMemberFromGroupLecturerById } from "@/services/apiGroupLecturer"
import { QueryKeysGroupLecturer } from "./useQueryGroupLecturer"
import { useTerm } from "./useQueryTerm"

const useMemberGroupLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id
    const onAddMemberToGroupLecturer = (id: string) => {
        return useMutation((lecturerId: string) => addMemberToGroupLecturerById(id, lecturerId), {
            onSuccess: (data: any) => {
                enqueueSnackbar('Thêm giảng viên vào nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getGroupLecturerById, id] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, 'reviewer'] })

            },
            onError: () => {
                enqueueSnackbar('Tạo nhóm giảng viên thất bại', { variant: 'error' })

            }
        })
    }

    const onRemoveMemberFromGroupLecturer = (id: string) => {
        return useMutation((data: any) => removeMemberFromGroupLecturerById(id, data), {
            onSuccess: (data: any) => {
                enqueueSnackbar('Xóa giảng viên khỏi nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getGroupLecturerById, id] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, 'reviewer', termId] })

            },
            onError: () => {
                enqueueSnackbar('Tạo nhóm giảng viên thất bại', { variant: 'error' })
            }
        })
    }
    return {
        onRemoveMemberFromGroupLecturer,
        onAddMemberToGroupLecturer
    }
}

export default useMemberGroupLecturer