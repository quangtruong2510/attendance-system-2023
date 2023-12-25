import { createAsyncThunk } from "@reduxjs/toolkit";
// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://attendance.ily1606.space";

const loginUser = createAsyncThunk("auth/login", async (user: any) => {
  try {
    const response = await fetch(`${BASE_URL_API}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    if (!response.ok) {
      return Promise.reject(data.error || "Mật khẩu hoặc tài khoản không chính xác");
    } else {
      localStorage.setItem('token', data.data.token);
    }

    return data;
  } catch (error) {
    return ('An error occurred during login');
  }
});

const checkAuth = createAsyncThunk("auth/verifyToken", async (token: any) => {
  try {
    const response = await fetch(`${BASE_URL_API}verifyToken`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });
    let data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data.access_token);
      return data;
    }
    return data.errors;
  } catch (error) {
    throw new Error("Invalid token");
  }
});

export { checkAuth, loginUser };
