import { StatusAttendanceType } from "../Type/Utils";

export interface AttendanceReport {
  [key: number | string]: string | number | boolean | undefined;
  id: number;
  grade: string;
  classId?: number;
  className?: string;
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

export interface AttendanceClassPeriod {
  [key: number | string]:
    | string
    | number
    | boolean
    | undefined
    | StatusAttendanceType;
  id: number;
  name: string;
  phone?: string;
  address?: string;
  present: number;
  absenceWithPermission: number;
  absenceWithoutPermission: number;
  late: number;
}

export interface DetailAttendanceStudent {
  [key: number | string]:
    | string
    | number
    | boolean
    | undefined
    | StatusAttendanceType;
  id: number;
  day: string;
  timeCheckIn?: string;
  timeCheckOut?: string;
  status?: StatusAttendanceType;
  note?: string;
}
