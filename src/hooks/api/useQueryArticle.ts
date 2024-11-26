import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import * as ArticleService from "@/services/apiArticle"
import { useTerm } from "./useQueryTerm"
import { queryClient } from "@/providers/ReactQueryClientProvider"
enum QueryKeysArticle {
    GET_ALL = 'getAllArticle',
    GET_BY_ID = 'getArticleById',
}
function useArticle() {
    const { termStore } = useTerm()
    const termId = termStore.currentTerm.id
    const { enqueueSnackbar } = useSnackbar()
    const handleGetAllArticle = () => {
        return useQuery(QueryKeysArticle.GET_ALL, () => ArticleService.getArticles(termId), {
            refetchOnMount: true,
            enabled: !!termId
        })
    }
    const handleGetArticleById = (id: string) => {
        return useQuery(QueryKeysArticle.GET_BY_ID, () => ArticleService.getArticleById(id), {
            refetchOnMount: true,
            enabled: !!id
        })
    }
    const onUpdateStatusArticle = (id: string) => {
        return useMutation((data: { status, comment }) => ArticleService.updateStatusArticle(id, data.status, data.comment), {
            onSuccess: (data) => {
                queryClient.invalidateQueries(QueryKeysArticle.GET_ALL)
                if (data.success === true) {
                    enqueueSnackbar('Cập nhật trạng thái bài báo thành công', { variant: 'success' })
                }
                else {
                    enqueueSnackbar('Cập nhật trạng thái bài báo thất bại', { variant: 'error' })
                }
            }
        })
    }
    return {
        handleGetAllArticle,
        onUpdateStatusArticle,
        handleGetArticleById,
    }
}

export default useArticle