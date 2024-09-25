import { queryClient } from "@/providers/ReactQueryClientProvider"
import { MESSAGE_STORE_SUCCESS, TypeMess } from "@/utils/messages/SuccessMess"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useTerm } from "./useQueryTerm"
import { useAuth } from "./useAuth"
import { RoleCheck } from "@/types/enum"
import { Topic, TopicBodyRequestType } from "@/types/entities/topic"
import useParams from "../ui/useParams"
import { setParamTotalPage } from "@/store/slice/topic.slice"
import { useDispatch } from "react-redux"
import { getGroupByTopic } from "@/services/apiGroupStudent"
import * as TopicServices from "@/services/apiTopic"

export enum QueryTopic {

    //HEAD LECTURER
    getAllTopicByTermMajor = 'getAllTopicByTermMajor',
    getAllTopic = 'getAllTopic',
    getSearchTopic = "getSearchTopic",
    getTopicById = 'getTopicById',
    getGroupByTopic = "getGroupByTopic",
    getCountOfTopic = "getCountOfTopic",
    getTopicToExport = "getTopicToExport",
    getTopicLecturerToExport = "getTopicLecturerToExport",
    getTopicsByLecturerTermId = "getTopicsByLecturerTermId",
    //LECTURER
    getTopicsByMe = 'getTopicsByMe',
    getTopicsByGroupLecturerAssigned = "getTopicsByGroupLecturerAssigned"
}
export const useTopic = () => {

    //[REDUX]
    const { termStore } = useTerm()
    const { lecturerStore } = useAuth()
    const topicStore = useSelector((state: any) => state.topicSlice)
    const { paramTotalPage } = topicStore
    const termId = termStore.currentTerm.id

    const dispatch = useDispatch()

    //[PARAMS URL] 
    const { getQueryField, setTotalPage, setLimit, setPage } = useParams()

    //[OTHER]
    const { enqueueSnackbar } = useSnackbar()

    const handleGetCountOfTopic = () => {
        return useQuery([QueryTopic.getCountOfTopic], () => TopicServices.getCountOfTopic(termId))
    }

    const handleUiRender = (): string[] => {
        const currentRole = lecturerStore.currentRoleRender;
        var permissions: string[] = []
        if (currentRole === RoleCheck.HEAD_LECTURER || currentRole === RoleCheck.HEAD_COURSE) {
            permissions.push('all')
            permissions.push('crud')
        }
        else (currentRole === RoleCheck.LECTURER)
        permissions.push('crud')
        return permissions
    }

    //[GET BY ID]
    const handleTopicById = (topicId: string) => {
        return useQuery([QueryTopic.getTopicById, topicId], () => TopicServices.getTopicById(topicId))
    }
    const hanldeGetGroupsByTopic = (topicId: string) => {
        return useQuery([QueryTopic.getGroupByTopic, termStore.currentTerm.id, topicId], () => getGroupByTopic(termStore.currentTerm.id, topicId), {
            enabled: !!topicId
        })

    }
    const handleSearchTopic = () => {
        getQueryField('limit') ? getQueryField('limit') : setLimit(10)
        getQueryField('page') ? getQueryField('page') : setPage(1)
        return useQuery([
            QueryTopic.getSearchTopic,
            termStore.currentTerm.id,
            getQueryField('limit'),
            getQueryField('page'),
            getQueryField('searchField'),
            getQueryField('sort'),
            getQueryField('keywords')],
            () => TopicServices.searchTopics
                (
                    termStore.currentTerm.id,
                    getQueryField('searchField'),
                    getQueryField("keywords"),
                    getQueryField("sort"),
                    getQueryField('limit'),
                    getQueryField('page')), {
            onSuccess(data) {
                const total = data.params ? data.params.totalPage : 0
                dispatch(setParamTotalPage(total))
                setTotalPage(total)
            },
            staleTime: 1000 * (60 * 3), // 10 min,
            refetchOnMount: true,
            refetchInterval: 1000 * (60 * 20),
            keepPreviousData: true,
        })
    }
    //[GET TO EXPORT]
    const handleGetTopicToExport = () => {
        return useQuery([QueryTopic.getTopicToExport, termId], () => TopicServices.getTopicsExport(termId), {
            enabled: !!termId
        })
    }
    const handleGetTopicLecturerToExport = () => {
        return useQuery([QueryTopic.getTopicLecturerToExport, termId], () => TopicServices.getTopicsExportByLecturer(termId), {
            enabled: !!termId
        })
    }
    //[GET BY TERM, MAJOR]  
    const handleTopicsByTermByMajor = () => {
        return useQuery([QueryTopic.getSearchTopic, termStore.currentTerm.id, ''], () => TopicServices.getTopicsByTermByMajor(termStore.currentTerm.id), {
            staleTime: 1000 * (60 * 3), // 10 min,
        })
    }

    //[GET BY TERM, LECTURER]
    const handleTopicsByMe = () => {
        return useQuery([QueryTopic.getTopicsByMe, termStore.currentTerm.id, lecturerStore.me.user.id], () => TopicServices.getTopicsByLecturerByTerm(lecturerStore.me.user.id, termStore.currentTerm.id), {
            staleTime: Infinity, onSuccess(data) {
            }
        })
    }
    //[GET TOPIC BY LECTURER ID]
    const handleGetTopicsByGroupLecturerAssigned = (groupId: string) => {
        return useQuery([QueryTopic.getTopicsByGroupLecturerAssigned, groupId], () => TopicServices.getTopicsByGroupLecturerAssigned(groupId), {
            enabled: !!groupId
        })
    }
    //[GET BY TERM, LECTURER]
    const handleTopicsByLecturerByTerm = (lecturerId: string) => {
        return useQuery([QueryTopic.getTopicsByLecturerTermId, termStore.currentTerm.id, lecturerId], () => TopicServices.getTopicsByLecturerByTerm(lecturerId, termStore.currentTerm.id), {
            staleTime: Infinity, onSuccess(data) {
            }
        })
    }

    //[CREATE]
    const onCreateTopicByToken = () => {
        return useMutation((newTopic: TopicBodyRequestType) => TopicServices.createTopicByToken(newTopic, termStore.currentTerm.id), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.create, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getSearchTopic, termStore.currentTerm.id, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicsByMe, lecturerStore.me.user.id, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getCountOfTopic] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicToExport, termId] })

            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        },
        );
    }

    //[UPDATE]
    const onUpdateTopicById = (topicId: string) => {
        return useMutation((updateTopic: any) => TopicServices.updateTopicById(topicId, updateTopic), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getSearchTopic, termStore.currentTerm.id, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicsByMe, lecturerStore.me.user.id, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicById, topicId] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicsByMe, lecturerStore.me.user.id, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicToExport, termId] })

            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }

    //[UPDATE STATUS]
    const onUpdateStatusTopic = (topicId: string) => {
        return useMutation((data: Pick<Topic, 'status' | 'note'>) => TopicServices.updateStatusTopicById(topicId, data),
            {
                onSuccess() {
                    enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getSearchTopic, termStore.currentTerm.id, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')] })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicById, topicId] });
                },
                onError(err: any) {
                    if (err.status < 500)
                        enqueueSnackbar(err.message, { variant: 'error' })
                    else
                        enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
                }
            }
        )
    }
    const onUpdateAllQuantityGroupMax = () => {
        return useMutation((quantity: number) => TopicServices.updateAllQuantityGroupMax(termStore.currentTerm.id, quantity), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getSearchTopic, termStore.currentTerm.id, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicToExport, termId] })

            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }

    //[DELETE]
    const onDeleteTopicById = () => {
        return useMutation((topicId: string) => TopicServices.deleteTopicById(topicId), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.delete, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getSearchTopic, termStore.currentTerm.id, getQueryField('limit'), getQueryField('page'), getQueryField('searchField'), getQueryField('sort'), getQueryField('keywords')] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicsByMe, lecturerStore.me.user.id, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getCountOfTopic] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicToExport, termId] })

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
        paramTotalPage,
        topicStore,
        handleTopicsByTermByMajor,
        handleGetTopicToExport,
        handleTopicsByLecturerByTerm,
        handleGetTopicsByGroupLecturerAssigned,
        handleGetTopicLecturerToExport,
        handleTopicsByMe,
        handleUiRender,
        handleTopicById,
        handleGetCountOfTopic,
        onCreateTopicByToken,
        onUpdateTopicById,
        onDeleteTopicById,
        onUpdateAllQuantityGroupMax,
        onUpdateStatusTopic, handleSearchTopic, hanldeGetGroupsByTopic
    }
}