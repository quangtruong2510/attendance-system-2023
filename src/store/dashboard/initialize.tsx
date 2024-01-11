import { Student } from "../../models/student";

export const initStudent: Student = {
  id: 0,
  studentCode: "",
  name: "",
  dateOfBirth: "",
  className: "",
  gender: "",
  address: "",
  phone: "",
};

const rows = [{}]

const initialState = {
  data: rows,
  total_students: 0,
  total_present: 0,
  total_absence_without_permission: 0,
  total_late: 0,
  total_absence_with_permission: 0,
  total_classes: 0,
  isLoading: false,
  errorMessage: null,
};

export default initialState;
