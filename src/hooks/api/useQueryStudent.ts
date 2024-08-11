import { queryClient } from '@/providers/ReactQueryClientProvider'
import { createStudent, deleteStudent, getStudentById, getStudentOfSearch, getStudentsAssignTopic, lockOnlyStudent, resetPasswordStudent, updateStudent } from '@/services/apiStudent'
import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import { useTerm } from './useQueryTerm'
import { useMajor } from './useQueryMajor';
import useParams from '../ui/useParams';
import { ResponseType } from '@/types/axios.type'
import { Student } from '@/types/entities'
import { useDispatch } from 'react-redux'
import { setParamTotalPage } from '@/store/slice/student.slice'

export enum QueryStudent {
    getAllStudent = 'getAllStudent',
    getStudentsAssignTopic = "getStudentsAssignTopic",
    getStudentById = 'getStudentById',
    searchStudentByField = 'searchStudentByField',
    managerActionStudent = 'managerActionStudent'
}
export const useStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const studentStore = useSelector((state: any) => state.studentSlice)
    const { paramTotalPage } = studentStore

    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const majorId = majorStore.currentMajor.id
    const termId = termStore.currentTerm.id
    const { getQueryField, setTotalPage } = useParams()
    const dispatch = useDispatch()
    //[GET ALL]
    const handleGetStudentsAssignTopic = (keywords: string, searchField: string) => {
        return useQuery([QueryStudent.getStudentsAssignTopic, termId, keywords, searchField], () => getStudentsAssignTopic(termId, keywords, searchField), {
            staleTime: 1000 * (60 * 10), // 10 min,
            refetchInterval: 1000 * (60 * 20),
            keepPreviousData: true,
            enabled: keywords !== ''
        })
    }
    const handleGetAllStudent = () => {
        return useQuery
            ([QueryStudent.getAllStudent, termId, majorId,
            getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')],
                () => getStudentOfSearch(termId, majorId, getQueryField('limit'),
                    getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')),
                {
                    onSuccess(data: any) {
                        const total = data.params ? data.params.totalPage : 0
                        dispatch(setParamTotalPage(total))
                        setTotalPage(total)
                    },
                    staleTime: 1000 * (60 * 10), // 10 min,
                    refetchInterval: 1000 * (60 * 20),
                    keepPreviousData: true,
                })
    }

    //[GET BY ID]
    const handleGetStudentById = (id: string) => {
        return useQuery([QueryStudent.getStudentById, id], () => getStudentById(id), {
            enabled: !!id,
            cacheTime: 1000 * (60 * 1)
        })
    }

    //[UPDATE]
    const onUpdateStudent = (id: string) => {
        return useMutation((data: Partial<Student>) => updateStudent(id, data), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.student)
                    enqueueSnackbar('Cập nhật sinh viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termId, majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')] })
                queryClient.invalidateQueries({ queryKey: [QueryStudent.getStudentById, id] })
            },
            onError() {
                enqueueSnackbar('Cập nhật sinh viên thất bại, thử lại', { variant: 'error' })

            }
        })
    }
    const onLockOnlyStudent = (id: string) => {
        return useMutation((status: boolean) => lockOnlyStudent(id, status), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar(`sinh viên thành công!`, { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termId, majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')] })
                    queryClient.invalidateQueries({ queryKey: [`get-student-by-id`, id] })
                }
            }
        })
    }
    const onCreateStudent = () => {
        return useMutation((data: Partial<Student>) => createStudent(data), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar('Tạo sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termId, majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')] })
                }
            }
            ,
            onError() {
                enqueueSnackbar('Tạo sinh viên thất bại, thử lại', { variant: 'error' })

            }
        })
    }
    const onDeleteStudent = () => {
        return useMutation((id: string) => deleteStudent(id), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar("Xóa sinh viên ra khỏi học kì.", { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termId, majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')] })
                }
            }
            ,
            onError() {
                enqueueSnackbar('Tạo sinh viên thất bại, thử lại', { variant: 'error' })

            }
        })
    }

    const onResetPassword = () => {
        return useMutation((username: string) => resetPasswordStudent(username), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar('Cấp lại mật khẩu thành công', { variant: 'success' })
                }
            },
            onError(error: any) {
                if (error.status === 404)
                    enqueueSnackbar(error.message, { variant: 'error' })
                else
                    enqueueSnackbar("Cập nhật mật khẩu thất bại", { variant: 'error' })
            }
        })
    }

    return {
        paramTotalPage,
        studentStore,
        onResetPassword,
        onLockOnlyStudent,
        handleGetStudentById,
        onUpdateStudent,
        onCreateStudent,
        handleGetAllStudent,
        handleGetStudentsAssignTopic,
        onDeleteStudent
    }
}