import { StatusAttendanceType } from "../Type/Utils";
import { OptionSelect } from "../models/Utils";
import { StatusAttendanceTypeList } from "./constant";

const statusAttendace: OptionSelect[] = [
  {
    value: StatusAttendanceType.PRESENT,
    label: "Có mặt",
  },
  {
    value: StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION,
    label:
      StatusAttendanceTypeList[StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION],
  },
  {
    value: StatusAttendanceType.ABSENCE_WITH_PERMISSION,
    label:
      StatusAttendanceTypeList[StatusAttendanceType.ABSENCE_WITH_PERMISSION],
  },
  {
    value: StatusAttendanceType.LATE,
    label: StatusAttendanceTypeList[StatusAttendanceType.LATE],
  },
];


const roles: OptionSelect[] = [
  { value: 1, label: "Giáo viên" },
  { value: 0, label: "Admin" },
]

export { statusAttendace, roles };
