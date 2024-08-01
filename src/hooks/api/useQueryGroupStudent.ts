import { getStudentsNoHaveGroup } from './../../services/apiStudent';
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createGroupStudent, deleteGroupStudent, getCountOfGroupStudent, getGroupStudentById, getGroupStudentByLecturerByTerm, getGroupStudentByTerm, importGroupStudent, searchGroupStudentAdmin } from "@/services/apiGroupStudent"
import { setParams, setTypeRender } from "@/store/slice/groupStudent.slice"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useTerm } from "./useQueryTerm"

export const enum QueryKeysGroupStudent {
    getGroupStudentByTerm = 'getGroupStudentByTerm',
    getGroupStudentByLecturerSupport = 'getGroupStudentByLecturerSupport',
    getGroupStudentById = "getGroupStudentById",
    managerActionGroupStudent = 'managerActionGroupStudent',
    searchGroupStudentByField = 'searchGroupStudentByField',
    getMemberInGroupStudent = "getMemberInGroupStudent",
    getStudentsNohaveGroup = "getStudentsNoHaveGroup",
    getCountOfGroupStudent = "getCountOfGroupStudent",
    getGroupStudentByLecturerTermId = "getGroupStudentByLecturerTermId"
}
const useGroupStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const groupStudentStore = useSelector((state: any) => state.groupStudentSlice)
    const { params, renderUi } = groupStudentStore
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id
    const dispatch = useDispatch()


    const handleManagerRenderActionGroupStudent = (limit: number, page: number, searchField: string,
        keywords: string | number) => {
        return useQuery([QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, limit, page, renderUi, keywords], () => {
            if (searchField !== 'all' && keywords != '')
                return searchGroupStudentAdmin(termStore.currentTerm.id, limit, page, searchField, keywords)
            else
                return getGroupStudentByTerm(termStore.currentTerm.id, limit, page)
        }, {
            onSuccess(data: any) {
                dispatch(setParams(data.params))
                dispatch(setTypeRender(searchField))
            },
            staleTime: 10000,
        })
    }
    //[GET BY TERM]
    const handleGetGroupStudentByTerm = (termId?: string, limit?: number, page?: number, majorId?: string, topicId?: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByTerm, termStore.currentTerm.id, 10, 1], () => getGroupStudentByTerm(termStore.currentTerm.id, 10, 1))
    }
    //[GET BY TERM]
    const handleGetGroupStudentByLecturerByTerm = (termId?: string,) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByLecturerSupport, termStore.currentTerm.id], () => getGroupStudentByLecturerByTerm(termStore.currentTerm.id), {
            staleTime: 5000
        })
    }
    const handleGetGroupStudentByLecturerTermId = (lecturerTermId?: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByLecturerTermId, lecturerTermId], () => getGroupStudentByLecturerByTerm(termStore.currentTerm.id), {
            staleTime: 5000
        })
    }

    const handleGetCountOfGroupStudent = () => {
        return useQuery([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id], () => getCountOfGroupStudent(termStore.currentTerm.id))
    }
    //[GET BY ID]
    const handleGetGroupStudentById = (id: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentById, id], () => getGroupStudentById(id), {
            staleTime: 1000,
        })
    }
    const handleGetStudentNoHaveGroup = () => {
        return useQuery([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id], () => getStudentsNoHaveGroup(termStore.currentTerm.id))
    }
    const onCreateGroupStudent = () => {
        return useMutation((studentIds: string[]) => createGroupStudent({ termId: termStore.currentTerm.id, studentIds }), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Tạo nhóm sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, params.limit, params.page, 'all', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                }
            },
        })
    }
    const onImportGroupStudent = () => {
        return useMutation(() => importGroupStudent(termId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Import danh sách nhóm sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, params.limit, params.page, 'all', ''] })
                }
            }
        })
    }

    const onDeleteGroupStudent = () => {
        return useMutation((id) => deleteGroupStudent(id), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Xóa nhóm sinh vien thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, params.limit, params.page, 'all', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
                }
            }
        })
    }
    return {
        params,
        renderUi,
        handleManagerRenderActionGroupStudent,
        handleGetCountOfGroupStudent,
        handleGetStudentNoHaveGroup,
        handleGetGroupStudentByTerm,
        handleGetGroupStudentById,
        handleGetGroupStudentByLecturerByTerm,
        onDeleteGroupStudent,
        onCreateGroupStudent,
        onImportGroupStudent,
    }
}
export default useGroupStudent