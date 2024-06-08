import { createMajor, getAllMajor } from "@/services/apiMajor"
import Major from "@/types/entities/major"
import { useMutation, useQuery } from "react-query"

export const useMajor = () => {

    const handleGetAllMajor = () => {
        return useQuery(['get-all-major'], () => getAllMajor(), {
            onSuccess(data: any) {
                console.log("🚀 ~ onSuccess ~ data:", data)
                return data.majors
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
        handleGetAllMajor, handleCreateMajor
    }
}
