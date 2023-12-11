import { StatusAttendanceType } from "../Type/Utils";
import { OptionSelect } from "../models/Utils";

interface Gender {
  id: number;
  value: string;
}
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
  [StatusAttendanceType.PRESENT]: "-",
  [StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION]: "Vắng không phép",
  [StatusAttendanceType.ABSENCE_WITH_PERMISSION]: "Vắng có phép",
  [StatusAttendanceType.LATE]: "Đi trễ",
};

export { StatusAttendanceTypeList, genders, authTypes };
