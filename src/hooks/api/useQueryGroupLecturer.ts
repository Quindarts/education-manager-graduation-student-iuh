import { queryClient } from "@/providers/ReactQueryClientProvider"
import { createGroupLecturer, getGroupLecturerById, getGroupLecturerByType, getLecturerNoGroupByTypeGroup } from "@/services/apiGroupLecturer"
import { useSnackbar } from "notistack"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { QueryKeysLecturerTerm } from "./useQueryLecturerTerm"

export enum QueryKeysGroupLecturer {
    getAllGroupLecturerByTypeGroup = 'getAllGroupLecturerByTypeGroup',
    getLecturerNoGroupByTypeGroup = 'getLecturerNoGroupByTypeGroup',
    createGroupLecturer = 'createGroupLecturer',
    getGroupLecturerById = "getGroupLecturerById",
    searchGroupLecturerByField = 'searchGroupLecturerByField',
    managerActionGroupLecturer = 'managerActionGroupLecturer'
}

export const useGroupLecturer = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm()

    const handleGetAllGroupLecturerByTypeGroup = (type: string) => {
        const termId = termStore.currentTerm.id
        return useQuery([QueryKeysGroupLecturer.getAllGroupLecturerByTypeGroup, type, termId], () => getGroupLecturerByType(termId, type))
    }
    const handleGetLecturerNoGroupByTypeGroup = (type: string) => {
        const termId = termStore.currentTerm.id
        return useQuery([QueryKeysGroupLecturer.getLecturerNoGroupByTypeGroup, type, termId], () => getLecturerNoGroupByTypeGroup(type, termId))
    }
    const handleGetGroupLecturerById = (id: string) => {
        return useQuery([QueryKeysGroupLecturer.getGroupLecturerById, id], () => getGroupLecturerById(id))

    }
    const onCreateGroupLecturer = (type: string) => {
        return useMutation((data: any) => createGroupLecturer(type, data), {
            onSuccess: (data: any) => {
                enqueueSnackbar('Tạo nhóm Giảng viên thành công', { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [QueryKeysLecturerTerm.listLecturerTerms, termStore.currentTerm.id] })
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
    }
}