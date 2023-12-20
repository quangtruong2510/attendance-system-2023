import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";
const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

const fetchDetailAttendanceStudent = createAsyncThunk(
  "student/attendancePeriod",
  async (periodClass: any) => {
    const request: Request = {
      endpoint: `${BASE_URL_API}attendance/student/${periodClass.idStudent}/${periodClass.from}/${periodClass.to}`,
      method: "GET",
    };
    return await execute(request);
  }
);

export { fetchDetailAttendanceStudent };
