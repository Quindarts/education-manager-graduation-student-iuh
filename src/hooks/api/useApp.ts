import { queryClient } from "@/providers/ReactQueryClientProvider";

export const useApp = () => {
    const getQueryKeyByEnumKey = (keyEnum: string) => {
        const queryCache = queryClient.getQueryCache();
        const queryKeys = queryCache.getAll().includes(keyEnum)
        console.log("🚀 ~ onSuccess ~ queryKeys:", queryKeys)
    }

    return ()
}