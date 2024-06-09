import { queryClient } from '@/providers/ReactQueryClientProvider'
import { getAllStudent, getStudentById, updateStudent } from '@/services/apiStudent'
import { useSnackbar } from 'notistack'
import { useMutation, useQuery } from 'react-query'


export const useStudent = () => {
    const { enqueueSnackbar } = useSnackbar()
    const handleGetAllStudent = (termId: string | number, limit: number, page: number) => {
        return useQuery(['get-all-student', termId, limit, page], () => getAllStudent(termId, limit, page))
    }
    const handleGetStudentById = (id: number) => {
        return useQuery([`get-student-by-id`, id], () => getStudentById(id), {
            enabled: !!id
        })
    }
    const onUpdateStudent = (studentId: string | number, termId: string | number, limit: number, page: number) => {
        return useMutation((data) => updateStudent(studentId, data), {
            onSuccess(data: any) {
                if (data.success)
                    enqueueSnackbar('Cập nhật sinh viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: ['get-all-student', termId, limit, page] })
                queryClient.invalidateQueries({ queryKey: [`get-student-by-id`, studentId] })
            }
            ,
            onError(err) {
                console.log("🚀 ~ onError ~ err:", err)
                enqueueSnackbar('Cập nhật sinh viên thất bại, thử lại', { variant: 'error' })

            }
        })

    }

    return {
        handleGetStudentById, onUpdateStudent,
        handleGetAllStudent
    }
}