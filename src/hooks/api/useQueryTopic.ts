import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createTopicByToken, deleteTopicById, getTopicById, getTopicsByLecturerByTerm, getTopicsByTermByMajor, updateAllQuantityGroupMax, updateStatusTopicById, updateTopicById } from "@/services/apiTopic"
import { MESSAGE_STORE_SUCCESS, TypeMess } from "@/utils/messages/SuccessMess"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useTerm } from "./useQueryTerm"
import { useAuth } from "./useAuth"
import { RoleCheck } from "@/types/enum"
import { useMajor } from "./useQueryMajor"
import { Topic, TopicBodyRequestType } from "@/types/entities/topic"

export enum QueryTopic {
    //HEAD LECTURER
    getAllTopicByTermMajor = 'getAllTopicByTermMajor',
    getAllTopic = 'getAllTopic',
    getTopicById = 'getTopicById',
    //LECTURER
    getAllTopicByLecturerTerm = 'getAllTopicByLecturerTerm'
}
//crud, all, readOnly

export const useTopic = () => {
    const { enqueueSnackbar } = useSnackbar()
    const topicStore = useSelector((state: any) => state.topicSlice)
    const { termStore } = useTerm()
    const { lecturerStore } = useAuth()

    const handleUiRender = (): string[] => {
        const currentRole = lecturerStore.currentRoleRender;
        var permissions: string[] = []
        if (currentRole === RoleCheck.HEAD_LECTURER) {
            permissions.push('all')
            permissions.push('crud')
        }
        else if (currentRole === RoleCheck.LECTURER) {
            permissions.push('crud')
        }
        else {
            permissions.push('readOnly')
        }
        return permissions
    }

    //[GET BY ID]
    const handleTopicById = (topicId: string) => {
        return useQuery([QueryTopic.getTopicById, topicId], () => getTopicById(topicId))
    }

    //[GET BY TERM, MAJOR]
    const handleTopicsByTermByMajor = () => {
        return useQuery([QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id], () => getTopicsByTermByMajor(termStore.currentTerm.id), {
            staleTime: Infinity,
        })
    }

    //[GET BY TERM, LECTURER]
    const handleTopicsByLecturerByTerm = () => {
        return useQuery([QueryTopic.getAllTopicByLecturerTerm, lecturerStore.me.user.id, termStore.currentTerm.id], () => getTopicsByLecturerByTerm(lecturerStore.me.user.id, termStore.currentTerm.id), {
            staleTime: Infinity, onSuccess(data) {
            }
        })
    }

    //[CREATE]
    const onCreateTopicByToken = () => {
        return useMutation((newTopic: TopicBodyRequestType) => createTopicByToken(newTopic, termStore.currentTerm.id), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.create, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByLecturerTerm, lecturerStore.me.user.id, termStore.currentTerm.id] })

            },
            onError() {
                enqueueSnackbar("Tạo đề tài thất bại", { variant: 'error' })
            }
        },
        );
    }

    //[UPDATE]
    const onUpdateTopicById = (topicId: string) => {
        return useMutation((updateTopic: any) => updateTopicById(topicId, updateTopic), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByLecturerTerm, lecturerStore.me.user.id, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicById, topicId] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByLecturerTerm, lecturerStore.me.user.id, termStore.currentTerm.id] })

            },
            onError() {
                enqueueSnackbar("Cập nhật tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[UPDATE STATUS]
    const onUpdateStatusTopic = (topicId: string) => {
        return useMutation((data: Pick<Topic, 'status' | 'note'>) => updateStatusTopicById(topicId, data),
            {
                onSuccess() {
                    enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id] })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicById, topicId] });
                },
                onError() {
                    enqueueSnackbar("Cập nhật đề tài thất bại vui lòng thử lại sau", { variant: 'error' })
                }
            }
        )
    }
    const onUpdateAllQuantityGroupMax = () => {
        return useMutation((quantity: number) => updateAllQuantityGroupMax(termStore.currentTerm.id, quantity), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id] })
            },
            onError() {
                enqueueSnackbar("Cập nhật đề tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[DELETE]
    const onDeleteTopicById = () => {
        return useMutation((topicId: string) => deleteTopicById(topicId), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.delete, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByLecturerTerm, lecturerStore.me.user.id, termStore.currentTerm.id] })

            },
            onError() {
                enqueueSnackbar("Xóa đề tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    return {
        topicStore,
        handleTopicsByTermByMajor,
        handleTopicsByLecturerByTerm,
        handleUiRender,
        handleTopicById,
        onCreateTopicByToken,
        onUpdateTopicById,
        onDeleteTopicById,
        onUpdateAllQuantityGroupMax,
        onUpdateStatusTopic
    }
}