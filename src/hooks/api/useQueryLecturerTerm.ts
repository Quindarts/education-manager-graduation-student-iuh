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
    getCountOfLecturerTerm = "getCountOfLecturerTerm",
    getLecturerTermById = "getLecturerTermById",
    getLecturerTermToExport = "getLecturerTermToExport",
    getExportAssignLecturerTerm = "getExportAssignLecturerTerm"
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
    const handleGetExportLecturerTermAssign = () => {
        return useQuery([QueryKeysLecturerTerm.getExportAssignLecturerTerm, termId], () => LecturerTermServices.getExportAssignLecturerTerm(termId))
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
                getQueryField('sort'),
                getQueryField('keywords')
            ],
            () => LecturerTermServices.getAllLecturerTermByParams(
                termId,
                getQueryField('limit'),
                getQueryField('page'),
                getQueryField('searchField'),
                getQueryField('sort'),
                getQueryField('keywords')),
            {
                onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params' | 'lecturerTerms'>) {
                    const total = data.params ? data.params.totalPage : 0
                    setTotalPage(total)
                    dispatch(setParamTotalPageLectuerTerm(total))
                },
                staleTime: 1000 * (60 * 3), // 10 min,
                refetchOnMount: true,
                refetchInterval: 1000 * (60 * 20),
                keepPreviousData: true,
            })
    }
    const handleGetLecturerTermById = (id: string) => {
        return useQuery([QueryKeysLecturerTerm.getLecturerTermById, id], () => LecturerTermServices.getLecturerTermById(id), {
            enabled: !!id
        })
    }
    //[GET LIST LECTURER]
    const handleGetListLecturerTerms = (keyword: string) => {
        return useQuery([QueryKeysLecturerTerm.listLecturerTerms, termId, keyword], () => LecturerTermServices.getListLecturerTerm(termId, keyword), {

        })
    }
    const handleGetLecturerTermToExport = () => {
        return useQuery([QueryKeysLecturerTerm.getLecturerTermToExport, termId], () => LecturerTermServices.getLecturerTermToExport(termId))
    }

    const onDeleteLecturerTerm = () => {
        return useMutation((id: string) => LecturerTermServices.deleteLecturerTermById(id), {
            onSuccess: (data: Pick<ResponseType, 'success' | 'message'>) => {
                if (data.success === true) {
                    enqueueSnackbar(data.message, { variant: "success" });
                    queryClient.invalidateQueries(
                        [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        getQueryField('limit'), getQueryField('page'), getQueryField("searchField"), getQueryField('keywords')]
                    );
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termId, majorId])
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.getCountOfLecturerTerm, termId])
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturerTerm.listLecturerTerms, termId] })


                }
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //[GET]
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
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termId, majorId])
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.getCountOfLecturerTerm, termId])
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturerTerm.listLecturerTerms, termId] })


                }
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //[IMPORT]
    const onImportLecturerTerm = () => {
        return useMutation(() => LecturerTermServices.importLecturerTerm(termId, majorStore.currentMajor.id), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'params'>) {
                if (data.success) {
                    enqueueSnackbar("Cập nhật danh sách giảng viên thành công", { variant: 'success' })
                    queryClient.invalidateQueries(
                        [QueryKeysLecturerTerm.getAllLectuerTermByParams, termId,
                        getQueryField('limit'), getQueryField('page'), getQueryField("searchField"), getQueryField('keywords')]
                    );
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.lecturerTermsToAdd, termId, majorStore.currentMajor.id])
                    queryClient.invalidateQueries([QueryKeysLecturerTerm.getCountOfLecturerTerm, termId])
                    queryClient.invalidateQueries({ queryKey: [QueryKeysLecturerTerm.listLecturerTerms, termId] })

                };
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }

    return {
        paramTotalPage: paramTotalPage.lecturerTerm,
        handleGetAllLecturerTermByParam,
        handleGetLecturerTermById,
        handleGetCountOfLecturerTerm,
        handleGetListLecturerTerms,
        handleLecturerTermsToAdd,
        handleGetExportLecturerTermAssign,
        onImportLecturerTerm,
        onDeleteLecturerTerm,
        onCreateLecturerTerm,
        handleGetLecturerTermToExport
    }
}
