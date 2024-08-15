import { queryClient } from '@/providers/ReactQueryClientProvider';
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
import * as LecturerServices from '@/services/apiLecturer'

export enum QueryKeysLecturer {
    getAllLecturer = 'getAllLecturer',
    createLecturer = 'createLecturer',
    getLecturerById = "getLecturerById",
    searchLecturerByField = 'searchLecturerByField',
    getCountOfMajorLecturer = "getCountOfMajorLecturer"

}

export const useLecturer = () => {
    //[REDUX]
    const lecturerStore = useSelector((state: any) => state.lecturerSlice)
    const { majorStore } = useMajor()
    const { termStore } = useTerm()
    const majorId = majorStore.currentMajor.id
    const termId = termStore.currentTerm.id
    const { me, currentRoleRender, renderUi, paramTotalPage } = lecturerStore
    const dispatch = useDispatch()

    //[PARAMS URL] 
    const { getQueryField, setTotalPage, setLimit, setPage } = useParams()

    //[OTHER]
    const { enqueueSnackbar } = useSnackbar()

    //[GET]
    const handleGetCountOfMajorLecturer = () => {
        return useQuery([QueryKeysLecturer.getCountOfMajorLecturer, majorId],
            () => LecturerServices.getCountOfMajorLecturer(majorId), {
            staleTime: 1000 * (60 * 20), // 10 min,
            refetchInterval: 1000 * (60 * 20), //20 min
        })
    }

    //[GET ALL]
    const handleGetAllLecturer = () => {
        getQueryField('limit') ? getQueryField('limit') : setLimit(10)
        getQueryField('page') ? getQueryField('page') : setPage(1)
        return useQuery(
            [
                QueryKeysLecturer.getAllLecturer,
                majorId,
                getQueryField('limit'),
                getQueryField('page'),
                getQueryField('searchField'),
                getQueryField('keywords')
            ],
            () => LecturerServices.getAllLecturer(
                majorId,
                getQueryField('limit'),
                getQueryField('page'),
                getQueryField('searchField'),
                getQueryField('keywords')
            ),
            {
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
        return useQuery([QueryKeysLecturer.getLecturerById, id], () => LecturerServices.getLecturerById(id), {
            enabled: !!id,
            cacheTime: 1000 * (60 * 1),
        })
    }

    //[POST]
    const onCreateLecturer = () => {
        return useMutation((lecturer: Partial<Lecturer>) => LecturerServices.createLecturer(lecturer),
            {
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

    //[POST]
    const onResetPassword = () => {
        return useMutation((lecturerId: string) => LecturerServices.resetPassword(lecturerId),
            {
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
    //[PUT]
    const onUpdateLecturer = (id?: string) => {
        const lecturerId = id ? id : me.user.id
        return useMutation((lecturer: Lecturer) => LecturerServices.updateLecturerById(lecturerId, lecturer),
            {
                onSuccess() {
                    enqueueSnackbar("Cập nhật giảng viên thành công", { variant: 'success' })
                    if (lecturerId === me.user.id) {
                        queryClient.invalidateQueries({ queryKey: ['get-me'] });
                    }
                    queryClient.invalidateQueries(
                        [QueryKeysLecturer.getAllLecturer, majorId,
                        getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')]
                    );
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getLecturerById, id] });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, 'reviewer'] })
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.getAllLectuerTermByParams, termId, "10", "1", "", ""]);
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
        return useMutation((id: string) => LecturerServices.deleteLecturerById(id), {
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
        handleGetLecturerById,
        handleGetAllLecturer,
        handleGetCountOfMajorLecturer,
        onCreateLecturer,
        onResetPassword,
        onDeleteLecturer,
        onUpdateLecturer
    }
}

