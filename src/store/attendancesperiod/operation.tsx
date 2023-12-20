import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";
const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

const fetchPeriodAttendanceClass = createAsyncThunk(
  "class/attendancePeriod",
  async (periodClass: any) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}attendance/${periodClass.idClass}/${periodClass.from}/${periodClass.to}`,
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
      endpoint: `${BASE_URL_API}attendance/${attendance.id}`,
      method: "PATCH",
    };
    return await execute(request);
  }
);

export { fetchPeriodAttendanceClass, getStudentById, updateAttendanceStudent };
