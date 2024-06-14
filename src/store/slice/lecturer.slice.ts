import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initLecturerSlice: any = {
    me: {},
    currentRoleRender: '',
    params: {
        page: 1,
        limit: 10,
        totalPage: 1,
    }
}

export const useLecturerSlice = createSlice({
    name: "LecturerSlice",
    initialState: initLecturerSlice,
    reducers: {
        setMe: (state: any, { payload }: PayloadAction<any>) => {
            state.me = payload
        },
        setCurrentRoleRender: (state: any, { payload }: PayloadAction<any>) => {
            state.currentRoleRender = payload
        },
        setParams: (state: any, { payload }: PayloadAction<any>) => {
            state.params = payload
        }
    }
})
export const { setMe, setCurrentRoleRender } = useLecturerSlice.actions;

export default useLecturerSlice.reducer;