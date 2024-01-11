import { AttendanceClassPeriod } from "../../models/attendance";

const attendanceStudent: AttendanceClassPeriod[] = [
];

export const initSelectedStudent: AttendanceClassPeriod = {
  id: 0,
  name: "",
  phone: "",
  address: "",
  present: 0,
  absenceWithPermission: 0,
  absenceWithoutPermission: 0,
  late: 0,
};

interface State {
  nameClass: string;
  data: AttendanceClassPeriod[];
  currentData: AttendanceClassPeriod[];
  selectedStudent: AttendanceClassPeriod | null;
  isLoading: boolean;
  validationErrors: any;
}

const initialState: State = {
  data: attendanceStudent,
  currentData: attendanceStudent,
  selectedStudent: initSelectedStudent,
  nameClass: "6A1",
  isLoading: false,
  validationErrors: null,
};

export default initialState;
