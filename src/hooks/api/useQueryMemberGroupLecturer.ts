import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { addMemberToGroupLecturerById, removeMemberFromGroupLecturerById } from "@/services/apiGroupLecturer"
import { QueryKeysGroupLecturer } from "./useQueryGroupLecturer"

const useMemberGroupLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const onAddMemberToGroupLecturer = (id: string) => {
        return useMutation((data: any) => addMemberToGroupLecturerById(id, data), {
            onSuccess: (data: any) => {
                enqueueSnackbar('Thêm giảng viên vào nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getGroupLecturerById, id] })
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