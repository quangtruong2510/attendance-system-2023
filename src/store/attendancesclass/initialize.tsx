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
  // {
  //   id: 1,
  //   name: "Nguyen Van A",
  //   timeCheckIn: "11/12/2023 07:55:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 1,
  //   note: "-",
  // },
  // {
  //   id: 2,
  //   name: "Nguyen Van B",
  //   timeCheckIn: "-",
  //   timeCheckOut: "-",
  //   status: 2,
  //   note: "Ốm",
  // },
  // {
  //   id: 3,
  //   name: "Nguyen Van C",
  //   timeCheckIn: "-",
  //   timeCheckOut: "-",
  //   status: 3,
  //   note: "-",
  // },
  // {
  //   id: 4,
  //   name: "Nguyen Van D",
  //   timeCheckIn: "11/12/2023 08:55:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 4,
  //   note: "-",
  // },
  // {
  //   id: 5,
  //   name: "Nguyen Van E",
  //   timeCheckIn: "11/12/2023 08:30:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 4,
  //   note: "-",
  // },
  // {
  //   id: 6,
  //   name: "Nguyen Van F",
  //   timeCheckIn: "11/12/2023 08:00:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 1,
  //   note: "-",
  // },
  // {
  //   id: 7,
  //   name: "Nguyen Van D",
  //   timeCheckIn: "11/12/2023 08:55:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 4,
  //   note: "-",
  // },
  // {
  //   id: 8,
  //   name: "Nguyen Van E",
  //   timeCheckIn: "11/12/2023 08:30:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 4,
  //   note: "-",
  // },
  // {
  //   id: 9,
  //   name: "Nguyen Van F",
  //   timeCheckIn: "11/12/2023 08:00:00",
  //   timeCheckOut: "11/12/2023 17:05:00",
  //   status: 1,
  //   note: "-",
  // },
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
  nameClass: string;
  data: AttendanceStudent[];
  selectedStudent: AttendanceStudent | null;
  isLoading: boolean,
  validationErrors: any,
}

const initialState: State = {
  data: attendanceStudent,
  selectedStudent: initSelectedStudent,
  nameClass: "6A1",
  isLoading: false,
  validationErrors: null,
};

export default initialState;
