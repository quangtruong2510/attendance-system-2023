import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "http://localhost:3000/";

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
    // const request: Request = { endpoint: `${BASE_URL_API}getClassByID/${arg.id}`, method: 'GET' };
    return await execute(request);
  }
);

// const addClass = createAsyncThunk(
//   "class/addClass",
//   async (class: any) => {
//     const request: Request = {
//       endpoint: `${BASE_URL_API}class`,
//       method: "POST",
//     };
//     return await execute(request, class);
//   }
// );

const updateClass = createAsyncThunk(
  "class/updateClass",
  async (arg: { id: number; payload: any }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}class/${arg.id}`,
      method: "PUT",
    };
    return await execute(request, arg.payload);
  }
);

const addClass = createAsyncThunk("class/add", async (classValue: any) => {
  const request: Request = {
    endpoint: `${BASE_URL_API}class`,
    method: "POST",
  };
  return await execute(request, classValue);
});

const deleteClassById = createAsyncThunk(
  "class/updateClass",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}class/${arg.id}`,
      method: "DELETE",
    };
    return await execute(request);
  }
);

export { fetchClasses, getClassById, addClass, updateClass, deleteClassById };
