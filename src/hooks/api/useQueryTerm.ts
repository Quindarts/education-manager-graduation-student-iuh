import { getTermDetailWithType, getTermById, updateTermById, getAllTermByMajor, TypeTermStatus } from './../../services/apiTerm';
import { RootState } from '@/store';
import { createTerm, getAllTerm, getCurrentTerm, updateTermWithType } from "@/services/apiTerm"
import { useMutation, useQuery } from "react-query"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setAllTerm, setCurrentTerm } from '@/store/slice/term.slice';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { useMajor } from './useQueryMajor';
import { Term } from '@/types/entities/term';

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
            onSuccess: (data) => {
                dispatch(setAllTerm(data.terms));
            }
        });
    };

    //[GET ALL]
    const handleGetAllTermByMajor = (majorId?: string) => {
        const majorIdCallApi = majorId ? majorId : majorStore.currentMajor.id;

        return useQuery([TermQueryKey.allTermWithMajor, majorIdCallApi], () => getAllTermByMajor(majorIdCallApi), {
            onSuccess: (data) => {
                dispatch(setAllTerm([]));
                dispatch(setAllTerm(data.terms));
            },
        });
    };

    //[GET CURRENT]
    const handleGetCurrentTerm = (majorId: string) => {
        return useQuery([TermQueryKey.currentTerm, majorId], () => getCurrentTerm(majorId), {
            onSuccess: (data) => {
                dispatch(setCurrentTerm(data.term));
            },
            enabled: !!majorId
        });
    };

    //[GET BY ID]
    const handelGetTermById = (termId: string) => {
        return useQuery([TermQueryKey.getTermDetailById, termId], () => getTermById(termId), {
            enabled: !!termId
        });
    };

    //[GET DETAIL WITH TYPE]
    const handleGetTermDetailWithType = (termId: string, type: TypeTermStatus) => {
        // alert(type)
        return useQuery([TermQueryKey.getTermDetailById, type, termId], () => getTermDetailWithType(termId, type), {
            enabled: !!termId
        });
    };

    //[CREATE]
    const onCreateTerm = () => {
        return useMutation((data: Pick<Term, 'startDate' | 'endDate' | 'name' | 'majorId'>) => createTerm(data), {
            onSuccess() {
                enqueueSnackbar("Tạo học kì mới thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id] });
            }
        });
    };

    //[UPDATE WITH TYPE]
    const onUpdateTermWithType = (termId: string, type: TypeTermStatus) => {
        return useMutation((data: Pick<Term, 'startDate' | 'endDate'>) => updateTermWithType(termId, type, data), {
            onSuccess() {
                enqueueSnackbar("Cập nhật trạng thái học kì thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id] });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, type, termId] });

                if (termStore.currentTerm.id === termId) {
                    queryClient.invalidateQueries({ queryKey: [TermQueryKey.currentTerm] });
                }
            },
            onError() {
                enqueueSnackbar("Cập nhật trạng thái học kì thất bại", { variant: 'error' });
            }
        });
    };

    //[UPDATE WITH ID]
    const onUpdateTermWithTermId = (termId: string) => {
        return useMutation((data: Pick<Term, 'startDate' | 'endDate'>) => updateTermById(termId, data), {
            onSuccess() {
                enqueueSnackbar("Cập nhật trạng thái học kì thành công", { variant: 'success' });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.allTermWithMajor, majorStore.currentMajor.id] });
                queryClient.invalidateQueries({ queryKey: [TermQueryKey.getTermDetailById, termId] });
            },
            onError() {
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