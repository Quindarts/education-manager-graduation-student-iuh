import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ENUM_RENDER_GROUP_STUDENT {
    SEARCH_FULLNAME = "name",
    ALL = 'all'
}
const initGroupStudentSlice: any = {
    renderUi: ENUM_RENDER_GROUP_STUDENT.ALL,
    keywords: '',
    params: {
        page: 1,
        limit: 10,
        totalPage: 1,
    }
}

export const useGroupStudentSlice = createSlice({
    name: "GroupStudentSlice",
    initialState: initGroupStudentSlice,
    reducers: {
        setParams: (state: any, { payload }: PayloadAction<any>) => {
            state.params = payload
        },
        setTypeRender: (state: any, { payload }: PayloadAction<any>) => {
            state.renderUi = payload
        },
        setKeywords: (state: any, { payload }: PayloadAction<any>) => {
            state.keywords = payload
        },
    }
})
export const { setTypeRender, setParams } = useGroupStudentSlice.actions;

export default useGroupStudentSlice.reducer;