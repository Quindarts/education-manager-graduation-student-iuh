import Major from "@/types/entities/major";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface InitMajorSliceType {
    allMajor: Major[],
    currentMajor: Omit<Required<Major>, 'created_at' | 'updated_at'>;
}

const initMajorSlice: InitMajorSliceType = {
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
        setAllMajor: (state: Pick<InitMajorSliceType, 'allMajor'>, { payload }: PayloadAction<any>) => {
            state.allMajor = payload
        },
        setCurrentMajor: (state: Pick<InitMajorSliceType, 'currentMajor'>, { payload }: PayloadAction<any>) => {
            state.currentMajor = payload
        }
    }
})

export const { setAllMajor, setCurrentMajor } = useMajorSlice.actions

export default useMajorSlice.reducer