import { queryClient } from '@/providers/ReactQueryClientProvider';
import { createLecturer, deleteLecturerById, getAllLecturer, getLecturerById, resetPassword, updateLecturerById } from "@/services/apiLecturer"
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import { useSelector } from 'react-redux';
import { QueryKeysGroupLecturer } from './useQueryGroupLecturer';
import { useMajor } from './useQueryMajor';
import { Lecturer } from '@/types/entities';
import { ResponseType } from '@/types/axios.type';
import useParams from '../ui/useParams';
import { setParamTotalPageLectuerMajor } from '@/store/slice/lecturer.slice';
import { useDispatch } from 'react-redux';
import { useTerm } from './useQueryTerm';
import { QueryKeysLecturerTerm } from './useQueryLecturerTerm';

export enum QueryKeysLecturer {
    getAllLecturer = 'getAllLecturer',
    createLecturer = 'createLecturer',
    getLecturerById = "getLecturerById",
    searchLecturerByField = 'searchLecturerByField',
}

export const useLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const lecturerStore = useSelector((state: any) => state.lecturerSlice)
    const { me, currentRoleRender, renderUi, paramTotalPage } = lecturerStore
    const { majorStore } = useMajor()
    const { termStore } = useTerm()
    const { getQueryField, setTotalPage } = useParams()
    const majorId = majorStore.currentMajor.id
    const dispatch = useDispatch()
    const termId = termStore.currentTerm.id

    // [GET ALL]
    const handleGetAllLecturer = () => {
        return useQuery(
            [QueryKeysLecturer.getAllLecturer, majorId,
            getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')],
            () => getAllLecturer(majorId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params' | 'lecturers'>) {
                const total = data.params ? data.params.totalPage : 0
                setTotalPage(total)
                dispatch(setParamTotalPageLectuerMajor(total))
            },
            staleTime: 1000 * (60 * 10), // 10 min,
            refetchInterval: 1000 * (60 * 20), //20 min
            keepPreviousData: true,
        })
    }
    //[GET BY ID]
    const handleGetLecturerById = (id: string) => {
        return useQuery([QueryKeysLecturer.getLecturerById, id], () => getLecturerById(id), {
            enabled: !!id,
            cacheTime: 1000 * (60 * 1),
        })
    }
    //[CREATE]
    const onCreateLecturer = () => {
        return useMutation((lecturer: Partial<Lecturer>) => createLecturer(lecturer), {
            onSuccess() {
                enqueueSnackbar("Tạo giang vien thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.getAllLecturer, majorId,
                    getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')]
                );
                queryClient.invalidateQueries(
                    [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        "10", "1", "", ""]
                );
            },
            onError(err: Pick<ResponseType, 'status' | 'message'>) {
                if (err.status < 500) {
                    enqueueSnackbar(err.message, { variant: 'error' })
                }
                else
                    enqueueSnackbar("Tạo giảng vien thất bại", { variant: 'error' })
            },
        },
        );
    }
    //[UPDATE]
    const onResetPassword = () => {
        return useMutation((lecturerId: string) => resetPassword(lecturerId), {
            onSuccess() {
                enqueueSnackbar("Reset mật khẩu giảng viên thành công", { variant: 'success' })
            },
            onError(err: Pick<ResponseType, 'status' | 'message'>) {
                if (err.status < 500) {
                    enqueueSnackbar(err.message, { variant: 'error' })
                }
                else
                    enqueueSnackbar("Cập nhật mật khẩu giảng vien thất bại", { variant: 'error' })
            },

        })
    }
    //[UPDATE]
    const onUpdateLecturer = (id?: string) => {
        const lecturerId = id ? id : me.user.id
        return useMutation((lecturer: Lecturer) => updateLecturerById(lecturerId, lecturer), {
            onSuccess() {
                enqueueSnackbar("Cập nhật giảng viên thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.getAllLecturer, majorId,
                    getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')]
                );
                if (lecturerId === me.user.id) {
                    queryClient.invalidateQueries({ queryKey: ['get-me'] });
                }
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getLecturerById, id] });
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, 'reviewer'] })
                queryClient.invalidateQueries(
                    [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        "10", "1", "", ""]
                );
            },
            onError(err: Pick<ResponseType, 'status' | 'message'>) {
                if (err.status < 500) {
                    enqueueSnackbar(err.message, { variant: 'error' })
                }
                else
                    enqueueSnackbar("Tạo giảng vien thất bại", { variant: 'error' })
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
                    getQueryField('limit'), 1, getQueryField('searchField'), getQueryField('keywords')]
                );
                queryClient.invalidateQueries(
                    [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        "10", "1", "", ""]
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
        paramTotalPage: paramTotalPage.lecturerMajor,
        onCreateLecturer,
        onResetPassword,
        onDeleteLecturer,
        onUpdateLecturer,
        handleGetLecturerById,
        handleGetAllLecturer
    }
}

