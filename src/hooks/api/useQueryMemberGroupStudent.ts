import { queryClient } from "@/providers/ReactQueryClientProvider"
import { addMemberInGroup, deleteMemberInGroup, getMemberInGroupStudent } from "@/services/apiGroupStudent"
import { updateStatusStudent } from "@/services/apiStudent"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { QueryKeysGroupStudent } from "./useQueryGroupStudent"
import { QueryStudent } from "./useQueryStudent"

export const enum QueryKeysMemberOfGroupStudent {
    getMemberInGroupStudent = "getMemberInGroupStudent"
}
const useMemberGroupStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()
    //[GET MEMBER]
    const handleGetMemberInGroupStudent = (id: string) => {
        return useQuery([QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id], () => getMemberInGroupStudent(id), {
            enabled: !!id
        })
    }
    //[UPDATE]
    const onUpdateStatusStudentMember = (id: string, studentId: string) => {
        return useMutation((data: { status: string, termId: string }) => updateStatusStudent(studentId, data), {
            onSuccess(data: any) {
                if (data.success)
                    enqueueSnackbar('Cập nhật trạng thái sinh viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysMemberOfGroupStudent.getMemberInGroupStudent, id] })

            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }

        })
    }


    //[DELETE MEMBER]
    const onDeleteStudentMember = (id: string) => {
        return useMutation((data: any) => deleteMemberInGroup(id, data), {
            onSuccess() {
                enqueueSnackbar('Xóa sinh viên khỏi nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
                queryClient.invalidateQueries([QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, '10', '1', '', '', ''])
                queryClient.invalidateQueries([QueryKeysGroupStudent.getGroupStudentById, id])
                queryClient.invalidateQueries([QueryStudent.getSearchStudentBasic, termStore.currentTerm.id, '', ''])
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //[DELETE MEMBER]
    const onAddStudentMember = (id: string) => {
        return useMutation((data: { studentId: string, termId?: string }) => addMemberInGroup(id, { ...data, termId: termStore.currentTerm.id }), {
            onSuccess() {
                enqueueSnackbar('Thêm sinh viên vào nhóm thành công', { variant: 'success' })
                queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
                queryClient.invalidateQueries([QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, '10', '1', '', '', ''])
                queryClient.invalidateQueries([QueryKeysGroupStudent.getGroupStudentById, id])
                queryClient.invalidateQueries([QueryStudent.getSearchStudentBasic, termStore.currentTerm.id, '', ''])
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
        handleGetMemberInGroupStudent, onDeleteStudentMember, onAddStudentMember, onUpdateStatusStudentMember
    }
}

export default useMemberGroupStudent