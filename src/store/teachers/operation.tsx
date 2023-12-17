import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

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
    return await execute(request);
  }
);

const addTeacher = createAsyncThunk(
  "teacher/addTeacher",
  async (teacher: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}teacher`,
        method: "POST",
      };
      const response = await execute(request, teacher);
      return response.data
    } catch (err: any) {
      if (!err.response) {
        throw err
      }
      return rejectWithValue(err.response.data)
    }

  }
);

const updateTeacher = createAsyncThunk(
  "teacher/updateTeacher",
  async (teacher: any) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}teacher/${teacher.id}`,
      method: "PATCH",
    };
    return await execute(request, teacher);
  }
);

const deleteTeacherById = createAsyncThunk(
  "teacher/updateTeacher",
  async (id: number) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}teacher/${id}`,
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
