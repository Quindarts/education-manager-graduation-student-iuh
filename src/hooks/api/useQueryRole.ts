import { queryClient } from "@/providers/ReactQueryClientProvider";
import { assignRoleToLecturer, getAllRoleLecturer, getRoleDetailByLecturerId, RoleBodyRequest, unAssignRoleToLecturer } from "@/services/apiRole";
import { ResponseType } from "@/types/axios.type";
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query";

export enum QueryKeysLecturer {
    getAllRoleLecturer = 'getAllRoleLecturer',
    getRoleDetailByLecturerId = 'getRoleDetailByLecturerId'
}

export const useRoleManager = () => {
    const { enqueueSnackbar } = useSnackbar();

    // [GET ALL]
    const handleGetAllRoleLecturer = () => {
        return useQuery([QueryKeysLecturer.getAllRoleLecturer], () => getAllRoleLecturer(), {
            onSuccess(data: Pick<ResponseType, 'success' | 'message' | 'roles'>) {
            },
            staleTime: 10000,
        })
    }


    //[GET BY ID]
    const handleGetRoleDetailByLecturerId = (lecturerId: string) => {
        return useQuery([QueryKeysLecturer.getRoleDetailByLecturerId, lecturerId], () => getRoleDetailByLecturerId(lecturerId), {
            enabled: !!lecturerId
        })
    }

    //[CREATE]
    const onAssignRoleToLecturer = (lecturerId: string) => {

        return useMutation((data: RoleBodyRequest) => assignRoleToLecturer(data), {
            onSuccess() {
                enqueueSnackbar("Phân vai trò thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    {
                        queryKey: [QueryKeysLecturer.getAllRoleLecturer]
                    }
                );
                queryClient.invalidateQueries(
                    {
                        queryKey: [QueryKeysLecturer.getRoleDetailByLecturerId, lecturerId]
                    }
                );
            },
            onError(error) {
                enqueueSnackbar("Phân vai trò thất bại", { variant: 'error' })
            },
        },
        );
    }

    //[DELETE]
    const onUnAssignRoleToLecturer = (lecturerId: string) => {
        return useMutation((roleId: string) => unAssignRoleToLecturer(roleId), {
            onSuccess() {
                enqueueSnackbar("Hủy phân vai trò thành công", { variant: 'success' })
                queryClient.invalidateQueries(
                    {
                        queryKey: [QueryKeysLecturer.getAllRoleLecturer]
                    }
                );
                queryClient.invalidateQueries(
                    {
                        queryKey: [QueryKeysLecturer.getRoleDetailByLecturerId, lecturerId]
                    }
                );

            },
            onError(error) {
                enqueueSnackbar("Xóa vai trò thất bại vui lòng thử lại sau", { variant: 'error' })
            }
        })
    }


    return {
        onAssignRoleToLecturer,
        onUnAssignRoleToLecturer,
        handleGetAllRoleLecturer,
        handleGetRoleDetailByLecturerId,
    }
}