import { queryClient } from "@/providers/ReactQueryClientProvider";
export const useApp = () => {
    const getQueryKey = async (key: any) => {
        return queryClient.getQueryCache().find(key)?.queryKey
    }
    const getAllKey = () => {
        return queryClient.getQueryCache().findAll()
    }
    const getQueryValueKey = (key: string | string[]) => {
        return queryClient.getQueryData(key)
    }
    return { getQueryKey, getAllKey, getQueryValueKey }
}
