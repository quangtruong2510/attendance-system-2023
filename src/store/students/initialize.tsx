import { Student } from "../../models/student";

export const initStudent: Student = {
  id: 0,
  name: "",
  dateOfBirth: "",
  classId: "",
  gender: "",
  address: "",
  phone: "",
};

const students: Student[] = [
  {
    id: 1,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A1",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 2,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A2",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 3,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A3",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 4,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A4",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 5,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A5",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 6,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A6",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 7,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A7",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 8,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A8",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 9,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A9",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 10,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A1",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 11,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A1",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
  {
    id: 12,
    name: "Nguyen Quang Truong",
    studentCode: "142Ad456",
    dateOfBirth: "25/10/2000",
    className: "10A1",
    gender: "Nam",
    address: "54 Dao Tan, Da Nang",
    phone: "0817590009",
  },
];
interface State {
  data: Student[];
  selectedStudent: Student;
  isLoading: Boolean;
  validationErrors: any;
}
const initialState: State = {
  data: students,
  selectedStudent: initStudent,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
