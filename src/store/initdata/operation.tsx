import { createAsyncThunk } from "@reduxjs/toolkit";
import { execute, Request } from "../../utils/request";

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = "https://attendance.ily1606.space/api/school/";

const fetchGradeList = createAsyncThunk("grade/fetchGrades", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}grade`,
    method: "GET",
  };
  return await execute(request);
});

const fetchUnAssignTeacherList = createAsyncThunk("teacher/unAssigned", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}teacher/unassigned`,
    method: "GET",
  };
  return await execute(request);
});

const fetchClassSelection = createAsyncThunk("classes", async () => {
  const request: Request = {
    endpoint: `${BASE_URL_API}class/selection`,
    method: "GET",
  };
  return await execute(request);
});


export { fetchUnAssignTeacherList, fetchGradeList, fetchClassSelection };
