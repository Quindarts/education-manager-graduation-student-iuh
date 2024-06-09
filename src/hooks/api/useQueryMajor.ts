import { createMajor, getAllMajor } from "@/services/apiMajor"
import { RootState } from "@/store"
import { setAllMajor } from "@/store/slice/major.slice"
import Major from "@/types/entities/major"
import { useMutation, useQuery } from "react-query"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

export const useMajor = () => {
    const majorStore = useSelector((state: RootState) => state.majorSlice);

    const dispatch = useDispatch()
    const handleGetAllMajor = () => {
        return useQuery(['get-all-major'], () => getAllMajor(), {
            onSuccess(data: any) {
                dispatch(setAllMajor(data.majors))
            }
        })
    }
    const handleCreateMajor = (data: Major) => {
        return useMutation(
            ['create-major', data],
            {
                mutationFn: (data: Major) =>
                    createMajor(data),
                onSuccess: () => {
                    alert("success")
                },
            })
    }
    return {
        handleGetAllMajor, handleCreateMajor, majorStore
    }
}
