import { enqueueSnackbar, useSnackbar } from 'notistack';
import { useMutation, useQuery } from "react-query"
import * as ArticleService from "@/services/apiArticle"
import { useTerm } from "./useQueryTerm"
import { queryClient } from "@/providers/ReactQueryClientProvider"
import { QueryKeysGroupStudent } from './useQueryGroupStudent';
import { useMajor } from './useQueryMajor';
import { useLecturer } from './useQueryLecturer';
import { EnumRole } from '@/types/enum';
enum QueryKeysArticle {
    GET_ALL = 'getAllArticle',
    GET_BY_ID = 'getArticleById',
    GET_BY_LECTURER = 'getArticlesByLecturerId'
}
function useArticle() {
    const { termStore } = useTerm()
    const { currentRoleRender } = useLecturer()
    const termId = termStore.currentTerm.id

    const { enqueueSnackbar } = useSnackbar()

    const handleGetAllArticle = () => {
        if (currentRoleRender === EnumRole.LECTURER) {
            return useQuery(QueryKeysArticle.GET_BY_LECTURER, () => ArticleService.getArticlesByLecturer(termId), {
                refetchOnMount: true,
                enabled: !!termId
            })
        }
        return useQuery(QueryKeysArticle.GET_ALL, () => ArticleService.getArticles(termId), {
            refetchOnMount: true,
            enabled: !!termId
        })
    }
    const handleGetArticleById = (id: string) => {
        return useQuery([QueryKeysArticle.GET_BY_ID, id], () => ArticleService.getArticleById(id), {
            refetchOnMount: true,
            enabled: !!id
        })
    }
    const onUpdateStatusArticle = (id: string) => {
        return useMutation((data: { status, comment, bonusScore }) => ArticleService.updateStatusArticle(id, data.status, data.comment, data.bonusScore), {
            onSuccess: (data) => {
                queryClient.invalidateQueries(QueryKeysArticle.GET_ALL)
                queryClient.invalidateQueries(QueryKeysArticle.GET_BY_LECTURER)
                queryClient.invalidateQueries(QueryKeysArticle.GET_BY_ID)
                queryClient.invalidateQueries(QueryKeysGroupStudent.getGroupStudentById)
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