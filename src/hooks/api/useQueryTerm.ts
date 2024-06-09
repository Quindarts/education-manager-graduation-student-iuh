import { TypeTermStatus, getTermDetailWithType, getTermById } from './../../services/apiTerm';
import { RootState } from '@/store';
import { TermDataRequest, createTerm, getAllTerm, getCurrentTerm, updateTermWithType } from "@/services/apiTerm"
import { InfiniteQueryObserver, useMutation, useQuery } from "react-query"
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
export const useTerm = () => {
    const termStore = useSelector((state: RootState) => state.termSlice);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar()

    const handleGetAllTerm = () => {
        return useQuery([TermQueryKey.allTerm], () => getAllTerm())
    }
    const handleGetCurrentTerm = () => {
        return useQuery([TermQueryKey.currentTerm], () => getCurrentTerm(), {
            onSuccess: (data: any) => {
                dispatch(setCurrentTerm(data.term))
            }
        })
    }
    const onCreateTerm = () => {
        return useMutation((data: TermDataRequest) => createTerm(data), {
            onSuccess() {
                enqueueSnackbar("Tạo học kì mới thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTerm] });

            }
        })
    }
    const onUpdateTermWithType = (termId: number, type: TypeTermStatus) => {
        return useMutation((data) => updateTermWithType(termId, type, data), {
            onSuccess(data) {
                enqueueSnackbar("Cập nhật trạng thái học kì thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTerm] });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, termId] });

            },
            onError(error) {
                enqueueSnackbar("Cập nhật trạng thái học kì thất bại", { variant: 'error' })

            }
        })
    }

    const handelGetTermById = (termId: string | number) => {
        return useQuery([TermQueryKey.getTermDetailById, termId], () => getTermById(termId), {
            enabled: !!termId
        })
    }
    const handleGetTermDetailWithType = (termId: string | number, type: TypeTermStatus) => {
        return useQuery([TermQueryKey.getTermDetailById, termId], () => getTermDetailWithType(termId, type), {
            enabled: !!termId
        })
    }
    return {
        handelGetTermById,
        handleGetAllTerm,
        handleGetCurrentTerm,
        handleGetTermDetailWithType,
        termStore,
        onCreateTerm, onUpdateTermWithType

    }
}