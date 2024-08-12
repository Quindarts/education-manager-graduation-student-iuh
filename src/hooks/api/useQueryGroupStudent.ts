import { getStudentsNoHaveGroup } from './../../services/apiStudent';
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { assignTopic, createGroupStudent, deleteGroupStudent, getCountOfGroupStudent, getGroupStudentById, getGroupStudentByLecturerByTerm, getGroupStudentByTerm, importGroupStudent, searchGroupStudentAdmin } from "@/services/apiGroupStudent"
import { setParams, setTypeRender } from "@/store/slice/groupStudent.slice"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useTerm } from "./useQueryTerm"
import { useAuth } from './useAuth';
import { RoleCheck } from '@/types/enum';
import { QueryTopic } from './useQueryTopic';
import useParams from '../ui/useParams';

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
    const { lecturerStore } = useAuth()
    const { getQueryField } = useParams()


    const handleUiRender = (): string[] => {
        const currentRole = lecturerStore.currentRoleRender;
        var permissions: string[] = []
        if (currentRole === RoleCheck.HEAD_LECTURER) {
            permissions.push('all')
            permissions.push('crud')
        }
        else if (currentRole === RoleCheck.LECTURER) {
            permissions.push('readOnly')
        }
        else {
            permissions.push('readOnly')
        }
        return permissions
    }

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
    const handleGetGroupStudentByLecturerByTerm = (lecturerId: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByLecturerSupport, termStore.currentTerm.id, lecturerId], () => getGroupStudentByLecturerByTerm(termStore.currentTerm.id, lecturerId), {
            staleTime: 10000
        })
    }
    const handleGetGroupStudentByLecturerTermId = (lecturerTermId?: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByLecturerTermId, lecturerTermId], () => getGroupStudentByLecturerByTerm(termStore.currentTerm.id), {
            staleTime: 5000
        })
    }
    const onAssignTopicGroupStudent = (topicId: string) => {
        return useMutation((id: string) => assignTopic(id, topicId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Phân nhóm sinh viên cho đề tài thành công', { variant: 'success' })
                    queryClient.invalidateQueries([QueryTopic.getSearchTopic, termStore.currentTerm.id, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')])
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, params.limit, params.page, 'all', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termStore.currentTerm.id])
                    queryClient.invalidateQueries([QueryTopic.getGroupByTopic, termStore.currentTerm.id, topicId])
                }
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    const handleGetCountOfGroupStudent = () => {
        return useQuery([QueryKeysGroupStudent.getCountOfGroupStudent, termStore.currentTerm.id], () => getCountOfGroupStudent(termStore.currentTerm.id))
    }
    //[GET BY ID]
    const handleGetGroupStudentById = (id: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentById, id], () => getGroupStudentById(id), {
            staleTime: 1000,
            enabled: !!id
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
            }, onError() {
                enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'error' })
            }
        })
    }
    const onImportGroupStudent = () => {
        return useMutation(() => importGroupStudent(termId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Import danh sách nhóm sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termStore.currentTerm.id, params.limit, params.page, 'all', ''] })
                }
            }, onError() {
                enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'error' })
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
            }, onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })

            }
        })
    }
    return {
        params,
        renderUi,
        handleUiRender,
        handleManagerRenderActionGroupStudent,
        handleGetCountOfGroupStudent,
        handleGetStudentNoHaveGroup,
        handleGetGroupStudentByTerm,
        handleGetGroupStudentById,
        handleGetGroupStudentByLecturerByTerm,
        onDeleteGroupStudent,
        onCreateGroupStudent,
        onImportGroupStudent,
        onAssignTopicGroupStudent
    }
}
export default useGroupStudent