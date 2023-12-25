import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";

import initialState from "./initialize";
import { fetchDetailAttendanceStudent } from "./operation";

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<number>) => {
      state.selectedStudent =
        state.data.find((student) => student.id === action.payload) ?? null;
    },
    setFilterDetailAttendanceStudent(state, action) {
      state.currentData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDetailAttendanceStudent.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchDetailAttendanceStudent.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentData = action.payload.data;
        state.nameStudent = action.payload.nameStudent;
      }
    );
    builder.addCase(fetchDetailAttendanceStudent.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const selectLoading = (state: RootState) => state.attendance.isLoading;

export const { setSelectedStudent, setFilterDetailAttendanceStudent } = attendanceSlice.actions;
export default attendanceSlice.reducer;
