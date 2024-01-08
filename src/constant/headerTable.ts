export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  maxWidth?: number;
  align?: "right" | "center" | "center";
  format?: (value: number) => string;
}

const headerDashboardTable: Column[] = [
  { id: "className", label: "Lớp", minWidth: 50, align: "center" },
  { id: "quantity", label: "Sỉ số", minWidth: 50, align: "center" },
  {
    id: "absenceWithPermission",
    label: "Vắng(CP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithoutPermission",
    label: "Vắng(KP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "late",
    label: "Đi trễ",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
];

const headerTeacherTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "name",
    label: "Họ và tên",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "homeroomClass",
    label: "Lớp chủ nhiệm",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 300,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "phone",
    label: "Số điện thoại",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
];

const headerStudentTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "className",
    label: "Lớp",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "name",
    label: "Họ và tên",
    minWidth: 200,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "dateOfBirth",
    label: "Ngày sinh",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "gender",
    label: "Giới tính",
    minWidth: 90,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "phone",
    label: "Số điện thoại",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
];

const headerAttendanceTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "grade",
    label: "Khối",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "className",
    label: "Lớp",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "quantity",
    label: "Sỉ số",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "present",
    label: "Có mặt",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithPermission",
    label: "Vắng(CP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithoutPermission",
    label: "Vắng(KP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "late",
    label: "Đi trễ",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "homeroomTeacher",
    label: "GVCN",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
];

const headerAttendanceReportTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "grade",
    label: "Khối",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "className",
    label: "Lớp",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "quantity",
    label: "Sỉ số",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithPermission",
    label: "Vắng(CP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithoutPermission",
    label: "Vắng(KP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "late",
    label: "Đi trễ",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "homeroomTeacher",
    label: "GVCN",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
];

const headerAttendanceClassTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 20 },
  {
    id: "name",
    label: "Họ và tên",
    minWidth: 150,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "timeCheckIn",
    label: "Check in",
    minWidth: 170,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "timeCheckOut",
    label: "Check out",
    minWidth: 170,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "note",
    label: "Ghi chú",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Chỉnh sửa",
    minWidth: 120,
    align: "center",
    maxWidth: 300,
  },
];

const headerAttendanceClassDashboardTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 20 },
  {
    id: "name",
    label: "Họ và tên",
    minWidth: 150,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "timeCheckIn",
    label: "Check in",
    minWidth: 150,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "timeCheckOut",
    label: "Check out",
    minWidth: 150,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
];

const headerClassTable: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "gradeName",
    label: "Khối",
    minWidth: 100,
    align: "center",
    maxWidth: 100,
  },
  {
    id: "className",
    label: "Lớp",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "quantity",
    label: "Sỉ số",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "homeroomTeacher",
    label: "GVCN",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
];

const headerAttendanceClassPeriod: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "name",
    label: "Họ và tên",
    minWidth: 100,
    align: "center",
    maxWidth: 100,
  },
  {
    id: "phone",
    label: "Số điện thoại",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "address",
    label: "Địa chỉ",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "present",
    label: "Có mặt",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithPermission",
    label: "Vắng(CP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "absenceWithoutPermission",
    label: "Vắng(KP)",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "late",
    label: "Đi trễ",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
];

const headerDetailAttendanceStudentPeriod: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "day",
    label: "Ngày",
    minWidth: 100,
    align: "center",
    maxWidth: 100,
  },
  {
    id: "timeCheckIn",
    label: "Thời gian vào lớp",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "timeCheckOut",
    label: "Thời gian checkout",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "note",
    label: "Ghi chú",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
];

const headerAccount: Column[] = [
  { id: "id", label: "STT", minWidth: 50, align: "center", maxWidth: 300 },
  {
    id: "email",
    label: "Tài khoản",
    minWidth: 100,
    align: "center",
    maxWidth: 100,
  },
  {
    id: "nameTeacher",
    label: "Giáo viên",
    minWidth: 100,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "role",
    label: "Phân quyền",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
  {
    id: "action",
    label: "Thao tác",
    minWidth: 50,
    align: "center",
    maxWidth: 300,
  },
];

export {
  headerStudentTable,
  headerDashboardTable,
  headerAttendanceTable,
  headerAttendanceClassTable,
  headerAttendanceReportTable,
  headerTeacherTable,
  headerClassTable,
  headerAttendanceClassDashboardTable,
  headerAttendanceClassPeriod,
  headerDetailAttendanceStudentPeriod,
  headerAccount
};
