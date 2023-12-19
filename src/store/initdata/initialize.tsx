import { OptionSelect } from "../../models/Utils";

const unAssignedTeachers: OptionSelect[] = [];
const gradeList: OptionSelect[] = [];
const classSelectionList: OptionSelect[] = [];



const initialState = {
  unAssignedTeachers: unAssignedTeachers,
  gradeList: gradeList,
  classSelectionList: classSelectionList
};

export default initialState;
