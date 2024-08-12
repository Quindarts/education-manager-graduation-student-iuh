import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { debounce } from 'lodash';

type QueryType = "limit" | "page" | "searchField" | "keywords" | "sort" | "totalPage" 
enum QueryEnum {
    LIMIT = "limit",
    PAGE = "page",
    SEARCH_FIELD = "searchField",
    KEYWORDS = "keywords",
    FILTER = "filters",
    TOTALPAGE = "totalPage",
    SORT = "sort"
}
function useParams() {
    const [focused, setFocused] = useState(false)
    const [query, setSearch] = useSearchParams();

    const handleFocused = (focus: boolean) => {
        setFocused(focus)
    }
    const onTypeSearchChange = (type: string) => {
        if (!type) {
            query.delete(QueryEnum.SEARCH_FIELD)
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set(QueryEnum.SEARCH_FIELD, type);
            setSearch(query, {
                replace: true,
            })
        }
    }
    const setDefaultTypeSearch = (type: string) => {
        query.set(QueryEnum.SEARCH_FIELD, type);
        setSearch(query, {
            replace: true,
        })

    }
    const setTypeSort = (type: string) => {
        query.set(QueryEnum.SORT, type)
        setSearch(query, {
            replace: true,
        })
    }

    const getQueryField = (type: QueryType) => {
        return query.get(type) ? `${query.get(type)}` : ''
    }

    const onSearchChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        if (text.length === 0) {
            query.delete(QueryEnum.KEYWORDS)
            setSearch(query, {
                replace: true,
            });
        }
        else {
            query.set(QueryEnum.KEYWORDS, text);
            setSearch(query, {
                replace: true,
            });
        }
    }, 700)


    const setLimit = (limit?: number) => {
        if (!limit) {
            query.delete(QueryEnum.LIMIT)
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set(QueryEnum.LIMIT, `${limit}`)
            setSearch(query, {
                replace: true,
            });
        }
    }

    const setPage = (page?: number) => {
        if (!page) {
            query.delete(QueryEnum.PAGE)
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set(QueryEnum.PAGE, page.toString())
            setSearch(query, {
                replace: true,
            });
        }
    }
    const setTotalPage = (totalPage: number) => {
        if (!totalPage) {
            query.delete(QueryEnum.TOTALPAGE)
            setSearch(query, {
                replace: true,
            });
        } else {
            query.set(QueryEnum.TOTALPAGE, totalPage.toString())
            setSearch(query, {
                replace: true,
            });
        }
    }

    return { onSearchChange, setDefaultTypeSearch, onTypeSearchChange, getQueryField, setPage, setTypeSort, setLimit, setTotalPage, focus, handleFocused }
}

export default useParams