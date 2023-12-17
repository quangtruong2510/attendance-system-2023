import { Class } from "../../models/class";
const classes: Class[] = [];
interface State {
  data: Class[],
  isLoading: Boolean,
  validationErrors: any,
}
const initialState: State = {
  data: classes,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
