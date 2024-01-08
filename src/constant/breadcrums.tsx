import { format } from "date-fns";
import { vi } from "date-fns/locale";

interface breadcrumb {
  label: string;
  link: string;
}

const breadcrumbStudentItems: breadcrumb[] = [
  { label: "Quản lý", link: "/" },
  { label: "Học sinh", link: "/" },
];

const breadcrumbTeacherItems: breadcrumb[] = [
  { label: "Quản lý", link: "/" },
  { label: "Giáo viên", link: "/" },
];

const breadcrumbClassItems: breadcrumb[] = [
  { label: "Quản lý", link: "/" },
  { label: "Lớp học", link: "/" },
];

const breadcrumbAccountItems: breadcrumb[] = [
  { label: "Quản lý", link: "/" },
  { label: "Tài khoản", link: "/" },
];

const breadcrumbDashboardItems: breadcrumb[] = [
  { label: "Trang chủ", link: "/" },
  { label: "Phân tích", link: "/" },
];

const today = new Date();
const formattedDayName = format(today, "EEEE", { locale: vi });
const formattedMonthName = format(today, "MMMM", { locale: vi });
const dayValue = today.getDate();

const breadcrumbAttendanceToday: breadcrumb[] = [
  { label: "Chuyên cần hôm nay", link: "/" },
  {
    label: ` ${formattedDayName} ngày ${dayValue} ${formattedMonthName} năm ${today.getFullYear()}`,
    link: "/",
  },
];

export {
  breadcrumbClassItems,
  breadcrumbTeacherItems,
  breadcrumbStudentItems,
  breadcrumbDashboardItems,
  breadcrumbAttendanceToday,
  breadcrumbAccountItems
};
