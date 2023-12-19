import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialize";

import {
  fetchUnAssignTeacherList,
  fetchGradeList,
  fetchClassSelection,
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
    builder.addCase(
      fetchClassSelection.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.classSelectionList = action.payload.data;
      }
    );
  },
});

export default studentSlice.reducer;
