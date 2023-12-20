import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import {
  fetchStatisticsAttendance,
  updateAttendanceStudent,
} from "./operation";

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<number>) => {
      state.attendanceClass.selectedStudent =
        state.attendanceClass.attendanceStudent.find(
          (student) => student.id === action.payload
        ) ?? null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStatisticsAttendance.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchStatisticsAttendance.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.attendanceClasses = action.payload.data;
      }
    );
    builder.addCase(fetchStatisticsAttendance.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(
      updateAttendanceStudent.rejected,
      (state, action: PayloadAction<any>) => {
        state.errorMessage = action.payload.errors;
        state.isLoading = false;
      }
    );
  },
});

export const selectLoading = (state: RootState) => state.attendance.isLoading;

export const { setSelectedStudent } = attendanceSlice.actions;
export default attendanceSlice.reducer;
