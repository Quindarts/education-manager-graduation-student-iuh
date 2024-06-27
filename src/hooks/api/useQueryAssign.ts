import { createAssignByType, getGroupStudentNoAssign } from "@/services/apiAssign"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { useSnackbar } from "notistack"
import { queryClient } from "@/providers/ReactQueryClientProvider"


export enum QuerKeysAssign {
    getGroupStudentNoAssignByType = 'getGroupStudentNoAssignByType'

}
const useAssign = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm();

    const handletGetGroupStudentNoAssignByType = (type: string) => {
        return useQuery([QuerKeysAssign.getGroupStudentNoAssignByType, type], () => getGroupStudentNoAssign(type, termStore.currentTerm.id))
    }
    const onCreateAssignByType = (type: string) => {
        return useMutation((data: { groupLecturerId: string, listGroupStudentId: string[] }) => createAssignByType(type, data), {
            onSuccess() {
                enqueueSnackbar("Phân công chấm điểm thành công", { variant: "success" })
                queryClient.invalidateQueries([QuerKeysAssign.getGroupStudentNoAssignByType, type])

            },
            onError(err: any) {
                enqueueSnackbar(err.message, { variant: "error" })
            }
        })
    }
    return { handletGetGroupStudentNoAssignByType, onCreateAssignByType }
}

export default useAssign    