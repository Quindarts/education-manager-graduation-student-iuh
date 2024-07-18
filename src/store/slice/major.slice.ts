import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initMajorSlice: any = {
    allMajor: [],
    currentMajor: {
        id: "",
        name: ""
    },
}

export const useMajorSlice = createSlice({
    name: "MajorSlice",
    initialState: initMajorSlice,
    reducers: {
        setAllMajor: (state: any, { payload }: PayloadAction<any>) => {
            state.allMajor = payload
        },
        setCurrentMajor: (state: any, { payload }: PayloadAction<any>) => {
            state.currentMajor = payload
        }
    }
})

export const { setAllMajor, setCurrentMajor } = useMajorSlice.actions

export default useMajorSlice.reducer