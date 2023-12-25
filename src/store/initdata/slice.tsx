import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialize";

import {
  fetchUnAssignTeacherList,
  fetchGradeList,
  fetchClassSelection,
} from "./operation";

export const initialSlice = createSlice({
  name: "initial",
  initialState,
  reducers: {
    filterClassesByGrade: (state, action) => {
      state.selectedClasses = state.classSelectionList.filter(
        (classOption) => classOption.gradeId === action.payload
      );
    },
    initializeClassState: (state) => {
      state.selectedClasses = state.classSelectionList;
    },
  },
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
        state.selectedClasses = action.payload.data;
      }
    );
  },
});

export const { filterClassesByGrade, initializeClassState } =
  initialSlice.actions;
export default initialSlice.reducer;
