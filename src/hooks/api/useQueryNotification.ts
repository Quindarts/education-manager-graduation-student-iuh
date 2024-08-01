import { useMutation, useQuery } from 'react-query';


import { enqueueSnackbar, useSnackbar } from 'notistack';
import { createAllNotificationLecturerTerms, createAllNotificationStudentTerms, createNotificationOfLecturerId, deleteNotificationLecturer, getMyNotification, getMyNotificationById, getNotificationsOfLecturer, upateReadStatusNotification, updateNotificationLecturer } from '@/services/apiNotification';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { useTerm } from './useQueryTerm';

export enum QueryKeysNotification {
    //Lecturer
    getNotificationsOfLecturer = 'getNotificationsOfLecturer',
    getNotificationById = 'getNotificationById',
    getMyNotification = 'getMyNotification',
    //Student
    getAllNotificationStudentTerms = 'getAllNotificationStudentTerms'
}

export const useNotification = () => {
    const { termStore } = useTerm()
    const { enqueueSnackbar } = useSnackbar();

    //[GET ALL]
    const handleGetAllNotificationsOfLecturer = () => {
        return useQuery([QueryKeysNotification.getNotificationsOfLecturer], () => getNotificationsOfLecturer(), {
            refetchInterval: 1000 * (60 * 3),
            staleTime: 1000 * (60 * 3), // 10 min,
        });
    };

    const handleGetNotificationById = (id: string) => {
        return useQuery([QueryKeysNotification.getNotificationById, id], () => getMyNotificationById(id), {
            staleTime: 1000 * (60 * 60), // 10 min,
        })
    }
    const handleGetMyNotification = () => {
        return useQuery([QueryKeysNotification.getMyNotification], () => getMyNotification(), {
            staleTime: 5000,
        })
    }

    //[CREATE]
    const onCreateNotification = () => {
        return useMutation((data: { message: string; type: string; lecturerId: string; }) => createNotificationOfLecturerId(data), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Thêm thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationsOfLecturer] });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getMyNotification] });
                }
            },
            onError: () => {
                enqueueSnackbar('Thêm thông báo thất bại', { variant: 'error' });
            }
        });
    };

    const onCreateAllNotificationLecturerTerms = () => {
        return useMutation((message: string) => createAllNotificationLecturerTerms(message, termStore.currentTerm.id), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar(data.message, { variant: 'success' });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationsOfLecturer] });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getMyNotification] });

                }
            },
            onError: () => {
                enqueueSnackbar('Gửi thông báo thất bại', { variant: 'error' });
            }
        }
        );
    };

    const onCreateAllNotificationStudentTerms = () => {
        return useMutation((message: string) => createAllNotificationStudentTerms(message, termStore.currentTerm.id), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar(data.message, { variant: 'success' });
                }
            },
            onError: () => {
                enqueueSnackbar('Gửi thông báo thất bại', { variant: 'error' });
            }
        }
        );
    };

    //[UPDATE]
    const onUpdateNotification = (id: string) => {
        return useMutation((data: { message: string; type: string; lecturerId: string; }) => updateNotificationLecturer(id, data), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Cập nhật thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationById, id] });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationsOfLecturer] });
                }
            },
            onError: () => {
                enqueueSnackbar('Cập nhật thông báo thất bại', { variant: 'error' });
            }
        });
    };

    //[UPDATE]
    const onReadOfNotification = (id: string) => {
        return useMutation(() => upateReadStatusNotification(id), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Đã xem', { variant: 'success' });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationById, id] });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getMyNotification] });
                }
            },
            onError: () => {
                enqueueSnackbar('Cập nhật thông báo thất bại', { variant: 'error' });
            }
        });
    };

    //[DELETE]
    const onDeleteNotification = () => {
        return useMutation((id: string) => deleteNotificationLecturer(id), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Xóa thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationsOfLecturer] });
                }
            },
            onError: () => {
                enqueueSnackbar('Xóa thông báo thất bại', { variant: 'error' });
            }
        });
    };

    return {
        handleGetAllNotificationsOfLecturer,
        onCreateNotification,
        onUpdateNotification,
        onDeleteNotification,
        onCreateAllNotificationStudentTerms,
        handleGetMyNotification,
        onCreateAllNotificationLecturerTerms,
        handleGetNotificationById,
        onReadOfNotification,
    };
}
