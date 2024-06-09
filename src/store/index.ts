import { configureStore } from "@reduxjs/toolkit";
import useLecturerReducer from "./slice/lecturer.slice";
import useTermSliceReducer from "./slice/term.slice";
import useMajorSliceReducer from "./slice/major.slice";

export const store = configureStore({
    reducer: {
        lecturerSlice: useLecturerReducer,
        majorSlice: useMajorSliceReducer,
        termSlice: useTermSliceReducer
    },
});



export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;