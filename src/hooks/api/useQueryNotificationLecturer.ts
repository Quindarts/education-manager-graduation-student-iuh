import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import * as NotificationLecturerServices from "@/services/apiNotificationsOfLecturer"
import { useTerm } from './useQueryTerm';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { QueryKeysNotification } from './useQueryNotification';
export enum QueryKeysNotificationLecturer {
    //Lecturer
    getMyNotification = "getMyNotification",
    getNotificationsOfLecturer = 'getNotificationsOfLecturer',

}
export const useNotificationLecturer = () => {
    //[REDUX]
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id

    const { enqueueSnackbar } = useSnackbar()
    //[GET]
    const handleGetMyNotification = () => {
        return useQuery([QueryKeysNotificationLecturer.getMyNotification], () => NotificationLecturerServices.getMyNotification, {
            staleTime: 20 * 60 * 1000,
        })
    }
    //[GET]
    const handleGetNotificationOfLecturer = () => {
        return useQuery([QueryKeysNotificationLecturer.getNotificationsOfLecturer], () => NotificationLecturerServices.getNotificationsOfLecturer)
    }
    //[POST]
    const onCreateNotificationOfLecturerId = () => {
        return useMutation((data: { title: string, content: string, lecturerId: string }) => NotificationLecturerServices.createNotificationOfLecturerId(data), {
            onSuccess(data: any) {
                enqueueSnackbar('', { variant: 'success' })
                queryClient.invalidateQueries({
                    queryKey:
                        [QueryKeysNotification.getNotificationsOfFilter,
                            "10",
                            "1",
                            "",
                            ""
                        ]
                });
            },
            onError(error: any) {
                if (error.status > 500) {
                    enqueueSnackbar('Hệ thống không xử lý được yêu cầu của bạn, thử lại sau.', { variant: 'warning' })
                }
                else {
                    enqueueSnackbar(error.message, { variant: 'error' })
                }
            }
        })
    }
    //[POST]
    const onCreateAllNotificationLecturerTerms = () => {
        return useMutation((data: { title: string, content: string }) => NotificationLecturerServices.createAllNotificationLecturerTerms(data.title, data.content, termId),
            {
                onSuccess(data: any) {
                    enqueueSnackbar('Gửi thông báo tới toàn bộ giảng viên thành công !', { variant: 'success' })
                    queryClient.invalidateQueries({
                        queryKey:
                            [QueryKeysNotification.getNotificationsOfFilter,
                                "10",
                                "1",
                                "",
                                ""
                            ]
                    });
                },
                onError(error: any) {
                    if (error.status > 500) {
                        enqueueSnackbar('Hệ thống không xử lý được yêu cầu của bạn, thử lại sau.', { variant: 'warning' })
                    }
                    else {
                        enqueueSnackbar(error.message, { variant: 'error' })
                    }
                }
            })
    }
    //[PUT]
    const onUpdateReadStatus = () => {
        return useMutation((id: string) => NotificationLecturerServices.upateReadStatusNotification(id),
            {
                onSuccess(data: any) {
                    enqueueSnackbar('', { variant: 'success' })
                }
            })
    }
    return {
        handleGetMyNotification,
        handleGetNotificationOfLecturer,
        onCreateAllNotificationLecturerTerms,
        onCreateNotificationOfLecturerId,
        onUpdateReadStatus
    }
}