import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../configstore";

import initialState from "./initialize";
import { fetchAttendanceClass, updateAttendanceStudent } from "./operation";

export const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<number>) => {
      state.selectedStudent =
        state.data.find((student) => student.id === action.payload) ?? null;
    },
    setFilterAttendanceClasse(state, action) {
      state.curentData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAttendanceClass.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchAttendanceClass.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.curentData = action.payload.data;
        console.log("Payload", action.payload.data);
      }
    );
    builder.addCase(fetchAttendanceClass.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(
      updateAttendanceStudent.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
        state.isLoading = false;
      }
    );
  },
});

export const selectLoading = (state: RootState) => state.attendance.isLoading;

export const { setSelectedStudent, setFilterAttendanceClasse } = attendanceSlice.actions;
export default attendanceSlice.reducer;
