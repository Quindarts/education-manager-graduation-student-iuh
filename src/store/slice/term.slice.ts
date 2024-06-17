import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initTermSlice: any = {
    currentTerm: {},
    allTerm: {},
    partCurrentTerm: {
        isInTerm: true,
        isChooseGroup: true,
        isChChooseTopic: true,
        isDiscussion: true,
        isReport: true,
        isPublicResult: true
    }
}
const checkedValidDistanceDate = (startDate: string, endDate: string) => {
    return dayjs(endDate) >= dayjs()
}
export const useTermSlice = createSlice({
    name: "TermSlice",
    initialState: initTermSlice,
    reducers: {
        setCurrentTerm: (state: any, { payload }: PayloadAction<any>) => {
            state.currentTerm = payload
            state.partCurrentTerm.isInTerm = checkedValidDistanceDate(payload.startDate, payload.endDate)
            state.partCurrentTerm.isChooseGroup = checkedValidDistanceDate(payload.startChooseGroupDate, payload.endChooseGroupDate)
            state.partCurrentTerm.isChChooseTopic = checkedValidDistanceDate(payload.startChooseTopicDate, payload.endChooseTopicDate)
            state.partCurrentTerm.isDiscussion = checkedValidDistanceDate(payload.startDiscussionDate, payload.endDiscussionDate)
            state.partCurrentTerm.isReport = checkedValidDistanceDate(payload.startReportDate, payload.endReportDate)
            state.partCurrentTerm.isPublicResult = checkedValidDistanceDate(payload.startPublicResultDate, payload.endPublicResultDate)

        },
        setAllTerm: (state: any, { payload }: PayloadAction<any>) => {
            state.allTerm = payload
        }
    }
})

export const { setCurrentTerm, setAllTerm } = useTermSlice.actions

export default useTermSlice.reducer