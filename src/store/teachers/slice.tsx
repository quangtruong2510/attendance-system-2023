import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import { addTeacher, deleteTeacherById, fetchTeacher } from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setFilterTeacher(state, action) {
      state.currentData = action.payload;
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
        state.currentData = action.payload.data;
      }
    );
    builder.addCase(
      fetchTeacher.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
        state.isLoading = false;
      }
    );

    builder.addCase(addTeacher.rejected, (state, action: any) => {
      state.validationErrors = action.payload.errors;
    });

    builder.addCase(deleteTeacherById.rejected, (state, action: any) => {
      state.validationErrors = action.payload.errors;
    });
  },
});

export const selectTeachers = (state: RootState) => state.teacher.data;
export const selectLoading = (state: RootState) => state.teacher.isLoading;
export const selectvalidationErrors = (state: RootState) =>
  state.teacher.validationErrors;

export const { clearValidationErrors, setFilterTeacher } = studentSlice.actions;
export default studentSlice.reducer;
