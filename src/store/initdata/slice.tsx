import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  fetchUnAssignTeacherList,
  fetchGradeList,
} from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchUnAssignTeacherList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.unAssignedTeachers = action.payload.data;
      }
    );
    builder.addCase(
      fetchGradeList.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.gradeList = action.payload.data;
      }
    );
  },
});

export const unAssignedTeacherList = (state: RootState) => state.students.data;
export const gradeList = (state: RootState) => state.students.isLoading;

export default studentSlice.reducer;
