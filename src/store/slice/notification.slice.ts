import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitNotificationSliceType {
    paramTotalPage: number,
}
const initNotificationSlice: any = {
    paramTotalPage: 0,
}

export const useNotificationSlice = createSlice({
    name: "NotificationSlice",
    initialState: initNotificationSlice,
    reducers: {
        setParamTotalPage: (state: Pick<InitNotificationSliceType, 'paramTotalPage'>, { payload }: PayloadAction<any>) => {
            state.paramTotalPage = payload
        },
    }
})
export const { setParamTotalPage } = useNotificationSlice.actions
export default useNotificationSlice.reducer;