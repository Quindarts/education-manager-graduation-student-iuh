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
            staleTime: 1000 * (60 * 20),
            refetchOnMount: true,
            cacheTime: 1000
        })
    }

    //? [POST]
    const onCreateEvent = () => {
        return useMutation((data: Partial<EventToRequest>) => EventServices.createEvent(data.name, data.deadline, data.groupStudentIds, termId), {
            onSuccess() {
                enqueueSnackbar('Tạo sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries(QueryKeysEvent.GET_EVENTS)
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
        return useMutation((data: Partial<EventType>) => EventServices.updateEvent(id, data.name, data.deadline), {
            onSuccess() {
                enqueueSnackbar('Cập nhật sự kiện thành công', { variant: "success" })
                queryClient.invalidateQueries({ queryKey: [QueryKeysEvent.GET_EVENTS, termId] })
                queryClient.invalidateQueries(QueryKeysEvent.GET_EVENT)
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
    return {
        onUpdateEventById,
        onDeleteEventById,
        onCreateEvent,
        handleGetEvents
    }


}

export default useEvent