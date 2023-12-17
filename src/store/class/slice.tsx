import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import initialState from "./initialize";

import {
  addClass,
  fetchClasses
} from "./operation";

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchClasses.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
      }
    );
    builder.addCase(
      fetchClasses.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
        state.isLoading = false;
      }
    );

    builder.addCase(
      addClass.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
      }
    );
  },
});

export default studentSlice.reducer;
