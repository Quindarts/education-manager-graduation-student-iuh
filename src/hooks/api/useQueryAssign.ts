import { createAssignByType, getGroupStudentNoAssign } from "@/services/apiAssign"
import { useMutation, useQuery } from "react-query"
import { useTerm } from "./useQueryTerm"
import { useSnackbar } from "notistack"
import { queryClient } from "@/providers/ReactQueryClientProvider"


export enum QueryKeysAssign {
    getGroupStudentNoAssignByType = 'getGroupStudentNoAssignByType'

}
const useAssign = () => {
    const { enqueueSnackbar } = useSnackbar()
    const { termStore } = useTerm();

    const handletGetGroupStudentNoAssignByType = (type: string) => {

        return useQuery([QueryKeysAssign.getGroupStudentNoAssignByType, type, termStore.currentTerm.id], () => getGroupStudentNoAssign(type, termStore.currentTerm.id))
    }
    const onCreateAssignByType = (type: string) => {
        return useMutation((data: { groupLecturerId: string, listGroupStudentId: string[] }) => createAssignByType(type, data), {
            onSuccess() {
                enqueueSnackbar("Phân công chấm điểm thành công", { variant: "success" })
                queryClient.invalidateQueries([QueryKeysAssign.getGroupStudentNoAssignByType, type, termStore.currentTerm.id])

            },
            onError(err: any) {
                enqueueSnackbar(err.message, { variant: "error" })
            }
        })
    }
    return { handletGetGroupStudentNoAssignByType, onCreateAssignByType }
}

export default useAssign    