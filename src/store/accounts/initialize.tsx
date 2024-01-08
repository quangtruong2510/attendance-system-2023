import { Account } from "../../models/account";

export const initAccount: Account = {
  id: 0,
  nameTeacher: "",
  role: 1,
  password: "",
  teacherId: 0,
};

const accounts: Account[] = [];


interface State {
  data: Account[];
  currentData: Account[];
  selectedAccount: Account;
  isLoading: boolean;
  validationErrors: any;
}
const initialState: State = {
  data: accounts,
  currentData: accounts,
  selectedAccount: initAccount,
  isLoading: false,
  validationErrors: null,
};

export default initialState;
