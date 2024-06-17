import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ENUM_RENDER_STUDENT {
    SEARCH = "SEARCH",
    FILTER = 'FILTER',
    ALL = 'ALL'
}
const initStudentSlice: any = {
    renderUi: ENUM_RENDER_STUDENT.ALL,
    params: {
        page: 1,
        limit: 10,
        totalPage: 1,
    }
}

export const useStudentSlice = createSlice({
    name: "StudentSlice",
    initialState: initStudentSlice,
    reducers: {
        setParams: (state: any, { payload }: PayloadAction<any>) => {
            state.params = payload
        },
        setTypeRender: (state: any, { payload }: PayloadAction<any>) => {
            state.renderUi = payload
        }
    }
})
export const { setTypeRender, setParams } = useStudentSlice.actions;

export default useStudentSlice.reducer;