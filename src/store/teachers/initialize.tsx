import { Teacher } from "../../models/teacher";
export const initTeacher: Teacher = {
  homeroomClass: "",
  name: "",
  address: "",
  phone: "",
};

const teachers: Teacher[] = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    homeroomClass: "10A1",
    classId: 1,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    homeroomClass: "10A2",
    classId: 2,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 3,
    name: "Nguyễn Văn A",
    homeroomClass: "10A3",
    classId: 3,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    homeroomClass: "11A1",
    classId: 4,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 5,
    name: "Nguyễn Văn A",
    homeroomClass: "11A2",
    classId: 5,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 6,
    name: "Nguyễn Văn A",
    homeroomClass: "11A3",
    classId: 6,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    homeroomClass: "11A4",
    classId: 7,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 8,
    name: "Nguyễn Văn A",
    homeroomClass: "12A1",
    classId: 8,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
  {
    id: 9,
    name: "Nguyễn Văn A",
    homeroomClass: "12A2",
    classId: 9,
    address: "Nam Đông, Thừa Thiên Huế",
    phone: "0817590009",
    account: "truong.nguyen",
  },
];

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
