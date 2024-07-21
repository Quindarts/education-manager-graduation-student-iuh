import { ParamsType } from "@/types/axios.type"
import { User } from "@/types/entities/user"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export enum ENUM_RENDER_LECTURER {
    SEARCH_FULLNAME = "full_name",
    SEARCH_EMAIL = 'email',
    SEARCH_PHONE = 'phone',
    SEARCH_USERNAME = 'username',
    ALL = 'all'
}
export interface InitLecturerSliceType {
    me: {
        user: Required<User>,
        roles: string[],
    },
    currentRoleRender: string,
    renderUi: ENUM_RENDER_LECTURER,
    keywords: string,
    params: ParamsType,
}
const initLecturerSlice: InitLecturerSliceType = {
    me: {
        user: {
            id: '',
            username: '',
            fullName: '',
            phone: '',
            email: '',
            gender: '',
            degree: '',
            isActive: false,
            majorId: '',
            majorName: '',
        },
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
        setMe: (state: Pick<InitLecturerSliceType, 'me'>, { payload }: PayloadAction<any>) => {
            state.me = payload
        },
        setCurrentRoleRender: (state: Pick<InitLecturerSliceType, 'currentRoleRender'>, { payload }: PayloadAction<any>) => {
            state.currentRoleRender = payload
        },
        setParams: (state: Pick<InitLecturerSliceType, 'params'>, { payload }: PayloadAction<any>) => {
            state.params = payload
        },
        setTypeRender: (state: Pick<InitLecturerSliceType, 'renderUi'>, { payload }: PayloadAction<any>) => {
            state.renderUi = payload
        },
        setKeywords: (state: Pick<InitLecturerSliceType, 'keywords'>, { payload }: PayloadAction<any>) => {
            state.keywords = payload
        },
    }
})
export const { setMe, setCurrentRoleRender, setTypeRender, setParams, setKeywords } = useLecturerSlice.actions;

export default useLecturerSlice.reducer;