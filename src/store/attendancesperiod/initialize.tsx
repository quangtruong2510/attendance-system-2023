import { AttendanceClassPeriod } from "../../models/attendance";

const attendanceStudent: AttendanceClassPeriod[] = [
  {
    id: 1,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 2,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 3,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 4,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 5,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 6,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 7,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
  {
    id: 8,
    name: "Nguyễn Quang Trường",
    phone: "0817590009",
    address: "Nam Đông Thừa Thiên Huế",
    present: 1,
    absenceWithPermission: 4,
    absenceWithoutPermission: 3,
    late: 4,
  },
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
