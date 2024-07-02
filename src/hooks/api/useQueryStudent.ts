import ResponseType from '@/types/axios.type';
import { queryClient } from '@/providers/ReactQueryClientProvider'
import { createStudent, getAllStudent, getStudentById, lockOnlyStudent, searchStudentAdmin, updateStatusStudent, updateStudent } from '@/services/apiStudent'
import { ENUM_RENDER_STUDENT, setParams, setTypeRender } from '@/store/slice/student.slice'
import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useTerm } from './useQueryTerm'

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
    const dispatch = useDispatch()

    //[MANAGAER]
    const handleManagerRenderActionStudent = (termId: string | number, limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email',
        keywords: string | number, typeRender: ENUM_RENDER_STUDENT) => {
        // let key = [QueryStudent.getAllStudent, ENUM_RENDER_STUDENT.ALL, termId, limit, page]
        // let callback = getAllStudent(termId, limit, page)
        // if (typeRender === ENUM_RENDER_STUDENT.SEARCH) {
        //     key = [QueryStudent.searchStudentByField, termId, limit, page, searchField, keywords]
        //     callback = searchStudentAdmin(termId, limit, page, searchField, keywords)
        // }
        return useQuery([QueryStudent.getAllStudent, ENUM_RENDER_STUDENT.ALL, termStore.currentTerm.id, limit, page], () => getAllStudent(termId, limit, page), {
            onSuccess(data: any) {
                dispatch(setParams(data.params))
                dispatch(setTypeRender(typeRender))
            },
            staleTime: 10000,
        })
    }

    //[GET ALL]
    const handleGetAllStudent = (termId: string | number, limit: number, page: number) => {
        return useQuery([QueryStudent.getAllStudent, termId, limit, page], () => getAllStudent(termId, limit, page))
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
                queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, ENUM_RENDER_STUDENT.ALL, termStore.currentTerm.id, params.limit, params.page] })
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
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, ENUM_RENDER_STUDENT.ALL, termStore.currentTerm.id, params.limit, params.page], })
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
                    queryClient.invalidateQueries({ queryKey: [QueryStudent.getAllStudent, ENUM_RENDER_STUDENT.ALL, termStore.currentTerm.id, params.limit, params.page] })
                }
            }
            ,
            onError() {
                enqueueSnackbar('Tạo sinh viên thất bại, thử lại', { variant: 'error' })

            }
        })
    }

    return {
        params,
        renderUi,
        onLockOnlyStudent,
        handleManagerRenderActionStudent,
        handleGetStudentById,
        onUpdateStudent,
        onCreateStudent,
        handleGetAllStudent
    }
}