import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://3b0c-203-205-51-20.ngrok-free.app/api/school/";

// Fetch list teachers
const fetchTeacher = createAsyncThunk("teacher/fetchTeachers", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}teacher`,
    method: "GET",
  };
  return await execute(request);
});

// get teacher by id
const getTeacherById = createAsyncThunk(
  "teacher/getTeacher",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}teacher/${arg.id}`,
      method: "GET",
    };
    // const request: Request = { endpoint: `${BASE_URL_API}getTeacherByID/${arg.id}`, method: 'GET' };
    return await execute(request);
  }
);

const addTeacher = createAsyncThunk(
  "teacher/addTeacher",
  async (teacher: any) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}teacher`,
      method: "POST",
    };
    return await execute(request, teacher);
  }
);

const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher",
  async (arg: { id: number; payload: any }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}teacher/${arg.id}`,
      method: "PUT",
    };
    return await execute(request, arg.payload);
  }
);

const deleteTeacherById = createAsyncThunk(
  "teacher/updateTeacher",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}teacher/${arg.id}`,
      method: "DELETE",
    };
    return await execute(request);
  }
);

export {
  fetchTeacher,
  getTeacherById,
  addTeacher,
  updateTeacher,
  deleteTeacherById,
};
