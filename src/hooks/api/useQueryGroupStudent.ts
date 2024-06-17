import { queryClient } from "@/providers/ReactQueryClientProvider"
import { assignTopic, getGroupStudentById, getGroupStudentByTerm, getMemberInGroupStudent, importGroupStudent, searchGroupStudentAdmin } from "@/services/apiGroupStudent"
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
    const handleGetGroupStudentByTerm = (termId: string, limit: number, page: number, majorId?: string, topicId?: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByTerm, termId, limit, page], () => getGroupStudentByTerm(termId, limit, page))
    }

    //[GET BY ID]
    const handleGetGroupStudentById = (id: number | string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentById, id], () => getGroupStudentById(id))
    }
    //[GET MEMBER]
    const handleGetMemberInGroupStudent = (id: string) => {
        return useQuery([QueryKeysGroupStudent.getMemberInGroupStudent, id], () => getMemberInGroupStudent(id))
    }
    //[PUT]
    const onAssignTopic = (id: string) => {
        return useMutation((topicId: string) => assignTopic(id, topicId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Phân công Đề tài cho Nhóm sinh viên thành công', { variant: 'success' })
                }
            }
        })

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
        onAssignTopic,
        handleGetMemberInGroupStudent
    }
}
export default useGroupStudent