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

export { breadcrumbClassItems, breadcrumbTeacherItems, breadcrumbStudentItems };
