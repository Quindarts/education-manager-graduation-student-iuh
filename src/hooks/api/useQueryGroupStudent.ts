import { getStudentsNoHaveGroup } from './../../services/apiStudent';
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useTerm } from "./useQueryTerm"
import { useAuth } from './useAuth';
import { RoleCheck } from '@/types/enum';
import { QueryTopic } from './useQueryTopic';
import useParams from '../ui/useParams';
import { setParamTotalPage } from '@/store/slice/groupStudent.slice';
import { ResponseType } from '@/types/axios.type';
import * as GroupStudentServices from "@/services/apiGroupStudent"

export const enum QueryKeysGroupStudent {
    getGroupStudentByTerm = 'getGroupStudentByTerm',
    getGroupStudentByLecturerSupport = 'getGroupStudentByLecturerSupport',
    getGroupStudentById = "getGroupStudentById",
    managerActionGroupStudent = 'managerActionGroupStudent',
    searchGroupStudentByField = 'searchGroupStudentByField',
    getMemberInGroupStudent = "getMemberInGroupStudent",
    getStudentsNohaveGroup = "getStudentsNoHaveGroup",
    getCountOfGroupStudent = "getCountOfGroupStudent",
    getGroupStudentByLecturerTermId = "getGroupStudentByLecturerTermId",
    searchGroupStudentByName = 'searchGroupStudentByName',
    getExportGroupStudent = "getExportGroupStudent"
}
const useGroupStudent = () => {
    //[REDUX]
    const groupStudentStore = useSelector((state: any) => state.groupStudentSlice)
    const { paramTotalPage } = groupStudentStore
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id
    const dispatch = useDispatch()
    const { lecturerStore } = useAuth()

    //[PARAMS URL] 
    const { getQueryField, setTotalPage, setLimit, setPage } = useParams()


    const { enqueueSnackbar } = useSnackbar()

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
    const hanldeSearchGroupStudents = (name: string) => {
        return useQuery([QueryKeysGroupStudent.searchGroupStudentByName, termId, name], () => GroupStudentServices.searchGroupStudentAdmin(termId))
    }

    const handleManagerRenderActionGroupStudent = () => {
        return useQuery(
            [
                QueryKeysGroupStudent.managerActionGroupStudent,
                termId,
                getQueryField('searchField'),
                getQueryField('sort'),
                getQueryField('keywords'),
            ], () => GroupStudentServices.searchGroupStudentAdmin(
                termId,
                getQueryField('searchField'),
                getQueryField('sort'),
                getQueryField('keywords')), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'groupStudents'>) {
            },
            staleTime: 1000 * (60 * 3), // 10 min,
            refetchOnMount: true,
            cacheTime: 1000,
            refetchInterval: 1000 * (60 * 20),
            keepPreviousData: true,
        })
    }
    //[GET BY TERM]
    const handleGetGroupStudentByTerm = (termId?: string, limit?: number, page?: number, majorId?: string, topicId?: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByTerm, termId, 10, 1], () => GroupStudentServices.getGroupStudentByTerm(termId, 10, 1))
    }
    //[GET BY TERM]
    const handleGetGroupStudentByLecturerByTerm = (lecturerId: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentByLecturerSupport, termId, lecturerId], () => GroupStudentServices.getGroupStudentByLecturerByTerm(termId, lecturerId), {
            staleTime: 10000
        })
    }

    const onUnAssignTopicGroupStudent = (topicId: string) => {
        return useMutation((id: string) => GroupStudentServices.removeAssign(id, topicId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Gỡ gán nhóm sinh viên cho đề tài thành công', { variant: 'success' })
                    queryClient.invalidateQueries([QueryTopic.getSearchTopic, termId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')])
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termId, getQueryField('limit'), getQueryField('page'), '', '', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termId])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termId])
                    queryClient.invalidateQueries([QueryTopic.getGroupByTopic, termId, topicId])
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
    const onAssignTopicGroupStudent = (topicId: string) => {
        return useMutation((id: string) => GroupStudentServices.assignTopic(id, topicId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Phân nhóm sinh viên cho đề tài thành công', { variant: 'success' })
                    queryClient.invalidateQueries([QueryTopic.getSearchTopic, termId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')])
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termId, getQueryField('limit'), getQueryField('page'), '', '', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termId])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termId])
                    queryClient.invalidateQueries([QueryTopic.getGroupByTopic, termId, topicId])
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
    const handleGetExportGroupStudent = () => {
        return useQuery([QueryKeysGroupStudent.getExportGroupStudent, termId], () => GroupStudentServices.getExportGroupStudent(termId))
    }
    const handleGetCountOfGroupStudent = () => {
        return useQuery([QueryKeysGroupStudent.getCountOfGroupStudent, termId], () => GroupStudentServices.getCountOfGroupStudent(termId))
    }
    //[GET BY ID]
    const handleGetGroupStudentById = (id: string) => {
        return useQuery([QueryKeysGroupStudent.getGroupStudentById, id], () => GroupStudentServices.getGroupStudentById(id), {
            staleTime: 1000,
            enabled: !!id
        })
    }
    const handleGetStudentNoHaveGroup = () => {
        return useQuery([QueryKeysGroupStudent.getStudentsNohaveGroup, termId], () => getStudentsNoHaveGroup(termId))
    }
    const onCreateGroupStudent = () => {
        return useMutation((studentIds: string[]) => GroupStudentServices.createGroupStudent({ termId: termId, studentIds }), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Tạo nhóm sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termId, getQueryField('limit'), getQueryField('page'), '', '', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termId])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termId])
                }
            },
            onError(err: any) {
                if (err.status < 500) {
                    enqueueSnackbar(err.message, { variant: 'error' })
                }
                else
                    enqueueSnackbar("Cập nhật mật khẩu giảng vien thất bại", { variant: 'error' })
            },
        })
    }
    const onImportGroupStudent = () => {
        return useMutation(() => GroupStudentServices.importGroupStudent(termId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Import danh sách nhóm sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termId, getQueryField('limit'), getQueryField('page'), '', '', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termId])
                }
            }, onError(err: any) {
                if (err.status < 500) {
                    enqueueSnackbar(err.message, { variant: 'error' })
                }
                else
                    enqueueSnackbar("Cập nhật mật khẩu giảng vien thất bại", { variant: 'error' })
            },
        })
    }
    const onDeleteGroupStudent = () => {
        return useMutation((id) => GroupStudentServices.deleteGroupStudent(id), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar('Xóa nhóm sinh vien thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupStudent.managerActionGroupStudent, termId, getQueryField('limit'), getQueryField('page'), '', '', ''] })
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getStudentsNohaveGroup, termId])
                    queryClient.invalidateQueries([QueryKeysGroupStudent.getCountOfGroupStudent, termId])
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

    return {
        paramTotalPage,
        handleUiRender,
        handleManagerRenderActionGroupStudent,
        hanldeSearchGroupStudents,
        handleGetCountOfGroupStudent,
        handleGetStudentNoHaveGroup,
        handleGetGroupStudentByTerm,
        handleGetGroupStudentById,
        handleGetGroupStudentByLecturerByTerm,
        handleGetExportGroupStudent,
        onDeleteGroupStudent,
        onCreateGroupStudent,
        onImportGroupStudent,
        onAssignTopicGroupStudent, onUnAssignTopicGroupStudent
    }
}
export default useGroupStudent