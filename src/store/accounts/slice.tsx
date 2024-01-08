import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import initialState from "./initialize";

import {
  addAccount,
  deleteAccountById,
  fetchAccounts,
  updateAccount
} from "./operation";

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setFilterAccount(state, action) {
      state.currentData = action.payload;
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccounts.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(
      fetchAccounts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.currentData = action.payload.data;
      }
    );
    builder.addCase(
      fetchAccounts.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
        state.isLoading = false;
      }
    );

    builder.addCase(
      addAccount.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
      }
    );

    builder.addCase(
      updateAccount.rejected,
      (state, action: PayloadAction<any>) => {
        state.validationErrors = action.payload.errors;
      }
    );

    builder.addCase(deleteAccountById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAccountById.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setFilterAccount, clearValidationErrors } = accountSlice.actions;
export default accountSlice.reducer;
