import { Term } from "@/types/entities/term";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export interface InitTermSliceType {
    currentTerm: Required<Term>,
    allTerm: Partial<Term[]>,
    partCurrentTerm: {
        isInTerm: boolean,
        isChooseGroup: boolean,
        isPublicTopic: boolean,
        isChooseTopic: boolean,
        isDiscussion: boolean,
        isReport: boolean,
        isPublicResult: boolean
    }
}

const initTermSlice: InitTermSliceType = {
    currentTerm: {
        id: '',
        key: '',
        createdAt: '',
        dateDiscussion: '',
        dateReport: '',
        majorId: '',
        endDate: '',
        endDateChooseTopic: '',
        endDateSubmitTopic: '',
        name: '',
        startDate: '',
        startDateChooseTopic: '',
        startDateSubmitTopic: '',
        startPublicTopicDate: '',
        endPublicTopicDate: '',
        updatedAt: '',
        startDateDiscussion: '',
        endDateDiscussion: '',
        startDateReport: '',
        endDateReport: '',
    },
    allTerm: [],
    partCurrentTerm: {
        isInTerm: false,
        isChooseGroup: false,
        isPublicTopic: false,
        isChooseTopic: false,
        isDiscussion: false,
        isReport: false,
        isPublicResult: false
    }
}
const checkedValidDistanceDate = (endDate: string) => {
    return dayjs(endDate) >= dayjs()
}
export const useTermSlice = createSlice({
    name: "TermSlice",
    initialState: initTermSlice,
    reducers: {
        setCurrentTerm: (state: Omit<InitTermSliceType, 'allTerm'>, { payload }: PayloadAction<any>) => {
            state.currentTerm = payload
            state.partCurrentTerm.isInTerm = checkedValidDistanceDate(payload.endDate)
            state.partCurrentTerm.isChooseGroup = checkedValidDistanceDate(payload.endChooseGroupDate)
            state.partCurrentTerm.isPublicTopic = checkedValidDistanceDate(payload.endPublicTopicDate)
            state.partCurrentTerm.isChooseTopic = checkedValidDistanceDate(payload.endChooseTopicDate)
            state.partCurrentTerm.isDiscussion = checkedValidDistanceDate(payload.endDiscussionDate)
            state.partCurrentTerm.isReport = checkedValidDistanceDate(payload.endReportDate)
            state.partCurrentTerm.isPublicResult = checkedValidDistanceDate(payload.endPublicResultDate)
        },
        setAllTerm: (state: Pick<InitTermSliceType, 'allTerm'>, { payload }: PayloadAction<any>) => {
            state.allTerm = payload
        }
    }
})

export const { setCurrentTerm, setAllTerm } = useTermSlice.actions

export default useTermSlice.reducer