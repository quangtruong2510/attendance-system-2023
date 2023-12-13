import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  addClass,
  deleteClassById,
  fetchClasses,
  getClassById,
} from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Start fetchClasss request
    builder.addCase(fetchClasses.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      fetchClasses.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      fetchClasses.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload.errors;
        state.isLoading = false;
      }
    );

    builder.addCase(getClassById.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      getClassById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.selectedClass = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      getClassById.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload.data;
        state.isLoading = false;
      }
    );

    builder.addCase(addClass.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(addClass.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
    });

    // Request fail
    builder.addCase(addClass.rejected, (state, action: PayloadAction<any>) => {
      // We show the error message
      state.errorMessage = action.payload;
      state.isLoading = false;
    });

    builder.addCase(deleteClassById.pending, (state) => {
      state.isLoading = true;
    });

    //
    // Request successful
    // builder.addCase(updateClass.fulfilled, (state, action: PayloadAction<any>) => {
    //   state.isLoading = false;
    //   state.data = action.payload.data;
    // });

    // // Request fail
    // builder.addCase(updateClass.rejected, (state, action: PayloadAction<any>) => {
    //   state.errorMessage = action.payload.errors;
    //   state.isLoading = false;
    // });

    // builder.addCase(updateClass.pending, (state) => {
    //   state.isLoading = true;
    // });

    // Request successful
    builder.addCase(
      deleteClassById.fulfilled,
      (state) => {
        state.isLoading = false;
      }
    );

    // Request fail
    builder.addCase(
      deleteClassById.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const selectClasss = (state: RootState) => state.students.data;
export const selectLoading = (state: RootState) => state.students.isLoading;
export const selectErrorMessage = (state: RootState) =>
  state.students.errorMessage;

export default studentSlice.reducer;
