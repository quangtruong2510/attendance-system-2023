import { Student } from "../../models/student";

export const initStudent: Student = {
  id: 0,
  name: "",
  dateOfBirth: "",
  classId: 0,
  gender: "",
  address: "",
  phone: "",
};

const students: Student[] = [];
interface State {
  data: Student[];
  currentData: Student[];
  selectedStudent: Student;
  isLoading: boolean;
  validationErrors: any;
}
const initialState: State = {
  data: students,
  currentData: students,
  selectedStudent: initStudent,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
