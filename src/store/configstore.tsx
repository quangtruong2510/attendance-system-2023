import { configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useSelector as rawUseSelector,
} from "react-redux";
import { combineReducers } from "redux";
import studentsReducer from "./students/slice";
import pagination from "./common/pagination";
import authenticationReducer from "./authentication/slice";
import DashboardReducer from "./dashboard/slice";
import AttendanceReducer from "./attendances/slice";
import TeacherReducer from "./teachers/slice";
import ClassReducer from "./class/slice";
import initialReducer from "./initdata/slice";

const reducer = combineReducers({
  students: studentsReducer,
  pagination: pagination,
  authentication: authenticationReducer,
  dashBoard: DashboardReducer,
  attendance: AttendanceReducer,
  teacher: TeacherReducer,
  class: ClassReducer,
  initial: initialReducer,
});

const store = configureStore({ reducer });
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export type AppDispatch = typeof store.dispatch;
export default store;
