import { queryClient } from "@/providers/ReactQueryClientProvider"
import { assignTopic, getGroupStudentById, getGroupStudentByLecturerByTerm, getGroupStudentByTerm, getMemberInGroupStudent, importGroupStudent, searchGroupStudentAdmin } from "@/services/apiGroupStudent"
import { ENUM_RENDER_GROUP_STUDENT, setParams, setTypeRender } from "@/store/slice/groupStudent.slice"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useTerm } from "./useQueryTerm"
import { setKeywords } from "@/store/slice/lecturer.slice"

export const enum QueryKeysGroupStudent {
    getGroupStudentByTerm = 'getGroupStudentByTerm',
    getGroupStudentById = "getGroupStudentById",
    managerActionGroupStudent = 'managerActionGroupStudent',
    searchGroupStudentByField = 'searchGroupStudentByField',
    getMemberInGroupStudent = "getMemberInGroupStudent"
}
const useGroupStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const groupStudentStore = useSelector((state: any) => state.groupStudentSlice)
    const { params, renderUi } = groupStudentStore
    const { termStore } = useTerm()
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
                dispatch(setKeywords(keywords))
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
        return useQuery([QueryKeysGroupStudent.getGroupStudentByTerm, termStore.currentTerm.id], () => getGroupStudentByLecturerByTerm(termStore.currentTerm.id))
    }
    //[GET BY ID]
    const handleGetGroupStudentById = (id: number | string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentById, id], () => getGroupStudentById(id))
    }

    const onImportGroupStudent = (termId: string) => {
        return useMutation((termId: string) => importGroupStudent(termId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Import danh sách nhóm sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.getGroupStudentByTerm, renderUi, termId, 10, 1] })
                }
            }
        })
    }
    return {
        params, renderUi,
        handleManagerRenderActionGroupStudent,
        onImportGroupStudent,
        handleGetGroupStudentByTerm,
        handleGetGroupStudentById,
        handleGetGroupStudentByLecturerByTerm,

    }
}
export default useGroupStudent