import { getGroupLecturerByLecturerId } from './../../services/apiGroupLecturer';
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createGroupLecturer, getGroupLecturerById, getGroupLecturerByType, getLecturerNoGroupByTypeGroup } from "@/services/apiGroupLecturer"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { useAuth } from './useAuth';
import { RoleCheck } from '@/types/enum';

export enum QueryKeysGroupLecturer {
    getAllGroupLecturerByTypeGroup = 'getAllGroupLecturerByTypeGroup',
    getLecturerNoGroupByTypeGroup = 'getLecturerNoGroupByTypeGroup',
    getGroupLecturerByLecturerId = "getGroupLecturerByLecturerId",
    createGroupLecturer = 'createGroupLecturer',
    getGroupLecturerById = "getGroupLecturerById",
    searchGroupLecturerByField = 'searchGroupLecturerByField',
    managerActionGroupLecturer = 'managerActionGroupLecturer'
}

export const useGroupLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()
    const { lecturerStore } = useAuth()

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
    const handleGetAllGroupLecturerByTypeGroup = (type: string) => {
        const termId = termStore.currentTerm.id
        return useQuery([QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId], () => getGroupLecturerByType(termId, type))
    }
    const handleGetLecturerNoGroupByTypeGroup = (type: string) => {
        const termId = termStore.currentTerm.id
        return useQuery([QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup, type, termId], () => getLecturerNoGroupByTypeGroup(type, termId))
    }

    const handleGetGroupLecturerByLecturerId = (type: string) => {
        const termId = termStore.currentTerm.id
        const lecturerId = lecturerStore.me.user.id
        return useQuery([QueryKeysGroupLecturer.getGroupLecturerByLecturerId, type, termId, lecturerId], () => getGroupLecturerByLecturerId(type, termId, lecturerId))
    }

    const handleGetGroupLecturerById = (id: string) => {
        return useQuery([QueryKeysGroupLecturer.getGroupLecturerById, id], () => getGroupLecturerById(id))

    }
    const onCreateGroupLecturer = (type: string) => {
        return useMutation((data: any) => createGroupLecturer(type, data), {
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
        handleGetLecturerNoGroupByTypeGroup,
        onCreateGroupLecturer,
        handleGetAllGroupLecturerByTypeGroup,
        handleGetGroupLecturerById,
        handleGetGroupLecturerByLecturerId,
        handleUiRender
    }

}