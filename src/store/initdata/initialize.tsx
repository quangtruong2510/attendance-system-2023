import { OptionSelect } from "../../models/Utils";

const unAssignedTeachers: OptionSelect[] = [];
const gradeList: OptionSelect[] = [
  // { value: 1, label: "10" },
  // { value: 2, label: "11" },
  // { value: 3, label: "12" },
];;
const classSelectionList: OptionSelect[] = [
  // { value: 1, label: "10A1", foreignKey: 1 },
  // { value: 2, label: "10A2", foreignKey: 1 },
  // { value: 3, label: "10A3", foreignKey: 1 },
  // { value: 4, label: "11A4", foreignKey: 1 },
  // { value: 5, label: "11A1", foreignKey: 2 },
  // { value: 6, label: "11A2", foreignKey: 2 },
  // { value: 7, label: "11A3", foreignKey: 2 },
  // { value: 8, label: "11A4", foreignKey: 2 },
  // { value: 9, label: "12A1", foreignKey: 3 },
  // { value: 10, label: "12A2", foreignKey: 3 },
  // { value: 11, label: "12A3", foreignKey: 3 },
  // { value: 12, label: "12A4", foreignKey: 3 },
];


interface initialState {
  unAssignedTeachers: OptionSelect[],
  gradeList: OptionSelect[],
  classSelectionList: OptionSelect[],
  selectedClasses: OptionSelect[],
}

const initialState: initialState = {
  unAssignedTeachers: unAssignedTeachers,
  gradeList: gradeList,
  classSelectionList: classSelectionList,
  selectedClasses: classSelectionList
};

export default initialState;
