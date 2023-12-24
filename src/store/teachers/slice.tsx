import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  addTeacher,
  deleteTeacherById,
  fetchTeacher
} from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setFilterTeacher(state, action) {
      state.data.slice(
        action.payload.current * action.payload.perPage,
        action.payload.current * action.payload.perPage + action.payload.perPage
      );
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch teacher 
    builder.addCase(fetchTeacher.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchTeacher.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      }
    );
    builder.addCase(
      fetchTeacher.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
        state.isLoading = false;
      }
    );

    //Add teacher
    builder.addCase(
      addTeacher.rejected,
      (state, action: any) => {
        state.validationErrors = action.payload.errors;
      }
    );

    //Add teacher
    builder.addCase(
      deleteTeacherById.rejected,
      (state, action: any) => {
        state.validationErrors = action.payload.errors;
      }
    );
  },
});

export const selectTeachers = (state: RootState) => state.teacher.data;
export const selectLoading = (state: RootState) => state.teacher.isLoading;
export const selectvalidationErrors = (state: RootState) =>
  state.teacher.validationErrors;

export const { clearValidationErrors } = studentSlice.actions;
export default studentSlice.reducer;
