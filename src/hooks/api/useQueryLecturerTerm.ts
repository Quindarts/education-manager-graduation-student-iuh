import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm";
import { useSnackbar } from "notistack";
import { queryClient } from "@/providers/ReactQueryClientProvider";
import { useMajor } from "./useQueryMajor";
import { ResponseType } from "@/types/axios.type";
import useParams from "../ui/useParams";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useDispatch } from "react-redux";
import { setParamTotalPageLectuerTerm } from "@/store/slice/lecturer.slice";
import * as LecturerTermServices from "@/services/apiLecturerTerm"

export enum QueryKeysLecturerTerm {
    listLecturerTerms = 'listLecturerTerms',
    lecturerTermsToAdd = 'lecturerTermsToAdd',
    getAllLectuerTermByParams = 'getAllLectuerTermByParams',
    getCountOfLecturerTerm = "getCountOfLecturerTerm"
}

export const useLecturerTerm = () => {
    //[REDUX]
    const lecturerStore = useSelector((state: RootState) => state.lecturerSlice);
    const { termStore } = useTerm();
    const { majorStore } = useMajor()
    const termId = termStore.currentTerm.id
    const majorId = majorStore.currentMajor.id
    const dispatch = useDispatch()

    //[PARAMS URL] 
    const { paramTotalPage } = lecturerStore
    const { getQueryField, setTotalPage, setLimit, setPage } = useParams()

    //[OTHER]
    const { enqueueSnackbar } = useSnackbar();

    const handleGetCountOfLecturerTerm = () => {
        return useQuery(
            [QueryKeysLecturerTerm.getCountOfLecturerTerm, termId],
            () => LecturerTermServices.getCountOfLecturerTerm(termId), {
            staleTime: 1000 * 60 * 20,
            enabled: !!termId
        }
        )
    }

    // [GET ALL]
    const handleGetAllLecturerTermByParam = () => {
        getQueryField('limit') ? getQueryField('limit') : setLimit(10)
        getQueryField('page') ? getQueryField('page') : setPage(1)
        return useQuery(
            [
                QueryKeysLecturerTerm.getAllLectuerTermByParams,
                termId,
                getQueryField('limit'),
                getQueryField('page'),
                getQueryField('searchField'),
                getQueryField('keywords')
            ],
            () => LecturerTermServices.getAllLecturerTermByParams(termId, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('keywords')),
            {
                onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params' | 'lecturerTerms'>) {
                    const total = data.params ? data.params.totalPage : 0
                    setTotalPage(total)
                    dispatch(setParamTotalPageLectuerTerm(total))
                },
                staleTime: 1000 * (60 * 15),
                keepPreviousData: true,
                refetchInterval: 1000 * (60 * 20),
            })
    }

    //[GET LIST LECTURER]
    const handleGetListLecturerTerms = () => {
        return useQuery([QueryKeysLecturerTerm.listLecturerTerms, termId], () => LecturerTermServices.getListLecturerTerm(termId), {

        })
    }

    const onDeleteLecturerTerm = () => {
        return useMutation((lecturerId: string) => LecturerTermServices.deleteLecturerTermById(lecturerId, termStore.currentTerm.id), {
            onSuccess: (data: Pick<ResponseType, 'success' | 'message'>) => {
                if (data.success === true) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    queryClient.invalidateQueries(
                        [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        getQueryField('limit'), getQueryField('page'), getQueryField("searchField"), getQueryField('keywords')]
                    );
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termStore.currentTerm.id, majorStore.currentMajor.id])

                }
            }
        })
    }
    const handleLecturerTermsToAdd = () => {
        return useQuery([QueryKeysLecturerTerm.lecturerTermsToAdd, termId, majorId], () => LecturerTermServices.getListLecturerTermToAdding(termId, majorId), {
            enabled: !!termId && !!majorId,
            cacheTime: 1000 * (60 * 1)
        })
    }

    const onCreateLecturerTerm = () => {
        return useMutation((data: { lecturerId: string, termId: string }) => LecturerTermServices.createLecturerTerm(data), {
            onSuccess(data: any) {
                if (data.success === true) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    queryClient.invalidateQueries(
                        [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        getQueryField('limit'), getQueryField('page'), getQueryField("searchField"), getQueryField('keywords')]
                    );
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
        return useMutation(() => LecturerTermServices.importLecturerTerm(termStore.currentTerm.id, majorStore.currentMajor.id), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                if (data.success) {
                    enqueueSnackbar("Cập nhật danh sách giảng viên thành công", { variant: 'success' })
                    queryClient.invalidateQueries(
                        [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        getQueryField('limit'), getQueryField('page'), getQueryField("searchField"), getQueryField('keywords')]
                    );
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termStore.currentTerm.id, majorStore.currentMajor.id])

                };
            },
            onError() {
                enqueueSnackbar("Cập nhật danh sách giảng viên thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    return {
        paramTotalPage: paramTotalPage.lecturerTerm,
        handleGetAllLecturerTermByParam,
        handleGetCountOfLecturerTerm,
        handleGetListLecturerTerms,
        handleLecturerTermsToAdd,
        onImportLecturerTerm,
        onDeleteLecturerTerm,
        onCreateLecturerTerm
    }
}
