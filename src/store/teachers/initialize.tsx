import { Student } from "../../models/student";
import { Teacher } from "../../models/teacher";

export const initTeacher: Student = {
  id: 0,
  studentCode: "",
  name: "",
  dateOfBirth: "",
  className: "",
  gender: "",
  address: "",
  phone: "",
};

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 5,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 6,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 8,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 9,
    name: "Nguyễn Văn A",
    homeroomClass: "6A3",
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
];

const initialState = {
  data: teachers,
  selectedTeacher: initTeacher,
  isLoading: false,
  errorMessage: null,
};

export default initialState;
