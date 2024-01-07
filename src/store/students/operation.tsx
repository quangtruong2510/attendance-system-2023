import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

// Fetch list students
const fetchStudents = createAsyncThunk("student/fechthStudents", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}student`,
    method: "GET",
  };
  return await execute(request);
});

// get student by id
const getStudentById = createAsyncThunk(
  "student/getStudent",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}student/${arg.id}`,
      method: "GET",
    };
    return await execute(request);
  }
);

// get student by id
const getStudentByClassId = createAsyncThunk(
  "student/getStudent",
  async (idClass: number) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}student/class/${idClass}`,
      method: "GET",
    };
    return await execute(request);
  }
);

const addStudent = createAsyncThunk(
  "student/addStudent",
  async (student: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}student`,
        method: "POST",
      };
      const response = await execute(request, student);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (student: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}student/${student.id}`,
        method: "PATCH",
      };

      const response = await execute(request, student);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

const deleteStudentById = createAsyncThunk(
  "student/updateStudent",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}student/${arg.id}`,
      method: "DELETE",
    };
    return await execute(request);
  }
);

export {
  fetchStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudentById,
  getStudentByClassId,
};
