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
    const handleGetMyNotification = (limit: string) => {
        return useQuery([QueryKeysNotificationLecturer.getMyNotification, limit], () => NotificationLecturerServices.getMyNotification(limit), {
        })
    }
    //[GET]
    const handleGetNotificationOfLecturer = (id: string) => {
        return useQuery([QueryKeysNotificationLecturer.getNotificationsOfLecturer, id], () => NotificationLecturerServices.getNotificationsOfLecturer(id))
    }
    //[POST]
    const onCreateNotificationOfLecturerIds = () => {
        return useMutation((data: { title: string, content: string, lecturerIds: string[] }) => NotificationLecturerServices.createNotificationOfLecturerIds(data), {
            onSuccess(data: any) {
                enqueueSnackbar('Gửi thông báo thành công', { variant: 'success' })
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
                    queryClient.invalidateQueries([QueryKeysNotificationLecturer.getMyNotification])

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
    const onCreateNotificationOfGroupLecturer = () => {
        return useMutation((data: { title: string, content: string, groupLecturerIds: string[] }) => NotificationLecturerServices.createNotificationOfGroupLecturer(data), {
            onSuccess(data: any) {
                enqueueSnackbar('Gửi thông báo thành công', { variant: 'success' })
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
    const onUpdateReadStatus = (id: string) => {
        return useMutation(() => NotificationLecturerServices.upateReadStatusNotification(id),
            {
                onSuccess(data: any) {
                    enqueueSnackbar('Cập nhật thành công', { variant: 'success' })
                    queryClient.invalidateQueries([QueryKeysNotificationLecturer.getNotificationsOfLecturer, id])
                    queryClient.invalidateQueries([QueryKeysNotificationLecturer.getMyNotification])
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
        handleGetMyNotification,
        handleGetNotificationOfLecturer,
        onCreateAllNotificationLecturerTerms,
        onCreateNotificationOfLecturerIds,
        onCreateNotificationOfGroupLecturer,
        onUpdateReadStatus
    }
}