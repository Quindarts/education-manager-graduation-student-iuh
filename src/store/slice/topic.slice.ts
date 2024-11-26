import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitTopicSliceType {
    paramTotalPage: number,
}
const initTopicSlice: any = {
    paramTotalPage: 0,
}

export const useTopicSlice = createSlice({
    name: "TopicSlice",
    initialState: initTopicSlice,
    reducers: {
        setParamTotalPage: (state: Pick<InitTopicSliceType, 'paramTotalPage'>, { payload }: PayloadAction<any>) => {
            state.paramTotalPage = payload
        },
    }
})
export const { setParamTotalPage } = useTopicSlice.actions
export default useTopicSlice.reducer;