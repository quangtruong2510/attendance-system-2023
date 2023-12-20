import { DetailAttendanceStudent } from "../../models/attendance";

const attendanceStudent: DetailAttendanceStudent[] = [
  {
    id: 1,
    day: "20-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
  {
    id: 2,
    day: "21-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
  {
    id: 3,
    day: "22-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
  {
    id: 4,
    day: "23-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
  {
    id: 5,
    day: "24-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
  {
    id: 6,
    day: "25-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
  {
    id: 7,
    day: "26-12-2023",
    timeCheckIn: "17:35:00 ",
    timeCheckOut: "17:35:00 ",
    status: 3,
    note: "",
  },
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
  selectedStudent: DetailAttendanceStudent | null;
  isLoading: boolean;
  validationErrors: any;
}

const initialState: State = {
  data: attendanceStudent,
  selectedStudent: initAttendanceStudent,
  nameStudent: "Nguyễn Quang Trường",
  isLoading: false,
  validationErrors: null,
};

export default initialState;
