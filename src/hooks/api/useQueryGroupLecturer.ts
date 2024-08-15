import { queryClient } from "@/providers/ReactQueryClientProvider"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { useAuth } from './useAuth';
import { RoleCheck } from '@/types/enum';
import * as GroupLecturerServices from "@/services/apiGroupLecturer"

export enum QueryKeysGroupLecturer {
    getAllGroupLecturerByTypeGroup = 'getAllGroupLecturerByTypeGroup',
    getLecturerNoGroupByTypeGroup = 'getLecturerNoGroupByTypeGroup',
    getGroupLecturerByLecturerId = "getGroupLecturerByLecturerId",
    getCountOfGroupLecturer = "getCountOfGroupLecturer",
    getGroupLecturerById = "getGroupLecturerById",
    managerActionGroupLecturer = 'managerActionGroupLecturer',
    createGroupLecturer = 'createGroupLecturer',
    searchGroupLecturerByField = 'searchGroupLecturerByField',
}

export const useGroupLecturer = () => {

    //[REDUX]
    const { termStore } = useTerm()
    const { lecturerStore } = useAuth()
    const termId = termStore.currentTerm.id

    //[OTHER]
    const { enqueueSnackbar } = useSnackbar()

    //[GET]
    const handleGetCountOfGroupLecturer = () => {
        return useQuery(
            [QueryKeysGroupLecturer.getCountOfGroupLecturer, termId],
            () => GroupLecturerServices.getCountOfGroupLecturer(termId),
            {
                staleTime: 1000 * 60 * 20,
            }
        )
    }

    //[UI]
    const handleUiRender = (): string[] => {
        const currentRole = lecturerStore.currentRoleRender;
        var permissions: string[] = []
        if (currentRole === RoleCheck.HEAD_LECTURER) {
            permissions.push('all')
            permissions.push('crud')
        }
        else if (currentRole === RoleCheck.LECTURER) {
            permissions.push('crud')
        }
        else {
            permissions.push('readOnly')
        }
        return permissions
    }

    //[GET]
    const handleGetAllGroupLecturerByTypeGroup = (type: string) => {
        const termId = termStore.currentTerm.id
        return useQuery([QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId], () => GroupLecturerServices.getGroupLecturerByType(termId, type))
    }

    //[GET]
    const handleGetLecturerNoGroupByTypeGroup = (type: string) => {
        const termId = termStore.currentTerm.id
        return useQuery([QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup, type, termId], () => GroupLecturerServices.getLecturerNoGroupByTypeGroup(type, termId))
    }

    //[GET]
    const handleGetGroupLecturerByLecturerId = (type: string) => {
        const termId = termStore.currentTerm.id
        const lecturerId = lecturerStore.me.user.id
        return useQuery([QueryKeysGroupLecturer.getGroupLecturerByLecturerId, type, termId, lecturerId], () => GroupLecturerServices.getGroupLecturerByLecturerId(type, termId, lecturerId))
    }

    //[GET]
    const handleGetGroupLecturerById = (id: string) => {
        return useQuery([QueryKeysGroupLecturer.getGroupLecturerById, id], () => GroupLecturerServices.getGroupLecturerById(id))
    }

    //[POST]
    const onCreateGroupLecturer = (type: string) => {
        return useMutation((data: any) => GroupLecturerServices.createGroupLecturer(type, data), {
            onSuccess: () => {
                enqueueSnackbar('Tạo nhóm Giảng viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termStore.currentTerm.id] })
                queryClient.invalidateQueries({ queryKey: [QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup, type, termStore.currentTerm.id] })
            },
            onError: (error: any) => {
                enqueueSnackbar(error.message, { variant: 'error' })
            }
        })
    }


    return {
        handleGetCountOfGroupLecturer,
        handleGetLecturerNoGroupByTypeGroup,
        handleGetAllGroupLecturerByTypeGroup,
        handleGetGroupLecturerById,
        handleGetGroupLecturerByLecturerId,
        handleUiRender,
        onCreateGroupLecturer,
    }

}