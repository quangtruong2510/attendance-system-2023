import { Class } from "../../models/class";
const initClass: Class = {
  id: 1,
  grade: "6",
  class: "6A5",
  quantity: 40,
  homeroomTeacher: "Nguyen Van A",
  phone: "0817590009",
};

const classes: Class[] = [
  {
    id: 1,
    grade: "6",
    class: "6A5",
    quantity: 40,
    homeroomTeacher: "Nguyen Van A",
    phone: "0817590009",
  },
  {
    id: 2,
    grade: "6",
    class: "6A5",
    quantity: 40,
    homeroomTeacher: "Nguyen Van B",
    phone: "0817590009",
  },
  {
    id: 3,
    grade: "6",
    class: "6A5",
    quantity: 40,
    homeroomTeacher: "Nguyen Van C",
    phone: "0817590009",
  },
  {
    id: 4,
    grade: "6",
    class: "6A5",
    quantity: 40,
    homeroomTeacher: "Nguyen Van D",
    phone: "0817590009",
  },
  {
    id: 5,
    grade: "6",
    class: "6A5",
    quantity: 40,
    homeroomTeacher: "Nguyen Van E",
    phone: "0817590009",
  },
  {
    id: 1,
    grade: "6",
    class: "6A5",
    quantity: 40,
    homeroomTeacher: "Nguyen Van F",
    phone: "0817590009",
  },
];

const initialState = {
  data: classes,
  selectedClass: initClass,
  isLoading: false,
  errorMessage: null,
};

export default initialState;
