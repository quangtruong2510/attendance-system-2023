import { Gender, StatusAttendanceType } from "../Type/Utils";
import { OptionSelect } from "../models/Utils";
import { Roles } from "../utils/role";

const authTypes = {
  developer: "1",
  operator: "2",
  organizationManager: "3",
  organizationOperator: "4",
  accountManager: "9",
};
const genders: OptionSelect[] = [
  { value: 1, label: "Nam" },
  { value: 2, label: "Nữ" },
];

const StatusAttendanceTypeList = {
  [StatusAttendanceType.PRESENT]: "Có mặt",
  [StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION]: "Vắng không phép",
  [StatusAttendanceType.ABSENCE_WITH_PERMISSION]: "Vắng có phép",
  [StatusAttendanceType.LATE]: "Đi trễ",
};

const RolesList = {
  [Roles.ADMIN]: "Admin",
  [Roles.TEACHER]: "Giáo viên",
};

const genderList = {
  [Gender.MALE]: "Nam",
  [Gender.FEMALE]: "Nữ",

};

export { StatusAttendanceTypeList, genders, authTypes, genderList, RolesList };
