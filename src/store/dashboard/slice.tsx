import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import { fetchStudents } from "./operation";

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
  },
});

export const selectStudents = (state: RootState) => state.students.data;
export const selectLoading = (state: RootState) => state.students.isLoading;

export const { setFilterStudent } = studentSlice.actions;
export default studentSlice.reducer;
