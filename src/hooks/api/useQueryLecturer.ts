import { queryClient } from '@/providers/ReactQueryClientProvider';
import { createLecturer, deleteLecturerById, getAllLecturer, getLecturerById, updateLecturerById } from "@/services/apiLecturer"
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"

export enum QueryKeysLecturer {
    getAllLecturer = 'getAllLecturer',
    createLecturer = 'createLecturer',
    getLecturerById = "getLecturerById",

}
export const useLecturer = () => {
    const {
        enqueueSnackbar
    } = useSnackbar()

    const handleGetAllLecturer = () => {
        return useQuery([QueryKeysLecturer.getAllLecturer], () => getAllLecturer(), {
            staleTime: 10000,
        })
    }
    const handleGetLecturerById = (id: number | string) => {
        return useQuery([QueryKeysLecturer.getLecturerById, id], () => getLecturerById(id))
    }

    const onCreateLecturer = (lecturer: any) => {
        return useMutation((lecturer: any) => createLecturer(lecturer), {
            onSuccess() {
                enqueueSnackbar("Tạo giang vien thành công", { variant: 'success' })
            },
            onError(error) {
                console.log("🚀 ~ onError ~ error:", error)
                enqueueSnackbar("Tạo giang vien thất bại", { variant: 'error' })
            },
        },
        );
    }
    const onUpdateLecturer = (id: number | string, lecturer: any) => {

        return useMutation((lecturer: any) => updateLecturerById(id, lecturer), {

            onSuccess() {
                enqueueSnackbar("Cập nhật giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getAllLecturer] });
            },
            onError(error) {
                console.log("🚀 ~ onError ~ error:", error)
                enqueueSnackbar("Cập nhật giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }
    const onDeleteLecturer = (id: number | string) => {

        return useMutation((id: number | string) => deleteLecturerById(id), {
            onSuccess() {
                enqueueSnackbar("Xóa giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getAllLecturer] });
            },
            onError(error) {
                console.log("🚀 ~ onError ~ error:", error)
                enqueueSnackbar("Xóa giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }
    return {
        onCreateLecturer,
        onDeleteLecturer,
        onUpdateLecturer,
        handleGetAllLecturer,
        handleGetLecturerById
    }
}

