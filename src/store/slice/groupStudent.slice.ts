import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface InitGroupStudentSliceType {
    paramTotalPage: number,
}
const initGroupStudentSlice: InitGroupStudentSliceType = {
    paramTotalPage: 0,
}

export const useGroupStudentSlice = createSlice({
    name: "GroupStudentSlice",
    initialState: initGroupStudentSlice,
    reducers: {
        setParamTotalPage: (state: Pick<InitGroupStudentSliceType, 'paramTotalPage'>, { payload }: PayloadAction<any>) => {
            state.paramTotalPage = payload
        },
    }
})
export const { setParamTotalPage } = useGroupStudentSlice.actions

export default useGroupStudentSlice.reducer;