import { Class } from "../../models/class";
const classes: Class[] = [];
export const initClass: Class = {
  gradeId: "",
  className: "",
  teacherId: "",
}
interface State {
  data: Class[],
  currentData: Class[],
  isLoading: boolean,
  validationErrors: any,
}
const initialState: State = {
  data: classes,
  currentData: classes,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
