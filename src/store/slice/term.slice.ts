import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initTermSlice: any = {
    currentTerm: {},
    allTerm: {},

}

export const useTermSlice = createSlice({
    name: "TermSlice",
    initialState: initTermSlice,
    reducers: {
        setCurrentTerm: (state: any, { payload }: PayloadAction<any>) => {
            state.currentTerm = payload
        },
        setAllTerm: (state: any, { payload }: PayloadAction<any>) => {
            state.allTerm = payload
        }
    }
})

export const { setCurrentTerm, setAllTerm } = useTermSlice.actions

export default useTermSlice.reducer