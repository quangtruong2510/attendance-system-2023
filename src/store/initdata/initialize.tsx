import { OptionSelect } from "../../models/Utils";

const unAssignedTeachers: OptionSelect[] = [];
const gradeList: OptionSelect[] = [
];;
const classSelectionList: OptionSelect[] = [
];


interface initialState {
  unAssignedTeachers: OptionSelect[],
  currentTeacher: OptionSelect[],
  gradeList: OptionSelect[],
  classSelectionList: OptionSelect[],
  selectedClasses: OptionSelect[],
  teacherWithoutAccount: OptionSelect[],
}

const initialState: initialState = {
  unAssignedTeachers: unAssignedTeachers,
  gradeList: gradeList,
  currentTeacher: unAssignedTeachers,
  classSelectionList: classSelectionList,
  selectedClasses: classSelectionList,
  teacherWithoutAccount: gradeList,
};

export default initialState;
