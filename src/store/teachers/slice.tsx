import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  addTeacher,
  deleteTeacherById,
  fetchTeacher,
  getTeacherById,
  updateTeacher,
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
  },
  extraReducers: (builder) => {
    // Start fetchTeacher request
    builder.addCase(fetchTeacher.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      fetchTeacher.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      fetchTeacher.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload.errors;
        state.isLoading = false;
      }
    );

    builder.addCase(getTeacherById.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      getTeacherById.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.selectedTeacher = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      getTeacherById.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload.data;
        state.isLoading = false;
      }
    );

    builder.addCase(addTeacher.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      addTeacher.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      }
    );

    // Request fail
    builder.addCase(
      addTeacher.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload;
        state.isLoading = false;
      }
    );

    builder.addCase(deleteTeacherById.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      updateTeacher.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      }
    );

    // Request fail
    // builder.addCase(
    //   updateTeacher.rejected,
    //   (state, action: PayloadAction<any>) => {
    //     state.errorMessage = action.payload.errors;
    //     state.isLoading = false;
    //   }
    // );

    // builder.addCase(updateTeacher.pending, (state) => {
    //   state.isLoading = true;
    // });

    // // Request successful
    // builder.addCase(
    //   deleteTeacherById.fulfilled,
    //   (state, action: PayloadAction<any>) => {
    //     state.isLoading = false;
    //   }
    // );

    // Request fail
    builder.addCase(
      deleteTeacherById.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload;
        state.isLoading = false;
      }
    );
  },
});

export const selectTeachers = (state: RootState) => state.students.data;
export const selectLoading = (state: RootState) => state.students.isLoading;
export const selectErrorMessage = (state: RootState) =>
  state.students.errorMessage;

export const { setFilterTeacher } = studentSlice.actions;
export default studentSlice.reducer;
