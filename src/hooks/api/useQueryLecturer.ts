import { queryClient } from '@/providers/ReactQueryClientProvider';
import { createLecturer, deleteLecturerById, getAllLecturer, getLecturerById, searchLecturerAdmin, updateLecturerById } from "@/services/apiLecturer"
import { importLecturerTerm } from '@/services/apiLecturerTerm';
import { setKeywords, setParams, setTypeRender } from '@/store/slice/lecturer.slice';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useTerm } from './useQueryTerm';
import { QueryKeysGroupLecturer } from './useQueryGroupLecturer';
import { useMajor } from './useQueryMajor';
import { Lecturer } from '@/types/entities';
import { ResponseType } from '@/types/axios.type';

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
    const { majorStore } = useMajor()

    const handleManagerRenderActionLecturer = (limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email' | 'all',
        keywords: string | number) => {
        return useQuery([QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, majorStore.currentMajor.id, limit, page, renderUi, keywords], () => {
            if (searchField !== 'all' && keywords != '')
                return searchLecturerAdmin(termStore.currentTerm.id, majorStore.currentMajor.id, limit, page, searchField, keywords)
            else
                return getAllLecturer(termStore.currentTerm.id, majorStore.currentMajor.id, limit, page)
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
    // const handleGetAllLecturer = (termId: string | number, limit: number, page: number) => {
    //     return useQuery([QueryKeysLecturer.getAllLecturer, ENUM_RENDER_LECTURER.ALL, termId, limit, page], () => getAllLecturer(termId, limit, page), {

    //         onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
    //             dispatch(setParams(data.params))
    //             dispatch(setTypeRender(ENUM_RENDER_LECTURER.ALL))
    //         },
    //         staleTime: 10000,
    //     })
    // }
    // [SEARCH ROLE ADMIN]
    // const handleSearchLecturerAdmin = (termId: string | number, limit: number, page: number, searchField: 'full_name' | 'username' | 'phone' | 'email', keywords: string | number) => {
    //     return useQuery([QueryKeysLecturer.searchLecturerByField, termId, limit, page, searchField, keywords], () => searchLecturerAdmin(termId, limit, page, searchField, keywords), {
    //         onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
    //             console.log(data.params);
    //             dispatch(setParams(data.params))
    //             dispatch(setTypeRender(ENUM_RENDER_LECTURER.SEARCH_FULLNAME))
    //         },
    //         staleTime: 10000,
    //     })
    // }


    //[GET BY ID]
    const handleGetLecturerById = (id: string) => {
        return useQuery([QueryKeysLecturer.getLecturerById, id], () => getLecturerById(id), {
            enabled: !!id
        })
    }
    //[CREATE]
    const onCreateLecturer = () => {
        return useMutation((lecturer: Lecturer) => createLecturer(lecturer), {
            onSuccess() {
                enqueueSnackbar("Tạo giang vien thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    {
                        queryKey: [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page, renderUi, keywords ? keywords : '']
                    }
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
                    {
                        queryKey: [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page, renderUi, keywords ? keywords : '']
                    }
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
                    {
                        queryKey: [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page, renderUi, keywords ? keywords : '']
                    }
                );
            },
            onError() {
                enqueueSnackbar("Xóa giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[IMPORT]
    const onImportLecturerTerm = () => {

        return useMutation(() => importLecturerTerm(termStore.currentTerm.id, majorStore.currentMajor.id), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                if (data.success) {
                    enqueueSnackbar("Cập nhật danh sách giảng viên thành công", { variant: 'success' })
                    queryClient.invalidateQueries(
                        [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, majorStore.currentMajor.id, params.limit, params.page, renderUi, keywords ? keywords : '']
                    );
                };
            },
            onError() {
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
        handleGetLecturerById, handleManagerRenderActionLecturer
    }
}

