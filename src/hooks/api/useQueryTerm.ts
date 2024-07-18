import { TypeTermStatus, getTermDetailWithType, getTermById, updateTermById, getAllTermByMajor } from './../../services/apiTerm';
import { RootState } from '@/store';
import { TermDataRequest, createTerm, getAllTerm, getCurrentTerm, updateTermWithType } from "@/services/apiTerm"
import { useMutation, useQuery } from "react-query"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllTerm, setCurrentTerm } from '@/store/slice/term.slice';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { useMajor } from './useQueryMajor';

export enum TermQueryKey {
    allTerm = 'allTerm',
    allTermWithMajor = "allTermWithMajor",
    currentTerm = "currentTerm",
    getTermDetailWithType = "getTermDetailWithType",
    getTermDetailById = 'getTermDetailById'
}
export function useTerm() {

    const termStore = useSelector((state: RootState) => state.termSlice);
    const { majorStore } = useMajor()
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();


    //[GET ALL]
    const handleGetAllTerm = () => {
        return useQuery([TermQueryKey.allTerm], () => getAllTerm(), {
            onSuccess: (data: any) => {
                dispatch(setAllTerm(data.terms));
            }
        });
    };

    //[GET ALL]
    const handleGetAllTermByMajor = (majorId?: string) => {
        const majorIdCallApi = majorId ? majorId : majorStore.currentMajor.id;

        return useQuery([TermQueryKey.allTermWithMajor, majorIdCallApi], () => getAllTermByMajor(majorIdCallApi), {
            onSuccess: (data: any) => {
                dispatch(setAllTerm([]));
                dispatch(setAllTerm(data.terms));
            },
        });
    };

    //[GET CURRENT]
    const handleGetCurrentTerm = (majorId: string) => {
        return useQuery([TermQueryKey.currentTerm, majorId], () => getCurrentTerm(majorId), {
            onSuccess: (data: any) => {
                dispatch(setCurrentTerm(data.term));
            },
            enabled: !!majorId
        });
    };

    //[GET BY ID]
    const handelGetTermById = (termId: string | number) => {
        return useQuery([TermQueryKey.getTermDetailById, termId], () => getTermById(termId), {
            enabled: !!termId
        });
    };

    //[GET DETAIL WITH TYPE]
    const handleGetTermDetailWithType = (termId: string | number, type: string) => {
        // alert(type)
        return useQuery([TermQueryKey.getTermDetailById, type, termId], () => getTermDetailWithType(termId, type), {
            enabled: !!termId
        });
    };

    //[CREATE]
    const onCreateTerm = () => {
        return useMutation((data: TermDataRequest) => createTerm(data), {
            onSuccess() {
                enqueueSnackbar("Tạo học kì mới thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id] });
            }
        });
    };

    //[UPDATE WITH TYPE]
    const onUpdateTermWithType = (termId: string, type: TypeTermStatus) => {
        return useMutation((data) => updateTermWithType(termId, type, data), {
            onSuccess(data) {
                enqueueSnackbar("Cập nhật trạng thái học kì thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id] });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, type, termId] });

                if (termStore.currentTerm.id === termId) {
                    queryClient.invalidateQueries({ queryKey: [TermQueryKey.currentTerm] });
                }
            },
            onError(error) {
                enqueueSnackbar("Cập nhật trạng thái học kì thất bại", { variant: 'error' });
            }
        });
    };

    //[UPDATE WITH ID]
    const onUpdateTermWithTermId = (termId: number) => {
        return useMutation((data) => updateTermById(termId, data), {
            onSuccess(data) {
                enqueueSnackbar("Cập nhật trạng thái học kì thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id] });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, termId] });
            },
            onError(error) {
                enqueueSnackbar("Cập nhật trạng thái học kì thất bại", { variant: 'error' });

            }
        });
    };

    return {
        termStore,
        handelGetTermById,
        handleGetAllTerm,
        handleGetCurrentTerm,
        handleGetTermDetailWithType,
        onUpdateTermWithTermId,
        onCreateTerm,
        onUpdateTermWithType,
        handleGetAllTermByMajor
    };
}