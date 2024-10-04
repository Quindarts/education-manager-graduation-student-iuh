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
    getSearchStudentBasic = "getSearchStudentBasic",
    getStudentById = 'getStudentById',
    searchStudentByField = 'searchStudentByField',
    managerActionStudent = 'managerActionStudent',
    getCountOfStudent = "getCountOfStudent",
    getStudentsToExport = "getStudentsToExport"
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
    const handleGetSearchStudentBasic = (keywords: string, searchField: string) => {
        return useQuery([QueryStudent.getSearchStudentBasic, termId, keywords, searchField], () => StudentServices.getSearchStudentBasic(termId, keywords, searchField), {
            staleTime: 1000 * (60 * 10), // 10 min,
            refetchInterval: 1000 * (60 * 20),
            keepPreviousData: true,
            cacheTime: 1000,
            // cacheTime: 1000
        })
    }

    //[GET]
    const handleGetAllStudent = () => {
        getQueryField('limit') ? getQueryField('limit') : setLimit(10)
        getQueryField('page') ? getQueryField('page') : setPage(1)
        return useQuery
            ([QueryStudent.getAllStudent,
                termId,
                majorId,
            getQueryField('limit'),
            getQueryField('page'),
            getQueryField('searchField'),
            getQueryField('sort'),
            getQueryField('keywords')],
                () => StudentServices.getStudentOfSearch(
                    termId,
                    majorId,
                    getQueryField('limit'),
                    getQueryField('page'),
                    getQueryField('searchField'),
                    getQueryField('sort'),
                    getQueryField('keywords')),
                {
                    onSuccess(data: any) {
                        const total = data.params ? data.params.totalPage : 0
                        dispatch(setParamTotalPage(total))
                        setTotalPage(total)
                    },
                    staleTime: 1000 * (60 * 10), // 10 min,
                    cacheTime: 1000,
                    refetchInterval: 1000 * (60 * 20),
                    keepPreviousData: true,
                    refetchOnMount: true,
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
                enqueueSnackbar('Cập nhật sinh viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({
                    queryKey: [QueryStudent.getAllStudent,
                        termId,
                        majorId,
                    getQueryField('limit'),
                    getQueryField('page'),
                    getQueryField('searchField'),
                    getQueryField('sort'),
                    getQueryField('keywords')]
                })
                queryClient.invalidateQueries({ queryKey: [QueryStudent.getStudentById, id] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }

    //[PUT]
    const onLockOnlyStudent = (id: string) => {
        return useMutation((status: boolean) => StudentServices.lockOnlyStudent(id, status), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar(`sinh viên thành công!`, { variant: 'success' })
                    queryClient.invalidateQueries({
                        queryKey: [QueryStudent.getAllStudent,
                            termId,
                            majorId,
                        getQueryField('limit'),
                        getQueryField('page'),
                        getQueryField('searchField'),
                        getQueryField('sort'),
                        getQueryField('keywords')]
                    })
                    queryClient.invalidateQueries({ queryKey: [`get-student-by-id`, id] })
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
    //[PUT]
    const onLockAllStudents = () => {
        return useMutation(() => StudentServices.lockAllStudents(termId), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar(`Khóa tài khoản tất cả sinh viên!`, { variant: 'success' })
                    queryClient.invalidateQueries({
                        queryKey: [QueryStudent.getAllStudent,
                            termId,
                            majorId,
                        getQueryField('limit'),
                        getQueryField('page'),
                        getQueryField('searchField'),
                        getQueryField('sort'),
                        getQueryField('keywords')]
                    })
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
    //[POST]
    const onCreateStudent = () => {
        return useMutation((data: Partial<Student>) => StudentServices.createStudent(data), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar('Tạo sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({
                        queryKey: [QueryStudent.getAllStudent,
                            termId,
                            majorId,
                        getQueryField('limit'),
                        getQueryField('page'),
                        getQueryField('searchField'),
                        getQueryField('sort'),
                        getQueryField('keywords')]
                    })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getCountOfStudent] })
                    queryClient.invalidateQueries({
                        queryKey: [QueryStudent.getCountOfStudent]
                    })
                }
            }
            ,
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    const handleGetStudentsToExport = () => {
        return useQuery([QueryStudent.getStudentsToExport, termId, majorId], () => StudentServices.getStudentsToExport(termId, majorId))
    }
    //[DELETE]
    const onDeleteStudent = () => {
        return useMutation((id: string) => StudentServices.deleteStudent(id), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                enqueueSnackbar("Xóa sinh viên ra khỏi học kì.", { variant: 'success' })
                queryClient.invalidateQueries({
                    queryKey: [QueryStudent.getAllStudent,
                        termId,
                        majorId,
                    getQueryField('limit'),
                    getQueryField('page'),
                    getQueryField('searchField'),
                    getQueryField('sort'),
                    getQueryField('keywords')]
                })
                queryClient.invalidateQueries({
                    queryKey: [QueryStudent.getCountOfStudent]
                })
            }
            ,
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
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
        studentStore,
        handleGetStudentById,
        handleGetAllStudent,
        handleGetSearchStudentBasic,
        handleGetCountOfStudent,
        handleGetStudentsToExport,
        onDeleteStudent,
        onUpdateStudent,
        onCreateStudent,
        onResetPassword,
        onLockOnlyStudent, onLockAllStudents
    }
}