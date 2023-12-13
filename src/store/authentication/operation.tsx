import { createAsyncThunk } from "@reduxjs/toolkit";
// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://3b0c-203-205-51-20.ngrok-free.app";

const loginUser = createAsyncThunk("auth/login", async (user: any) => {
  console.log("Userrr", user);
  try {
    const response = await fetch(`${BASE_URL_API}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    let data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      return data;
    }

    return data.errors;
  } catch (error) {
    throw new Error("Invalid email or password");
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

