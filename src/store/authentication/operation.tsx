import { createAsyncThunk } from "@reduxjs/toolkit";
import { Request, execute } from "../../utils/request";
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

const checkAuth = createAsyncThunk("auth/me", async (token: any) => {
  const request: Request = {
    endpoint: `${BASE_URL_API}/api/me?token=${token}`,
    method: "GET",
  };
  return await execute(request);
});

export { checkAuth, loginUser };
