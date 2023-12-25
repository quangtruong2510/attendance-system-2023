import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";
const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

const fetchAttendanceClass = createAsyncThunk(
  "attendance/today",
  async (id: number) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}attendance/${id}`,
      method: "GET",
    };
    return await execute(request);
  }
);

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

// const updateAttendanceStudent = createAsyncThunk(
//   "attendance/updateAttendance",
//   async (attendance: any) => {
//     const request: Request = {
//       endpoint: `${BASE_URL_API}attendance/student/${attendance.id}`,
//       method: "PATCH",
//     };
//     return await execute(request);
//   }
// );

const updateAttendanceStudent = createAsyncThunk(
  "attendance/updateAttendance",
  async (attendance: any, { rejectWithValue }) => {
    try {
      const request: Request = {
        endpoint: `${BASE_URL_API}attendance_update/${attendance.id}`,
        method: "PATCH",
      };

      const response = await execute(request, attendance);
      return response.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response.data);
    }
  }
);

export { fetchAttendanceClass, getStudentById, updateAttendanceStudent };
