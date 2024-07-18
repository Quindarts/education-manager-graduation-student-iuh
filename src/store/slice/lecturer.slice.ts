import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ENUM_RENDER_LECTURER {
    SEARCH_FULLNAME = "full_name",
    SEARCH_EMAIL = 'email',
    SEARCH_PHONE = 'phone',
    SEARCH_USERNAME = 'username',
    ALL = 'all'
}

const initLecturerSlice: any = {
    me: {
        user: {},
        roles: []
    },
    currentRoleRender: '',
    renderUi: ENUM_RENDER_LECTURER.ALL,
    keywords: '',
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
        },
        setTypeRender: (state: any, { payload }: PayloadAction<any>) => {
            state.renderUi = payload
        },
        setKeywords: (state: any, { payload }: PayloadAction<any>) => {
            state.keywords = payload
        },
    }
})
export const { setMe, setCurrentRoleRender, setTypeRender, setParams, setKeywords } = useLecturerSlice.actions;

export default useLecturerSlice.reducer;