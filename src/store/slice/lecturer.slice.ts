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
    paramTotalPage: {
        lecturerTerm: number,
        lecturerMajor: number,
    },
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
    currentRoleRender: "",
    paramTotalPage: {
        lecturerTerm: 0,
        lecturerMajor: 0
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
        setParamTotalPageLectuerTerm: (state: Pick<InitLecturerSliceType, 'paramTotalPage'>, { payload }: PayloadAction<any>) => {
            state.paramTotalPage.lecturerTerm = payload
        },
        setParamTotalPageLectuerMajor: (state: Pick<InitLecturerSliceType, 'paramTotalPage'>, { payload }: PayloadAction<any>) => {
            state.paramTotalPage.lecturerMajor = payload
        },
    }
})
export const { setMe, setCurrentRoleRender, setParamTotalPageLectuerTerm, setParamTotalPageLectuerMajor } = useLecturerSlice.actions;

export default useLecturerSlice.reducer;