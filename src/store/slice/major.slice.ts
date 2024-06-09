import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initMajorSlice: any = {
    currentMajor: {},
    allMajor: [],

}

export const useMajorSlice = createSlice({
    name: "MajorSlice",
    initialState: initMajorSlice,
    reducers: {
        setAllMajor: (state: any, { payload }: PayloadAction<any>) => {
            state.allMajor = payload
        }
    }
})

export const { setAllMajor } = useMajorSlice.actions

export default useMajorSlice.reducer