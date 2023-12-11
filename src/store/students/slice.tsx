import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  addStudent,
  deleteStudentById,
  fetchStudents,
  getStudentById,
} from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setFilterStudent(state, action) {
      state.data.slice(
        action.payload.current * action.payload.perPage,
        action.payload.current * action.payload.perPage + action.payload.perPage
      );
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
        state.data = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      fetchStudents.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload.errors;
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
        state.errorMessage = action.payload.data;
        state.isLoading = false;
      }
    );

    builder.addCase(addStudent.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      addStudent.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );

    // Request fail
    builder.addCase(
      addStudent.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload;
        state.isLoading = false;
      }
    );

    builder.addCase(deleteStudentById.pending, (state) => {
      state.isLoading = true;
    });

    //
    // Request successful
    // builder.addCase(updateStudent.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.isLoading = false;
    //   state.data = action.payload.data;
    // });

    // // Request fail
    // builder.addCase(updateStudent.rejected, (state, action: PayloadAction<any>) => {
    //   state.errorMessage = action.payload.errors;
    //   state.isLoading = false;
    // });

    // builder.addCase(updateStudent.pending, (state) => {
    //   state.isLoading = true;
    // });

    // Request successful
    builder.addCase(
      deleteStudentById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
      }
    );

    // Request fail
    builder.addCase(
      deleteStudentById.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const selectStudents = (state: RootState) => state.students.data;
export const selectLoading = (state: RootState) => state.students.isLoading;
export const selectErrorMessage = (state: RootState) =>
  state.students.errorMessage;

export const { setFilterStudent } = studentSlice.actions;
export default studentSlice.reducer;
