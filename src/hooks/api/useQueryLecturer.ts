import { queryClient } from '@/providers/ReactQueryClientProvider';
import { createLecturer, deleteLecturerById, getAllLecturer, getLecturerById, updateLecturerById } from "@/services/apiLecturer"
import { importLecturerTerm } from '@/services/apiLecturerTerm';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"

export enum QueryKeysLecturer {
    getAllLecturer = 'getAllLecturer',
    createLecturer = 'createLecturer',
    getLecturerById = "getLecturerById",
}

export const useLecturer = () => {
    const {enqueueSnackbar} = useSnackbar()

    //[GET ALL]
    const handleGetAllLecturer = (termId: string | number, limit: number, page: number) => {
        return useQuery([QueryKeysLecturer.getAllLecturer, termId, limit, page], () => getAllLecturer(termId, limit, page), {
            staleTime: 10000,
        })
    }

    //[GET BY ID]
    const handleGetLecturerById = (id: number | string) => {
        return useQuery([QueryKeysLecturer.getLecturerById, id], () => getLecturerById(id), {
            enabled: !!id
        })
    }

    //[CREATE]
    const onCreateLecturer = (termId: string | number, limit: number, page: number) => {
        return useMutation((lecturer: any) => createLecturer(lecturer), {
            onSuccess() {
                enqueueSnackbar("Tạo giang vien thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getAllLecturer, termId, limit, page] });
            },
            onError(error) {
                enqueueSnackbar("Tạo giảng vien thất bại", { variant: 'error' })
            },
        },
        );
    }

    //[UPDATE]
    const onUpdateLecturer = (id: number | string, termId: string | number, limit: number, page: number) => {
        return useMutation((lecturer: any) => updateLecturerById(id, lecturer), {
            onSuccess() {
                enqueueSnackbar("Cập nhật giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getAllLecturer, termId, limit, page] });
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getLecturerById, id] });
            },
            onError(error) {
                enqueueSnackbar("Cập nhật giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            },

        })
    }

    //[DELETE]
    const onDeleteLecturer = (id: number | string, termId: string | number, limit: number, page: number) => {
        return useMutation((id: number | string) => deleteLecturerById(id), {
            onSuccess() {
                enqueueSnackbar("Xóa giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getAllLecturer] });
            },
            onError(error) {
                enqueueSnackbar("Xóa giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[IMPORT]
    const onImportLecturerTerm = (termId: string | number) => {
        return useMutation((termId: number) => importLecturerTerm(termId), {
            onSuccess(data: any) {
                if (data.success) {
                    enqueueSnackbar("Cập nhật danh sách giảng viên thành công", { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getAllLecturer, termId, 20, 1] });
                };
            },
            onError(error) {
                enqueueSnackbar("Cập nhật danh sách giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }
    
    return {
        onCreateLecturer,
        onDeleteLecturer,
        onUpdateLecturer,
        onImportLecturerTerm,
        handleGetAllLecturer,
        handleGetLecturerById
    }
}

