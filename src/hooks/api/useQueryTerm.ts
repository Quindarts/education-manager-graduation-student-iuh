import { TypeTermStatus, getTermDetailWithType, getTermById, updateTermById } from './../../services/apiTerm';
import { RootState } from '@/store';
import { TermDataRequest, createTerm, getAllTerm, getCurrentTerm, updateTermWithType } from "@/services/apiTerm"
import { useMutation, useQuery } from "react-query"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentTerm } from '@/store/slice/term.slice';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/providers/ReactQueryClientProvider';

export enum TermQueryKey {
    allTerm = 'allTerm',
    currentTerm = "currentTerm",
    getTermDetailWithType = "getTermDetailWithType",
    getTermDetailById = 'getTermDetailById'
}
export function useTerm() {

    const termStore = useSelector((state: RootState) => state.termSlice);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();


    //[GET ALL]
    const handleGetAllTerm = () => {
        return useQuery([TermQueryKey.allTerm], () => getAllTerm());
    };

    //[GET CURRENT]
    const handleGetCurrentTerm = () => {
        return useQuery([TermQueryKey.currentTerm], () => getCurrentTerm(), {
            onSuccess: (data: any) => {
                dispatch(setCurrentTerm(data.term));
            }
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
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTerm] });

            }
        });
    };

    //[UPDATE WITH TYPE]
    const onUpdateTermWithType = (termId: string, type: TypeTermStatus) => {
        return useMutation((data) => updateTermWithType(termId, type, data), {
            onSuccess(data) {
                enqueueSnackbar("Cập nhật trạng thái học kì thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTerm] });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, termId] });
                
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
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTerm] });
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
        onUpdateTermWithType
    };
}