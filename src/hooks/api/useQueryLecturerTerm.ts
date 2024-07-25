import { createLecturerTerm, deleteLecturerTermById, getAllLecturerTermByParams, getListLecturerTermByMajor, getListLecturerTermToAdding, importLecturerTerm } from "@/services/apiLecturerTerm"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm";
import { useSnackbar } from "notistack";
import { queryClient } from "@/providers/ReactQueryClientProvider";
import { useMajor } from "./useQueryMajor";
import { ResponseType } from "@/types/axios.type";
import useParams from "../ui/useParams";

export enum QueryKeysLecturerTerm {
    listLecturerTerms = 'listLecturerTerms',
    lecturerTermsToAdd = 'lecturerTermsToAdd',
    getAllLectuerTermByParams = 'getAllLectuerTermByParams'
}
export const useLecturerTerm = () => {

    const { termStore } = useTerm();
    const { majorStore } = useMajor()
    const majorId = majorStore.currentMajor.id
    const termId = termStore.currentTerm.id

    const { enqueueSnackbar } = useSnackbar();
    const { getQueryField, setTotalPage } = useParams()


    // [GET ALL]
    const handleGetAllLecturerTermByParam = () => {
        return useQuery(
            [QueryKeysLecturerTerm.getAllLectuerTermByParams, majorId, termId,
            getQueryField('limit'), getQueryField('page'), getQueryField('totalPage'), getQueryField('searchField'), getQueryField('keywords')],
            () => getAllLecturerTermByParams(majorId, termId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')),
            {
                onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                    setTotalPage(data.params ? data.params.totalPage : 0)
                },
                staleTime: 20000,
            })
    }

    //[GET LIST LECTURER]
    const handleGetListLecturerTerms = (majorId?: string) => {
        const currentMajor = majorId ? majorId : majorStore.currentMajor.id;
        return useQuery([QueryKeysLecturerTerm.listLecturerTerms, termStore.currentTerm.id, currentMajor], () => getListLecturerTermByMajor(termStore.currentTerm.id, currentMajor))
    }

    const onDeleteLecturerTerm = () => {
        return useMutation((lecturerId: string) => deleteLecturerTermById(lecturerId, termStore.currentTerm.id), {
            onSuccess: (data: Pick<ResponseType, 'success' | 'message'>) => {
                if (data.success === true) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturerTerm.getAllLectuerTermByParams, termStore.currentTerm.id, params.limit, params.page, 'all', ''] });
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termStore.currentTerm.id, majorStore.currentMajor.id])

                }
            }
        })
    }
    const handleLecturerTermsToAdd = () => {
        return useQuery([QueryKeysLecturerTerm.lecturerTermsToAdd, termStore.currentTerm.id, majorStore.currentMajor.id], () => getListLecturerTermToAdding(termStore.currentTerm.id, majorStore.currentMajor.id))
    }

    const onCreateLecturerTerm = () => {
        return useMutation((data: { lecturerId: string, termId: string }) => createLecturerTerm(data), {
            onSuccess(data: any) {
                if (data.success === true) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturerTerm.getAllLectuerTermByParams, termStore.currentTerm.id, params.limit, params.page, 'all', ''] });
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termStore.currentTerm.id, majorStore.currentMajor.id])
                }
            },
            onError(error: any) {
                enqueueSnackbar(error.message, { variant: "error" });
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
                        [QueryKeysLecturerTerm.getAllLectuerTermByParams, termStore.currentTerm.id, majorStore.currentMajor.id,
                        data.params?.limit, data.params?.page, 1, data.params?.totalPage, 'username', '']
                    );
                };
            },
            onError() {
                enqueueSnackbar("Cập nhật danh sách giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    return {
        handleGetAllLecturerTermByParam,
        handleGetListLecturerTerms,
        handleLecturerTermsToAdd,
        onImportLecturerTerm,
        onDeleteLecturerTerm,
        onCreateLecturerTerm
    }
}
