import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createTopicByToken, deleteTopicById, getTopicsByLecturerByTerm, getTopicsByTermByMajor, updateTopicById } from "@/services/apiTopic"
import { MESSAGE_STORE_SUCCESS, TypeMess } from "@/types/enum"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"



export const useTopic = () => {
    const { enqueueSnackbar } = useSnackbar()

    const handleTopicsByTermByMajor = (termId: string | number, majorId: string | number) => {
        return useQuery(['get-all-topic-term-major', termId, majorId], () => getTopicsByTermByMajor(termId, majorId))
    }
    const handleTopicsByLecturerByTerm = (lecturerId: string | number, termId: string | number) => {
        return useQuery(['get-all-topic-lecturer-term', lecturerId, termId], () => getTopicsByLecturerByTerm(lecturerId, termId), {
            onSuccess: () => {
                enqueueSnackbar("Fetch data success", { variant: 'success' })
            }
        })

    }
    const onCreateTopicByToken = () => {
        return useMutation((newTopic: any) => createTopicByToken(newTopic), {

            onSuccess(data, variables, context) {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.create, "Đề tài"), { variant: 'success' })
            },
            onError(error) {
                console.log("🚀 ~ onError ~ error:", error)
                enqueueSnackbar("Tạo đề tài thất bại", { variant: 'error' })
            }
        },
        );
    }
    const onUpdateTopicById = (topicId: string | number, lecturerId?: number, termId?: number) => {

        return useMutation((updateTopic: any) => updateTopicById(topicId, updateTopic), {

            onSuccess(data, variables, context) {
                enqueueSnackbar(MESSAGE_STORE_SUCCESS(TypeMess.update, "Đề tài"), { variant: 'success' })

                queryClient.invalidateQueries({ queryKey: ['topics', lecturerId, termId] });
            },
            onError(error) {
                enqueueSnackbar("Cập nhật tài thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }
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
        onCreateTopicByToken,
        onUpdateTopicById,
        onDeleteTopicById
    }
}