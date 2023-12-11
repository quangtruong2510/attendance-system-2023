import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";

import { fetchAttendance } from "./operation";
import { AttendanceStudent } from "../../models/attendance";

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
    // Start fetchAttendance requestc
    builder.addCase(fetchAttendance.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(
      fetchAttendance.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.attendanceClasses = action.payload.data;
      }
    );
    // Request fail
    builder.addCase(
      fetchAttendance.rejected,
      (state, action: PayloadAction<any>) => {
        // We show the error message
        state.errorMessage = action.payload.errors;
        state.isLoading = false;
      }
    );
  },
});

export const selectedStudent = (state: RootState) =>
  state.attendance.attendanceClass.selectedStudent;
export const selectLoading = (state: RootState) => state.students.isLoading;
export const selectErrorMessage = (state: RootState) =>
  state.students.errorMessage;

export const { setSelectedStudent } = attendanceSlice.actions;
export default attendanceSlice.reducer;
