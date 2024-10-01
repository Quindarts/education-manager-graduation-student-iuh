import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface InitStudentSliceType { paramTotalPage: number }


const initStudentSlice: InitStudentSliceType = {
    paramTotalPage: 0,
}

export const useStudentSlice = createSlice({
    name: "StudentSlice",
    initialState: initStudentSlice,
    reducers: {
        setParamTotalPage: (state: Pick<InitStudentSliceType, 'paramTotalPage'>, { payload }: PayloadAction<any>) => {
            state.paramTotalPage = payload
        },
    }
})

export const { setParamTotalPage } = useStudentSlice.actions
export default useStudentSlice.reducer;