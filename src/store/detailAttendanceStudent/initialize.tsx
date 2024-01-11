import { DetailAttendanceStudent } from "../../models/attendance";

const attendanceStudent: DetailAttendanceStudent[] = [
];

export const initAttendanceStudent: DetailAttendanceStudent = {
  id: 7,
  day: "26-12-2023",
  timeCheckIn: "17:35:00 ",
  timeCheckOut: "17:35:00 ",
  status: 3,
  note: "",
};

interface State {
  nameStudent: string;
  data: DetailAttendanceStudent[];
  currentData: DetailAttendanceStudent[];
  selectedStudent: DetailAttendanceStudent | null;
  isLoading: boolean;
  validationErrors: any;
}

const initialState: State = {
  data: attendanceStudent,
  currentData: attendanceStudent,
  selectedStudent: initAttendanceStudent,
  nameStudent: "Nguyễn Quang Trường",
  isLoading: false,
  validationErrors: null,
};

export default initialState;
