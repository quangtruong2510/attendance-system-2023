import { StatusAttendanceType } from "../Type/Utils";

export interface AttendanceReport {
  [key: number | string]: string | number | boolean | undefined;
  id: number;
  grade: string;
  classId?: number;
  class?: string;
  quantity: number;
  present: number;
  absenceWithPermission: number;
  absenceWithoutPermission: number;
  late: number;
  homeroomTeacher: string;
}

export interface AttendanceStudent {
  [key: number | string]:
    | string
    | number
    | boolean
    | undefined
    | StatusAttendanceType;
  id: number;
  name: string;
  phone?: string;
  timeCheckIn?: string;
  timeCheckOut?: string;
  status?: StatusAttendanceType;
  note?: string;
}
