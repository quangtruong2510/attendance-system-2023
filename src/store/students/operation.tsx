import { createAsyncThunk } from '@reduxjs/toolkit';
import { execute, Request } from '../../utils/request';

// const BASE_URL_API = process.env.REACT_APP_BASE_URL_API;

const BASE_URL_API = 'http://localhost:3000/';

// Fetch list students
const fetchStudents = createAsyncThunk('student/fechthStudents', async () => {
  const request: Request = { endpoint: `${BASE_URL_API}student`, method: 'GET' };
  return await execute(request, 'Failed to get student');
});

// get student by id
const getStudentById = createAsyncThunk('student/getStudent', async (arg: { id: number }) => {
  const request: Request = { endpoint: `${BASE_URL_API}student/${arg.id}`, method: 'GET' };
  // const request: Request = { endpoint: `${BASE_URL_API}getStudentByID/${arg.id}`, method: 'GET' };
  return await execute(request, 'Failed to get student');
});

const addStudent = createAsyncThunk('student/addStudent', async (student: any) => {
  const request: Request = { endpoint: `${BASE_URL_API}student`, method: 'POST' };
  return await execute(request, 'Failed to get student', student);
});

const updateStudent = createAsyncThunk(
  'student/updateStudent',
  async (arg: { id: number; payload: any }) => {
    const request: Request = { endpoint: `${BASE_URL_API}student/${arg.id}`, method: 'PUT' };
    return await execute(request, 'Failed to update student', arg.payload);
  }
);

const deleteStudentById = createAsyncThunk('student/updateStudent', async (arg: { id: number }) => {
  const request: Request = { endpoint: `${BASE_URL_API}student/${arg.id}`, method: 'DELETE' };
  return await execute(request, 'Failed to delete student');
});

export { fetchStudents, getStudentById, addStudent, updateStudent, deleteStudentById };
