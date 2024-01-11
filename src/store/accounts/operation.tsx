import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";
const BASE_URL_API = "https://attendance.ily1606.space/api/";

// Fetch list accounts
const fetchAccounts = createAsyncThunk("account/fetch", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}account`,
    method: "GET",
  };
  return await execute(request);
});


const addAccount = createAsyncThunk(
  "account/add",
  async (account: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}account`,
        method: "POST",
      };
      const response = await execute(request, account);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const updateAccount = createAsyncThunk(
  "account/update",
  async (account: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}account/${account.id}`,
        method: "PATCH",
      };

      const response = await execute(request, account);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const deleteAccountById = createAsyncThunk(
  "account/delete",
  async (id: number) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}account/${id}`,
      method: "DELETE",
    };
    return await execute(request);
  }
);

export { fetchAccounts, addAccount, updateAccount, deleteAccountById };
