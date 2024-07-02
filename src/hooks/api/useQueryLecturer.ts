import { queryClient } from '@/providers/ReactQueryClientProvider';
import { createLecturer, deleteLecturerById, getAllLecturer, getLecturerById, searchLecturerAdmin, updateLecturerById } from "@/services/apiLecturer"
import { importLecturerTerm } from '@/services/apiLecturerTerm';
import { ENUM_RENDER_LECTURER, setKeywords, setParams, setTypeRender } from '@/store/slice/lecturer.slice';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTerm } from './useQueryTerm';
import { QueryKeysGroupLecturer } from './useQueryGroupLecturer';
import { useApp } from './useApp';
import ResponseType from '@/types/axios.type';

export enum QueryKeysLecturer {
    getAllLecturer = 'getAllLecturer',
    createLecturer = 'createLecturer',
    getLecturerById = "getLecturerById",
    searchLecturerByField = 'searchLecturerByField',
    managerActionLecturer = 'managerActionLecturer'
}

export const useLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const lecturers = useSelector((state: any) => state.lecturerSlice)
    const { params, me, currentRoleRender, renderUi, keywords } = lecturers
    const dispatch = useDispatch()
    const { termStore } = useTerm()

    const { getQueryKey } = useApp();

    const handleManagerRenderActionLecturer = (limit: number, page: number, searchField: string,
        keywords: string | number) => {
        return useQuery([QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, limit, page, renderUi, keywords], () => {
            if (searchField !== 'all' && keywords != '')
                return searchLecturerAdmin(termStore.currentTerm.id, limit, page, searchField, keywords)
            else
                return getAllLecturer(termStore.currentTerm.id, limit, page)
        }, {
            onSuccess(data: any) {
                dispatch(setParams(data.params))
                dispatch(setTypeRender(searchField))
                dispatch(setKeywords(keywords))
            },
            staleTime: 10000,
        })
    }

    // [GET ALL]
    const handleGetAllLecturer = (termId: string | number, limit: number, page: number) => {
        return useQuery([QueryKeysLecturer.getAllLecturer, ENUM_RENDER_LECTURER.ALL, termId, limit, page], () => getAllLecturer(termId, limit, page), {

            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                dispatch(setParams(data.params))
                dispatch(setTypeRender(ENUM_RENDER_LECTURER.ALL))
            },
            staleTime: 10000,
        })
    }
    // [SEARCH ROLE ADMIN]
    const handleSearchLecturerAdmin = (termId: string | number, limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email', keywords: string | number) => {
        return useQuery([QueryKeysLecturer.searchLecturerByField, termId, limit, page, searchField, keywords], () => searchLecturerAdmin(termId, limit, page, searchField, keywords), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                console.log(data.params);
                dispatch(setParams(data.params))
                dispatch(setTypeRender(ENUM_RENDER_LECTURER.SEARCH_FULLNAME))
            },
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
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, params.limit, params.page, renderUi, keywords ? keywords : '']
                );
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.getLecturerById, id] });
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, 'reviewer'] })


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
                queryClient.invalidateQueries(
                    [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, params.limit, params.page, 'full_name', '']
                );
            },
            onError(error) {
                enqueueSnackbar("Xóa giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[IMPORT]
    const onImportLecturerTerm = (termId: string | number) => {
        // let myTerm = termId ? termId : termStore.currentTerm.id
        return useMutation((termId: number) => importLecturerTerm(termStore.currentTerm.id), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                if (data.success) {
                    enqueueSnackbar("Cập nhật danh sách giảng viên thành công", { variant: 'success' })
                    queryClient.invalidateQueries(
                        [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, params.limit, params.page, renderUi, '']
                    );
                };
            },
            onError(error) {
                enqueueSnackbar("Cập nhật danh sách giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    return {
        params,
        me,
        currentRoleRender,
        renderUi,
        onCreateLecturer,
        onDeleteLecturer,
        onUpdateLecturer,
        onImportLecturerTerm,
        // handleGetAllLecturer,
        handleGetLecturerById, handleManagerRenderActionLecturer
    }
}

