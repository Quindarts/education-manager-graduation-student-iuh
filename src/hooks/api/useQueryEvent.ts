import { useSnackbar } from 'notistack';
import { useTerm } from './useQueryTerm';
import * as EventServices from "@/services/apiEvent"
import { useMutation, useQuery } from 'react-query';
import { EventToRequest, EventType } from '@/types/entities/event';
import { queryClient } from '@/providers/ReactQueryClientProvider';
enum QueryKeysEvent {
    GET_EVENT = 'getEventById',
    GET_EVENTS = 'getAllEvents',
}
function useEvent() {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm();
    const termId = termStore.currentTerm.id

    //? [GET]
    const handleGetEvents = () => {
        return useQuery([QueryKeysEvent.GET_EVENTS, termId], () => EventServices.getEvents(termId), {
            refetchOnMount: true,
            cacheTime: 1000
        })
    }
    const handleGetEventById = (id: string) => {
        return useQuery([QueryKeysEvent.GET_EVENT, id], () => EventServices.getEventById(id), {
            refetchOnMount: true,
            cacheTime: 1000,
        })
    }

    //? [POST]
    const onCreateEvent = () => {
        return useMutation((data: Partial<EventToRequest>) => EventServices.createEvent(data.name, data.startDate, data.endDate, data.groupStudentIds, termId), {
            onSuccess() {
                enqueueSnackbar('Tạo sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENTS, termId] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //? [PUT]
    const onUpdateEventById = (id: string) => {
        return useMutation((data: Partial<EventType>) => EventServices.updateEvent(id, data.name, data.startDate, data.endDate), {
            onSuccess() {
                enqueueSnackbar('Cập nhật sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENTS, termId] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENT, id] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    const onUpdateEndDateEventById = (id: string) => {
        return useMutation((endDate: string) => EventServices.updateEndDateEvent(id, endDate), {
            onSuccess() {
                enqueueSnackbar('Cập nhật ngày kết thúc sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENTS, termId] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENT, id] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    //? [DELETE]
    const onDeleteEventById = (id: string) => {
        return useMutation(() => EventServices.deleteEventById(id), {
            onSuccess() {
                enqueueSnackbar('Xóa sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENTS, termId] })
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        })
    }
    const onCommentEvent = (id: string) => {
        return useMutation((data: any) => EventServices.updateCommentEventById(id, data.groupStudentId, data.comment), {
            onSuccess() {
                enqueueSnackbar('Nhận xét sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENT, id] })
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
        onUpdateEventById,
        onDeleteEventById,
        onCreateEvent,
        onUpdateEndDateEventById,
        onCommentEvent,
        handleGetEvents,
        handleGetEventById
    }


}

export default useEvent