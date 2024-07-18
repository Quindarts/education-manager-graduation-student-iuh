import ResponseType from '@/types/axios.type';
import { queryClient } from '@/providers/ReactQueryClientProvider'
import { createStudent, getAllStudent, getAllStudentByMajor, getStudentById, lockOnlyStudent, resetPasswordStudent, searchStudentAdmin, updateStatusStudent, updateStudent } from '@/services/apiStudent'
import { ENUM_RENDER_STUDENT, setParams, setTypeRender } from '@/store/slice/student.slice'
import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useTerm } from './useQueryTerm'
import { useMajor } from './useQueryMajor';

export enum QueryStudent {
    getAllStudent = 'getAllStudent',
    getStudentById = 'getStudentById',
    searchStudentByField = 'searchStudentByField',
    managerActionStudent = 'managerActionStudent'
}
export const useStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const studentStore = useSelector((state: any) => state.studentSlice)
    const { params, renderUi } = studentStore
    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const dispatch = useDispatch()

    //[MANAGAER]
    const handleManagerRenderActionStudent = (termId: string, majorId?: string, limit?: number, page?: number, searchField?: 'full_name' | 'username' | 'phone' | 'email',
        keywords?: string | number, typeRender?: ENUM_RENDER_STUDENT) => {

        const currentMajor = majorId ? majorId : majorStore.currentMajor.id
        return useQuery([QueryStudent.getAllStudent, termStore.currentTerm.id, currentMajor, limit, page], () => getAllStudentByMajor(termId, currentMajor, limit, page), {
            onSuccess(data: any) {
                dispatch(setParams(data.params))
                dispatch(setTypeRender(typeRender))
            },
            staleTime: 10000,
        })
    }

    //[GET ALL]
    const handleGetAllStudent = (termId?: string, majorId?: string, limit?: number, page?: number) => {
        const currentMajor = majorId ? majorId : majorStore.currentMajor.id
        const currentTerm = termId ? termId : termStore.currentTerm.id
        return useQuery([QueryStudent.getAllStudent, currentTerm, currentMajor, limit, page], () => getAllStudentByMajor(currentTerm, currentMajor, limit, page), {
            onSuccess(data: any) {
                dispatch(setParams(data.params))

            },
        })
    }

    //[GET BY ID]
    const handleGetStudentById = (id: number) => {
        return useQuery([QueryStudent.getStudentById, id], () => getStudentById(id), {
            enabled: !!id
        })
    }

    //[UPDATE]
    const onUpdateStudent = (studentId: string) => {
        return useMutation((data) => updateStudent(studentId, data), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.student)
                    enqueueSnackbar('Cập nhật sinh viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page] })
                queryClient.invalidateQueries({ queryKey: [QueryStudent.getStudentById, studentId] })
            }
            ,
            onError() {
                enqueueSnackbar('Cập nhật sinh viên thất bại, thử lại', { variant: 'error' })

            }
        })
    }
    const onLockOnlyStudent = (studentId: string) => {
        return useMutation((status) => lockOnlyStudent(studentId, status), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar(`sinh viên thành công!`, { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page] })
                    queryClient.invalidateQueries({ queryKey: [`get-student-by-id`, studentId] })
                }
            }
        })
    }
    const onCreateStudent = (termId: string | number, limit: number, page: number) => {
        return useMutation((data) => createStudent(data), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'student'>) {
                if (data.success) {
                    enqueueSnackbar('Tạo sinh viên thành công', { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page] })
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
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page] })
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
        params,
        renderUi,
        onResetPassword,
        onLockOnlyStudent,
        handleManagerRenderActionStudent,
        handleGetStudentById,
        onUpdateStudent,
        onCreateStudent,
        handleGetAllStudent
    }
}