import { configureStore } from "@reduxjs/toolkit";
import useLecturerReducer from "./slice/lecturer.slice";
import useTermSliceReducer from "./slice/term.slice";
import useMajorSliceReducer from "./slice/major.slice";
import useGroupStudentSlice from "./slice/groupStudent.slice";
import useStudentSlice from "./slice/student.slice";
import useTopicSlice from "./slice/topic.slice";
import useSidebarSlice from "./slice/sidebar.slice";
import { Store } from '@reduxjs/toolkit';

export const store: Store = configureStore({
    reducer: {
        lecturerSlice: useLecturerReducer,
        majorSlice: useMajorSliceReducer,
        termSlice: useTermSliceReducer,
        groupStudentSlice: useGroupStudentSlice,
        studentSlice: useStudentSlice,
        topicSlice: useTopicSlice,
        sidebarSlice: useSidebarSlice
    },
});



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;