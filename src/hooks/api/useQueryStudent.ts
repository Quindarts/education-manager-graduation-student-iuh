import { queryClient } from '@/providers/ReactQueryClientProvider'
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
import * as StudentServices from "@/services/apiStudent"
//[KEYS]
export enum QueryStudent {
    getAllStudent = 'getAllStudent',
    getStudentsAssignTopic = "getStudentsAssignTopic",
    getStudentById = 'getStudentById',
    searchStudentByField = 'searchStudentByField',
    managerActionStudent = 'managerActionStudent',
    getCountOfStudent = "getCountOfStudent"
}
export const useStudent = () => {

    //[REDUX]
    const studentStore = useSelector((state: any) => state.studentSlice)
    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const dispatch = useDispatch()

    //[PARAMS URL]
    const { paramTotalPage } = studentStore
    const majorId = majorStore.currentMajor.id
    const termId = termStore.currentTerm.id
    const { getQueryField, setTotalPage, setLimit, setPage } = useParams()

    //[OTHER]
    const { enqueueSnackbar } = useSnackbar()

    //[GET]
    const handleGetStudentsAssignTopic = (keywords: string, searchField: string) => {
        return useQuery([QueryStudent.getStudentsAssignTopic, termId, keywords, searchField], () => StudentServices.getStudentsAssignTopic(termId, keywords, searchField), {
            staleTime: 1000 * (60 * 10), // 10 min,
            refetchInterval: 1000 * (60 * 20),
            keepPreviousData: true,
            enabled: keywords !== ''
        })
    }

    //[GET]
    const handleGetAllStudent = () => {
        getQueryField('limit') ? getQueryField('limit') : setLimit(10)
        getQueryField('page') ? getQueryField('page') : setPage(1)
        return useQuery
            ([QueryStudent.getAllStudent, termId, majorId,
            getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')],
                () => StudentServices.getStudentOfSearch(termId, majorId, getQueryField('limit'),
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

    const handleGetCountOfStudent = () => {
        return useQuery([QueryStudent.getCountOfStudent], () => StudentServices.getCountOfStudent(termId), {
            staleTime: 1000 * (60 * 10),
            refetchInterval: 100 * (60 * 20),
            enabled: !!termId
        })
    }

    //[GET BY ID]
    const handleGetStudentById = (id: string) => {
        return useQuery([QueryStudent.getStudentById, id], () => StudentServices.getStudentById(id), {
            enabled: !!id,
            cacheTime: 1000 * (60 * 1)
        })
    }

    //[PUT]
    const onUpdateStudent = (id: string) => {
        return useMutation((data: Partial<Student>) => StudentServices.updateStudent(id, data), {
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

    //[PUT]
    const onLockOnlyStudent = (id: string) => {
        return useMutation((status: boolean) => StudentServices.lockOnlyStudent(id, status), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar(`sinh viên thành công!`, { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termId, majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')] })
                    queryClient.invalidateQueries({ queryKey: [`get-student-by-id`, id] })
                }
            }
        })
    }

    //[POST]
    const onCreateStudent = () => {
        return useMutation((data: Partial<Student>) => StudentServices.createStudent(data), {
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

    //[DELETE]
    const onDeleteStudent = () => {
        return useMutation((id: string) => StudentServices.deleteStudent(id), {
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

    //[PUT]
    const onResetPassword = () => {
        return useMutation((username: string) => StudentServices.resetPasswordStudent(username), {
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
        handleGetStudentById,
        handleGetAllStudent,
        handleGetStudentsAssignTopic,
        handleGetCountOfStudent,
        onDeleteStudent,
        onUpdateStudent,
        onCreateStudent,
        onResetPassword,
        onLockOnlyStudent,
    }
}