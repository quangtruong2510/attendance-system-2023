import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";

import initialState from "./initialize";
import { fetchPeriodAttendanceClass } from "./operation";

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<number>) => {
      state.selectedStudent =
        state.data.find((student) => student.id === action.payload) ?? null;
    },
    setFilterPeriodAttendanceClasses(state, action) {
      state.currentData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPeriodAttendanceClass.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchPeriodAttendanceClass.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentData = action.payload.data;
      }
    );
    builder.addCase(fetchPeriodAttendanceClass.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectLoading = (state: RootState) => state.attendance.isLoading;

export const { setSelectedStudent, setFilterPeriodAttendanceClasses } = attendanceSlice.actions;
export default attendanceSlice.reducer;
