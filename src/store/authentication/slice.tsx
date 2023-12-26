import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../configstore";
import initialState from "./initialize";
import { checkAuth, loginUser } from "./operation";
import { Roles } from "../../utils/role";

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.role = action.payload.data.role;
      if (action.payload.data.role === Roles.TEACHER) {
        state.name = action.payload.data.teacherName
        state.classId = action.payload.data.classId
        state.className = action.payload.data.className
      }
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // verify token
    builder.addCase(checkAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    });
  },
});

export const selectLoading = (state: RootState) => state.authentication.loading;
export const selectErrorMessage = (state: RootState) =>
  state.authentication.error;
export const selectAuthenticated = (state: RootState) =>
  state.authentication.isAuthenticated;
export const selectRole = (state: RootState) => state.authentication.role;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
