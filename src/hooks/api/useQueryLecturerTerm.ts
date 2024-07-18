import { deleteLecturerTermById, getListLecturerTerm, getListLecturerTermByMajor } from "@/services/apiLecturerTerm"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm";
import ResponseType from "@/types/axios.type";
import { useSnackbar } from "notistack";
import { QueryKeysLecturer, useLecturer } from "./useQueryLecturer";
import { queryClient } from "@/providers/ReactQueryClientProvider";
import { useMajor } from "./useQueryMajor";

export enum QueryKeysLecturerTerm {
    listLecturerTerms = 'listLecturerTerms'
}
export const useLecturerTerm = () => {

    const { termStore } = useTerm();
    const { majorStore } = useMajor()
    const { params } = useLecturer()
    const { enqueueSnackbar } = useSnackbar();

    //[GET LIST LECTURER]
    const handleGetListLecturerTerms = (termId: string, majorId?: string) => {
        const currentMajor = majorId ? majorId : majorStore.currentMajor.id;
        return useQuery([QueryKeysLecturerTerm.listLecturerTerms, termId, currentMajor], () => getListLecturerTermByMajor(termId, currentMajor))
    }

    
    const onDeleteLecturerTerm = (termId?: string) => {
        return useMutation((lecturerId) => deleteLecturerTermById(lecturerId, termStore.currentTerm.id), {
            onSuccess: (data: Pick<ResponseType, 'success' | 'message'>) => {
                if (data.success === true) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturer.managerActionLecturer, termStore.currentTerm.id, params.limit, params.page, 'all', ''] });
                }
            }
        })
    }

    return {
        handleGetListLecturerTerms,
        onDeleteLecturerTerm
    }
}
