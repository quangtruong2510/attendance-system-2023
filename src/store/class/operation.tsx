import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

// Fetch list Classes
const fetchClasses = createAsyncThunk("class/fetchClasses", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}class`,
    method: "GET",
  };
  return await execute(request);
});

// get class by id
const getClassById = createAsyncThunk(
  "class/getClass",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}class/${arg.id}`,
      method: "GET",
    };
    return await execute(request);
  }
);


const updateClass = createAsyncThunk(
  "class/updateClass",
  async (newClass: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}class/${newClass.id}`,
        method: "PATCH",
      };

      const response = await execute(request, newClass);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const addClass = createAsyncThunk("class/add", async (classValue: any, { rejectWithValue }) => {
  try {
    const request: Request = {
      endpoint: `${BASE_URL_API}class`,
      method: "POST",
    };
    const response = await execute(request, classValue);

    return response.data
  } catch (err: any) {
    if (!err.response) {
      throw err
    }
    return rejectWithValue(err.response.data)
  }
});

const deleteClassById = createAsyncThunk(
  "class/updateClass",
  async (id: number) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}class/${id}`,
      method: "DELETE",
    };
    return await execute(request);
  }
);

export { addClass, deleteClassById, fetchClasses, getClassById, updateClass };

