import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import * as NotificationStudentServices from "@/services/apiNotificationsOfStudent"
import { useTerm } from './useQueryTerm';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { QueryKeysNotification } from './useQueryNotification';
export enum QueryKeysNotificationStudent {
    //Student
    getNotificationsOfStudent = 'getNotificationsOfStudent',
}
export const useNotificationStudent = () => {
    //[REDUX]
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id

    const { enqueueSnackbar } = useSnackbar()
    //[GET]
    const handleGetNotificationOfStudent = () => {
        return useQuery([QueryKeysNotificationStudent.getNotificationsOfStudent], () => NotificationStudentServices.getNotificationsOfStudent)
    }
    //[POST]
    const onCreateNotificationOfStudentId = () => {
        return useMutation((data: { title: string, content: string, studentId: string }) => NotificationStudentServices.createNotificationOfStudentId(data), {
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
    const onCreateAllNotificationStudentTerms = () => {
        return useMutation((data: { title: string, content: string }) => NotificationStudentServices.createAllNotificationStudentTerms(data.title, data.content, termId),
            {
                onSuccess(data: any) {
                    enqueueSnackbar('Gửi thông báo đến tất cả sinh viên học kì thành công', { variant: 'success' })
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
        return useMutation((id: string) => NotificationStudentServices.upateReadNotificationStudent(id),
            {
                onSuccess(data: any) {
                    enqueueSnackbar('', { variant: 'success' })
                }
            })
    }
    return {
        handleGetNotificationOfStudent,
        onCreateAllNotificationStudentTerms,
        onCreateNotificationOfStudentId,
        onUpdateReadStatus
    }
}