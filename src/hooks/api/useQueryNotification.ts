import { useMutation, useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';

import { useSnackbar } from 'notistack';
import { createNotificationOfLecturerId, deleteNotificationLecturer, getNotificationsOfLecturer, updateNotificationLecturer } from '@/services/apiNotification';
import { queryClient } from '@/providers/ReactQueryClientProvider';

export enum QueryKeysNotification {
    getNotificationsOfLecturer = 'getNotificationsOfLecturer',
    getNotificationById = 'getNotificationById'
}

export const useNotification = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    //[GET ALL]
    const handleGetAllNotificationsOfLecturer = () => {
        return useQuery([QueryKeysNotification.getNotificationsOfLecturer], () => getNotificationsOfLecturer(), {
            onSuccess(data: any) {
            }
        });
    };


    //[CREATE]
    const onCreateNotification = () => {
        return useMutation(() => createNotificationOfLecturerId(), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Thêm thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries({ queryKey: [QueryKeysNotification.getNotificationsOfLecturer] });
                }
            },
            onError: () => {
                enqueueSnackbar('Thêm thông báo thất bại', { variant: 'error' });
            }
        });
    };

    //[UPDATE]
    const onUpdateNotification = (id: string) => {
        return useMutation((data) => updateNotificationLecturer(), {
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

    //[DELETE]
    const onDeleteNotification = (id: string) => {
        return useMutation(() => deleteNotificationLecturer(), {
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
    };
};
