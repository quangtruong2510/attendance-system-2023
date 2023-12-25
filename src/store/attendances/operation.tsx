import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";
const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

// Fetch list students
const fetchStatisticsAttendance = createAsyncThunk("attendance/today", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}statistics/`,
    method: "GET",
  };
  return await execute(request);
});

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

const fetchAttendanceClassPeriod = createAsyncThunk(
  "search/today",
  async (period: any) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}search_statistic?from_date=${period.from}&to_date=${period.to}`,
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

const updateAttendanceStudent = createAsyncThunk(
  "attendance/updateAttendance",
  async (attendance: any) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}attendance_update/${attendance.id}`,
      method: "PATCH",
    };
    return await execute(request, attendance);
  }
);

export { fetchStatisticsAttendance, fetchAttendanceClass, getStudentById, updateAttendanceStudent, fetchAttendanceClassPeriod };
