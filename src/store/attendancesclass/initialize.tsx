import { AttendanceReport, AttendanceStudent } from "../../models/attendance";

export const initAttendance: AttendanceReport = {
  id: 0,
  grade: "",
  class: "",
  quantity: 0,
  present: 0,
  absenceWithPermission: 0,
  absenceWithoutPermission: 0,
  late: 0,
  homeroomTeacher: "",
};

const attendanceStudent: AttendanceStudent[] = [
];

export const initSelectedStudent: AttendanceStudent = {
  id: 0,
  name: "",
  timeCheckIn: "",
  timeCheckOut: "",
  status: 3,
  note: "",
};

interface State {
  data: AttendanceStudent[];
  currentData: AttendanceStudent[];
  selectedStudent: AttendanceStudent | null;
  isLoading: boolean,
  validationErrors: any,
}

const initialState: State = {
  data: attendanceStudent,
  currentData: attendanceStudent,
  selectedStudent: initSelectedStudent,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
