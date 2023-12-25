import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  addStudent,
  deleteStudentById,
  fetchStudents,
  getStudentById,
  updateStudent
} from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setFilterStudent(state, action) {
      state.currentData = action.payload;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    // Start fetchStudents request
    builder.addCase(fetchStudents.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      fetchStudents.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        console.log("aaaaaaaaaaaaaa", action.payload.data);
        state.data = action.payload.data;
        state.currentData = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      fetchStudents.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.validationErrors = action.payload.errors;
        state.isLoading = false;
      }
    );

    builder.addCase(getStudentById.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      getStudentById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.selectedStudent = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      getStudentById.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.validationErrors = action.payload.data;
        state.isLoading = false;
      }
    );

    // Request fail
    builder.addCase(
      addStudent.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
      }
    );

    builder.addCase(
      updateStudent.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
      }
    );

    builder.addCase(deleteStudentById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteStudentById.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectStudents = (state: RootState) => state.students.data;
export const selectLoading = (state: RootState) => state.students.isLoading;
export const selectErrorMessage = (state: RootState) =>
  state.students.validationErrors;

export const { setFilterStudent, clearValidationErrors } = studentSlice.actions;
export default studentSlice.reducer;
