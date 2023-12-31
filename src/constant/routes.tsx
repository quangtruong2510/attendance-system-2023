import IRoute from "../models/route";
import Attendance from "../pages/attendance/Attendance";
import AttendanceClass from "../pages/attendance/AttendanceClass";
import AttendanceToday from "../pages/attendance/AttendanceToday";
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
    path: "/setting",
    component: <Setting />,
    exact: true,
    role: [Roles.ADMIN],
  },
];
export default routeList;
