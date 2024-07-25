import { queryClient } from '@/providers/ReactQueryClientProvider';
import { createLecturer, deleteLecturerById, getAllLecturer, getLecturerById, updateLecturerById } from "@/services/apiLecturer"
import { importLecturerTerm } from '@/services/apiLecturerTerm';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import { useSelector } from 'react-redux';
import { useTerm } from './useQueryTerm';
import { QueryKeysGroupLecturer } from './useQueryGroupLecturer';
import { useMajor } from './useQueryMajor';
import { Lecturer } from '@/types/entities';
import { ResponseType } from '@/types/axios.type';
import useParams from '../ui/useParams';

export enum QueryKeysLecturer {
    getAllLecturer = 'getAllLecturer',
    createLecturer = 'createLecturer',
    getLecturerById = "getLecturerById",
    searchLecturerByField = 'searchLecturerByField',
}

export const useLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const lecturers = useSelector((state: any) => state.lecturerSlice)
    const { me, currentRoleRender, renderUi } = lecturers
    const { termStore } = useTerm()
    const { majorStore } = useMajor()
    const { getQueryField, setTotalPage } = useParams()
    const majorId = majorStore.currentMajor.id

    // [GET ALL]
    const handleGetAllLecturer = () => {
        return useQuery(
            [QueryKeysLecturer.getAllLecturer, majorId,
            getQueryField('limit'), getQueryField('page'), getQueryField('totalPage'), getQueryField('searchField'), getQueryField('keywords')],
            () => getAllLecturer(majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                setTotalPage(data.params ? data.params.totalPage : 0)
            },
            staleTime: 20000,
        })
    }
    //[GET BY ID]
    const handleGetLecturerById = (id: string) => {
        return useQuery([QueryKeysLecturer.getLecturerById, id], () => getLecturerById(id), {
            enabled: !!id
        })
    }
    //[CREATE]
    const onCreateLecturer = () => {
        return useMutation((lecturer: Partial<Lecturer>) => createLecturer(lecturer), {
            onSuccess() {
                enqueueSnackbar("Tạo giang vien thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.getAllLecturer, majorId,
                    getQueryField('limit'), getQueryField('page'), getQueryField('totalPage'), getQueryField('searchField'), getQueryField('keywords')]
                );
            },
            onError() {
                enqueueSnackbar("Tạo giảng vien thất bại", { variant: 'error' })
            },
        },
        );
    }

    //[UPDATE]
    const onUpdateLecturer = (id: string) => {
        return useMutation((lecturer: Lecturer) => updateLecturerById(id, lecturer), {
            onSuccess() {
                enqueueSnackbar("Cập nhật giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.getAllLecturer, majorId,
                    getQueryField('limit'), getQueryField('page'), getQueryField('totalPage'), getQueryField('searchField'), getQueryField('keywords')]
                );
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getLecturerById, id] });
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, 'reviewer'] })


            },
            onError() {
                enqueueSnackbar("Cập nhật giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            },

        })
    }

    //[DELETE]
    const onDeleteLecturer = () => {
        return useMutation((id: string) => deleteLecturerById(id), {
            onSuccess() {
                enqueueSnackbar("Xóa giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.getAllLecturer, majorId,
                    getQueryField('limit'), 1, getQueryField('totalPage'), getQueryField('searchField'), getQueryField('keywords')]
                );
            },
            onError() {
                enqueueSnackbar("Xóa giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }



    return {
        me,
        currentRoleRender,
        renderUi,
        onCreateLecturer,
        onDeleteLecturer,
        onUpdateLecturer,
        handleGetLecturerById,
        handleGetAllLecturer
    }
}

