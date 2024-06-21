import { queryClient } from "@/providers/ReactQueryClientProvider"
import { addMemberInGroup, deleteMemberInGroup, getMemberInGroupStudent } from "@/services/apiGroupStudent"
import { updateStatusStudent } from "@/services/apiStudent"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"

export const enum QueryKeysMemberOfGroupStudent {
    getMemberInGroupStudent = "getMemberInGroupStudent"
}
const useMemberGroupStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    //[GET MEMBER]
    const handleGetMemberInGroupStudent = (id: string) => {
        return useQuery([QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id], () => getMemberInGroupStudent(id))
    }
    //[UPDATE]
    const onUpdateStatusStudentMember = (id: string, studentId: string) => {
        return useMutation((data: { status: string, termId: string }) => updateStatusStudent(studentId, data), {
            onSuccess(data: any) {
                if (data.success)
                    enqueueSnackbar('Cập nhật trạng thái sinh viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id] })
            },
            onError() {
                enqueueSnackbar('Cập nhật sinh viên thất bại, thử lại', { variant: 'error' })

            }

        })
    }


    //[DELETE MEMBER]
    const onDeleteStudentMember = (id: string) => {
        return useMutation((data: any) => deleteMemberInGroup(id, data), {
            onSuccess() {
                enqueueSnackbar('Xóa sinh viên khỏi nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id] })
            }
        })
    }
    //[DELETE MEMBER]
    const onAddStudentMember = (id: string) => {
        return useMutation((id: string) => addMemberInGroup(id), {
            onSuccess() {
                enqueueSnackbar('Thêm sinh viên vào nhóm thành công', { variant: 'error' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id] })
            }
        })
    }

    return {
        handleGetMemberInGroupStudent, onDeleteStudentMember, onAddStudentMember, onUpdateStatusStudentMember
    }
}

export default useMemberGroupStudent