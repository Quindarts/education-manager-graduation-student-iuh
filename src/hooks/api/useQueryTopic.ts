import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createTopicByToken, deleteTopicById, getTopicById, getTopicsByLecturerByTerm, getTopicsByTermByMajor, updateStatusTopicById, updateTopicById } from "@/services/apiTopic"
import { setParams, setTypeRender } from "@/store/slice/lecturer.slice"
import { ENUM_RENDER_TOPIC } from "@/store/slice/topic.slice"
import { MESSAGE_STORE_SUCCESS, TypeMess } from "@/utils/messages/SuccessMess"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useTerm } from "./useQueryTerm"
import { useAuth } from "./useAuth"
import { RoleCheck } from "@/types/enum"
import { useMajor } from "./useQueryMajor"

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
    const dispatch = useDispatch()

    const { termStore } = useTerm()
    const { majorStore } = useMajor()
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
    const handleTopicsByTermByMajor = (typeRender: ENUM_RENDER_TOPIC, limit: number, page: number) => {
        return useQuery([QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id, majorStore.currentMajor.id], () => getTopicsByTermByMajor(termStore.currentTerm.id, majorStore.currentMajor.id), {
            staleTime: Infinity,
        })
    }

    //[GET BY TERM, LECTURER]
    const handleTopicsByLecturerByTerm = () => {
        return useQuery([QueryTopic.getAllTopicByLecturerTerm, lecturerStore.me.user.id, termStore.currentTerm.id], () => getTopicsByLecturerByTerm(lecturerStore.me.user.id, termStore.currentTerm.id), {
            staleTime: Infinity, onSuccess(data) {
                dispatch(setParams(data.params))
                // dispatch(setTypeRender(typeRender))
            }
        })
    }

    //[CREATE]
    const onCreateTopicByToken = () => {
        return useMutation((newTopic: any) => createTopicByToken(newTopic), {
            onSuccess(data, variables) {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.create, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id, majorStore.currentMajor.id] })
            },
            onError(error) {
                enqueueSnackbar("Tạo đề tài thất bại", { variant: 'error' })
            }
        },
        );
    }

    //[UPDATE]
    const onUpdateTopicById = (topicId: string | number, majorId?: number, termId?: number) => {
        return useMutation((updateTopic: any) => updateTopicById(topicId, updateTopic), {
            onSuccess() {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id, majorStore.currentMajor.id] })
            },
            onError(error) {
                enqueueSnackbar("Cập nhật tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[UPDATE STATUS]
    const onUpdateStatusTopic = (topicId: string | number, majorId?: number, termId?: number) => {
        return useMutation((data: any) => updateStatusTopicById(topicId, data),
            {
                onSuccess() {
                    enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id, majorStore.currentMajor.id] })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getTopicById, topicId] });
                },
                onError(error) {
                    enqueueSnackbar("Cập nhật đề tài thất bại vui lòng thử lại sau", { variant: 'error' })
                }
            }
        )
    }

    //[DELETE]
    const onDeleteTopicById = () => {
        return useMutation((topicId: number | string) => deleteTopicById(topicId), {
            onSuccess(data, variables, context) {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.delete, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termStore.currentTerm.id, majorStore.currentMajor.id] })
            },
            onError(error) {
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
        onUpdateStatusTopic
    }
}