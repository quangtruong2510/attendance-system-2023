import { Teacher } from "../../models/teacher";
export const initTeacher: Teacher = {
  homeroomClass: "",
  name: "",
  address: "",
  phone: "",
};

const teachers: Teacher[] = [];

interface State {
  data: Teacher[];
  currentData: Teacher[];
  selectedTeacher: Teacher;
  isLoading: boolean;
  validationErrors: any;
}

const initialState: State = {
  data: teachers,
  currentData: teachers,
  selectedTeacher: initTeacher,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
