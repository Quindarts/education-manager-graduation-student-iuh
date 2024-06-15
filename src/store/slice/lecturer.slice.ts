import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ENUM_RENDER_LECTURER {
    SEARCH = "SEARCH",
    FILTER = 'FILTER',
    ALL = 'ALL'
}
const initLecturerSlice: any = {
    me: {},
    currentRoleRender: '',
    renderUi: ENUM_RENDER_LECTURER.ALL,
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
            console.log("🚀 ~ payload:", payload)
            state.params = payload
        },
        setTypeRender: (state: any, { payload }: PayloadAction<any>) => {
            state.renderUi = payload
        }
    }
})
export const { setMe, setCurrentRoleRender, setTypeRender, setParams } = useLecturerSlice.actions;

export default useLecturerSlice.reducer;