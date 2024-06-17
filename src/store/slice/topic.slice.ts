import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ENUM_RENDER_TOPIC {
    SEARCH = "SEARCH",
    FILTER = 'FILTER',
    ALL = 'ALL'
}
const initTopicSlice: any = {
    renderUi: ENUM_RENDER_TOPIC.ALL,
    params: {
        page: 1,
        limit: 10,
        totalPage: 1,
    }
}

export const useTopicSlice = createSlice({
    name: "TopicSlice",
    initialState: initTopicSlice,
    reducers: {
        setParams: (state: any, { payload }: PayloadAction<any>) => {
            state.params = payload
        },
        setTypeRender: (state: any, { payload }: PayloadAction<any>) => {
            state.renderUi = payload
        }
    }
})
export const { setTypeRender, setParams } = useTopicSlice.actions;

export default useTopicSlice.reducer;