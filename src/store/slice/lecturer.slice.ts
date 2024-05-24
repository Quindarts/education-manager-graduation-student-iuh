import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initLecturerSlice: any = {
    me: {},
}

export const useLecturerSlice = createSlice({
    name: "LecturerSlice",
    initialState: initLecturerSlice,
    reducers: {
        setMe: (state: any, { payload }: PayloadAction<any>) => {
            state.me = payload
        }
    }
})
export const { setMe } = useLecturerSlice.actions;

export default useLecturerSlice.reducer;