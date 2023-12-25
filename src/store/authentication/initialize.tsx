import { Roles } from "../../utils/role";

const initialState = {
  user: null,
  role: Roles.ADMIN,
  name: "Admin",
  isAuthenticated: false,
  classId: 0,
  loading: false,
  error: null,
};

export default initialState;
