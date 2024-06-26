import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createTopicByToken, deleteTopicById, getTopicById, getTopicsByLecturerByTerm, getTopicsByTermByMajor, updateStatusTopicById, updateTopicById } from "@/services/apiTopic"
import { setParams, setTypeRender } from "@/store/slice/lecturer.slice"
import { ENUM_RENDER_TOPIC } from "@/store/slice/topic.slice"
import { MESSAGE_STORE_SUCCESS, TypeMess } from "@/utils/messages/SuccessMess"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

export enum QueryTopic {
    getAllTopic = 'getAllTopic',
    getTopicById = 'getTopicById',
    getAllTopicByTermMajor = 'getAllTopicByTermMajor',
    getAllTopicByLecturerTerm = 'getAllTopicByLecturerTerm'
}

export const useTopic = () => {
    const { enqueueSnackbar } = useSnackbar()
    const topicStore = useSelector((state: any) => state.topicSlice)
    // const { params, renderUi } = topicStore
    const dispatch = useDispatch()

    //[GET BY ID]
    const handleTopicById = (topicId: string) => {
        return useQuery([QueryTopic.getTopicById, topicId], () => getTopicById(topicId))
    }

    //[GET BY TERM, MAJOR]
    const handleTopicsByTermByMajor = (termId: string | number, majorId: string | number, typeRender: ENUM_RENDER_TOPIC, limit: number, page: number) => {
        return useQuery([QueryTopic.getAllTopicByTermMajor, termId, majorId], () => getTopicsByTermByMajor(termId, majorId), {
            staleTime: 10000,
            onSuccess(data) {
                // dispatch(setParams(data.params))
                // dispatch(setTypeRender(typeRender))
            }
        })
    }

    //[GET BY TERM, LECTURER]
    const handleTopicsByLecturerByTerm = (lecturerId: string | number, termId: string | number, typeRender: ENUM_RENDER_TOPIC) => {
        return useQuery([QueryTopic.getAllTopicByLecturerTerm, lecturerId, termId], () => getTopicsByLecturerByTerm(lecturerId, termId), {
            staleTime: 10000, onSuccess(data) {
                dispatch(setParams(data.params))
                dispatch(setTypeRender(typeRender))
            }
        })
    }

    //[CREATE]
    const onCreateTopicByToken = (termId: string | number, majorId: string | number) => {
        return useMutation((newTopic: any) => createTopicByToken(newTopic, termId), {
            onSuccess(data, variables) {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.create, "Đề tài"), { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termId, majorId] })
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

            },
            onError(error) {
                enqueueSnackbar("Cập nhật tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    //[UPDATE STATUS]
    const onUpdateStatusTopic = (topicId: string | number, majorId?: number, termId?: number) => {
        return useMutation((status: any) => updateStatusTopicById(topicId, status),
            {
                onSuccess() {
                    enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })
                    queryClient.invalidateQueries({ queryKey: [QueryTopic.getAllTopicByTermMajor, termId, majorId] });
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
            },
            onError(error) {
                enqueueSnackbar("Xóa đề tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }

    return {
        handleTopicsByTermByMajor,
        handleTopicsByLecturerByTerm,
        handleTopicById,
        onCreateTopicByToken,
        onUpdateTopicById,
        onDeleteTopicById,
        onUpdateStatusTopic
    }
}