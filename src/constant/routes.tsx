import IRoute from "../models/route";
import Attendance from "../pages/attendance/pageList/Attendance";
import AttendanceClass from "../pages/attendance/pageList/AttendanceClass";
import AttendanceToday from "../pages/attendance/pageList/AttendanceToday";
import DetailAttendanceStudentPeriod from "../pages/attendance/pageList/DetailAttendanceStudent";
import PeriodAttendance from "../pages/attendance/pageList/PeriodAttendance";
import Class from "../pages/class/classList";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/Login";
import Setting from "../pages/setting/Setting";
import StudentList from "../pages/student/StudentList";
import TeacherList from "../pages/teacher/TeacherList";
import { Roles } from "../utils/role";

const routeList: IRoute[] = [
  {
    path: "/login",
    component: <Login />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/class",
    component: <Class />,
    exact: true,
    role: [Roles.ADMIN],
  },
  {
    path: "/teacher",
    component: <TeacherList />,
    exact: true,
    role: [Roles.TEACHER],
  },
  {
    path: "/student",
    component: <StudentList />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/attendance",
    component: <Attendance />,
    exact: true,
    role: [Roles.ADMIN],
  },
  {
    path: "/attendanceToday",
    component: <AttendanceToday />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/attendanceToday/class/:id",
    component: <AttendanceClass />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/attendance/class/:id/:from/:to",
    component: <PeriodAttendance />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/attendance/student/:id/:from/:to",
    component: <DetailAttendanceStudentPeriod />,
    exact: true,
    role: [Roles.ADMIN, Roles.TEACHER],
  },
  {
    path: "/setting",
    component: <Setting />,
    exact: true,
    role: [Roles.ADMIN],
  },
];
export default routeList;
