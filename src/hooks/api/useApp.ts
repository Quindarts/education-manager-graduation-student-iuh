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
    const filterQueryByValue = (key: string | string[]) => {
        const listQuery = queryClient.getQueryData(key);
        listQuery.map(a => console.log(a));
    }
    return { getQueryKey, getAllKey, getQueryValueKey }
}
