import { Roles } from "../../utils/role";

interface State {
  user: any,
  role: Roles,
  name: string,
  isAuthenticated: boolean,
  classId: number,
  loading: boolean,
  error: any,
  className?: string
}

const initialState: State = {
  user: null,
  role: Roles.ADMIN,
  name: "Admin",
  isAuthenticated: false,
  classId: 0,
  loading: false,
  error: null,
  className: ""
};

export default initialState;
