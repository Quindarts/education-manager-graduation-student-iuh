import { queryClient } from "@/providers/ReactQueryClientProvider"
import { addMemberInGroup, deleteMemberInGroup, getMemberInGroupStudent } from "@/services/apiGroupStudent"
import { updateStatusStudent } from "@/services/apiStudent"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { QueryKeysGroupStudent } from "./useQueryGroupStudent"

export const enum QueryKeysMemberOfGroupStudent {
    getMemberInGroupStudent = "getMemberInGroupStudent"
}
const useMemberGroupStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()
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
                queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
            }
        })
    }
    //[DELETE MEMBER]
    const onAddStudentMember = (id: string) => {

        return useMutation((data: { studentId: string, termId?: string }) => addMemberInGroup(id, { ...data, termId: termStore.currentTerm.id }), {
            onSuccess() {
                enqueueSnackbar('Thêm sinh viên vào nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id] })
                queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
            }
        })
    }

    return {
        handleGetMemberInGroupStudent, onDeleteStudentMember, onAddStudentMember, onUpdateStatusStudentMember
    }
}

export default useMemberGroupStudent