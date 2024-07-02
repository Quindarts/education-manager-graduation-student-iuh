import { queryClient } from "@/providers/ReactQueryClientProvider";
import { Query, QueryCache } from "react-query";

//Query Client -> query cache - have many -> query
export const useApp = () => {

    const getQueryKey = async (key: any) => {
        const rs = queryClient.getQueryCache().findAll().map(data => {
            // console.log(data.queryKey);
            data.queryKey
        })
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
