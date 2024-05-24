import { RootState } from '@/store';
import { getAllTerm, getCurrentTerm } from "@/services/apiTerm"
import { useQuery } from "react-query"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setCurrentTerm } from '@/store/slice/term.slice';

export enum TermQueryKey {
    allTerm = 'allTerm',
    currentTerm = "currentTerm"
}
export const useTerm = () => {
    const termStore = useSelector((state: RootState) => state.termSlice);
    const dispatch = useDispatch();

    const handleGetAllTerm = () => {
        return useQuery([TermQueryKey.allTerm], () => getAllTerm()
            , {
                onSuccess: (data) => {
                    console.log("🚀 ~ handleGetAllTerm ~ data:", data)
                }
            }
        )
    }
    const handleGetCurrentTerm = () => {
        return useQuery([TermQueryKey.currentTerm], () => getCurrentTerm(), {
            onSuccess: (data: any) => {
                console.log("🚀 ~ returnuseQuery ~ data:", data.term)
                dispatch(setCurrentTerm(data.term))
            }
        })
    }
    return {
        handleGetAllTerm,
        handleGetCurrentTerm,
        termStore,
    }
}