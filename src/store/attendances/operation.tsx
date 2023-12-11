import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

const BASE_URL_API = "http://localhost:3000/";

// Fetch list students
const fetchAttendance = createAsyncThunk("attendance/today", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}student`,
    method: "GET",
  };
  return await execute(request, "Failed to get student");
});

// get student by id
const getStudentById = createAsyncThunk(
  "student/getStudent",
  async (arg: { id: number }) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}student/${arg.id}`,
      method: "GET",
    };
    // const request: Request = { endpoint: `${BASE_URL_API}getStudentByID/${arg.id}`, method: 'GET' };
    return await execute(request, "Failed to get student");
  }
);

export { fetchAttendance, getStudentById };
