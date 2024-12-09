import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { queryClient } from '@/providers/ReactQueryClientProvider';
import { useTerm } from './useQueryTerm';
import useParams from '../ui/useParams';
import * as NotificationServices from "@/services/apiNotifications"
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setParamTotalPage } from '@/store/slice/notification.slice';
import { QueryKeysNotificationLecturer } from './useQueryNotificationLecturer';
import { useLecturer } from './useQueryLecturer';
import { RoleCheck } from '@/types/enum';

export enum QueryKeysNotification {
    getNotificationsOfFilter = "getNotificationsOfFilter",
    getNotificationById = "getNotificationById",
}

export const useNotification = () => {
    //[REDUX]
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id
    const { currentRoleRender } = useLecturer()
    const notificationStore = useSelector((state: any) => state.notificationSlice)
    const { paramTotalPage } = notificationStore
    const dispatch = useDispatch()

    //[PARAMS URL] 
    const { getQueryField, setTotalPage, setLimit, setPage } = useParams()

    //[OTHER]
    const { enqueueSnackbar } = useSnackbar()
    const getRolePermission = () => {
        let permissions: string[] = []
        if (currentRoleRender === RoleCheck.LECTURER) {
            permissions.push('basic')
        }
        if (currentRoleRender === RoleCheck.ADMIN || currentRoleRender === RoleCheck.HEAD_COURSE || currentRoleRender === RoleCheck.HEAD_LECTURER) {
            permissions.push('admin')
        }
        return permissions
    }

    const handleGetNotificationOfFilter = () => {
        getQueryField('limit') ? getQueryField('limit') : setLimit(10)
        getQueryField('page') ? getQueryField('page') : setPage(1)
        return useQuery([QueryKeysNotification.getNotificationsOfFilter,
        getQueryField('limit'),
        getQueryField('page'),
        getQueryField("searchField"),
        getQueryField('keywords')
        ],
            () => NotificationServices.getNotificationsOfFilter(
                getQueryField("limit"),
                getQueryField("page"),
                getQueryField("searchField"),
                getQueryField("keywords")
            ),
            {
                onSuccess(data) {
                    const total = data.params ? data.params.totalPage : 0
                    dispatch(setParamTotalPage(total))
                    setTotalPage(total)
                },
                staleTime: 1000 * (60 * 3), // 10 min,
                refetchOnMount: true,
                refetchInterval: 1000 * (60 * 20),
                keepPreviousData: true,
            }
        )
    }

    const handleGetNotificationById = (id: string) => {
        return useQuery([QueryKeysNotification.getNotificationById, id], () => NotificationServices.getNotificationById(id), {
            staleTime: 1000 * (20 * 60), // 10 min,
            enabled: !!id,
            refetchOnMount: true,
        })
    }

    //[CREATE]
    const onCreateManyNotifications = () => {
        return useMutation((data: any) => NotificationServices.createNotifications(data.title, data.content, termId), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Thêm thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries(
                        QueryKeysNotification.getNotificationsOfFilter
                    );
                    queryClient.invalidateQueries(QueryKeysNotificationLecturer.getMyNotification)

                }
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        });
    };

    //[UPDATE]
    const onUpdateNotification = (id: string) => {
        return useMutation((data: { title: string, content: string }) => NotificationServices.updateNotification(id, data.title, data.content), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Cập nhật thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries(
                        QueryKeysNotification.getNotificationsOfFilter
                    );
                    queryClient.invalidateQueries(QueryKeysNotificationLecturer.getMyNotification)

                }
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        });
    };

    //[DELETE]
    const onDeleteNotificationById = () => {
        return useMutation((id: string) => NotificationServices.deleteNotifications(id), {
            onSuccess: (data: any) => {
                if (data.success) {
                    enqueueSnackbar('Xóa thông báo thành công', { variant: 'success' });
                    queryClient.invalidateQueries(
                        QueryKeysNotification.getNotificationsOfFilter
                    );
                    queryClient.invalidateQueries(QueryKeysNotificationLecturer.getMyNotification)
                }
            },
            onError(err: any) {
                if (err.status < 500)
                    enqueueSnackbar(err.message, { variant: 'error' })
                else
                    enqueueSnackbar('Cập nhật thất bại, thử lại', { variant: 'warning' })
            }
        });
    };

    return {
        paramTotalPage,
        handleGetNotificationOfFilter,
        handleGetNotificationById,
        onCreateManyNotifications,
        onUpdateNotification,
        getRolePermission,
        onDeleteNotificationById
    };
}
