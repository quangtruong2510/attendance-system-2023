import {
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
import TableHeaders from "../../components/common/Table/TableHeader";
import TableRowsLoader from "../../components/common/Table/TableRowsLoader";
import TableTitle from "../../components/common/Table/TableTitle";
import BreadcrumbsComponent from "../../components/common/Utils";
import { breadcrumbStudentItems } from "../../constant/breadcrums";
import { headerStudentTable } from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { Student } from "../../models/student";
import { initializeState } from "../../store/common/pagination";
import { AppDispatch, useSelector } from "../../store/configstore";
import {
  deleteStudentById,
  fetchStudents,
} from "../../store/students/operation";
import { clearValidationErrors } from "../../store/students/slice";
import CommonUtil from "../../utils/export";
import { Roles } from "../../utils/role";
import EditStudent from "./StudentEdit";
import TableRows from "./part/TableRows";

interface GroupFilterSearch {
  class: string;
  grade: string;
  name: string;
  phone: string;
}

const StudentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const studentList: Student[] = useSelector((state) => state.students.data);
  // const [isDialogOpen, setDialogOpen] = useState(false);
  // const selectedStudent: Student = useSelector(
  //   (state) => state.students.selectedStudent
  // );

  const role = useSelector((state) => state.authentication.role);
  // const [isNew, setIsNewStudent] = useState(false);
  const { current, perPage } = useSelector((state) => state.pagination);
  const isLoading = useSelector((state) => state.students.isLoading);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isNew, setIsNewStudent] = useState(false);
  const [filter, setFilter] = useState<GroupFilterSearch>({
    class: "",
    grade: "",
    name: "",
    phone: "",
  });

  console.log("studentList", studentList);

  const handleClose = () => {
    setDialogOpen(false);
    dispatch(clearValidationErrors());
  };

  const handeSuccessEdit = async (isSuccess: boolean) => {
    if (isSuccess) {
      await dispatch(fetchStudents());
      setDialogOpen(false);
    }
  };
  const addNewStudent = () => {
    setSelectedStudent(null);
    setIsNewStudent(true);
    setDialogOpen(true);
  };

  const onDeleteClick = async (id: number) => {
    await dispatch(deleteStudentById({ id: id }));
    await dispatch(fetchStudents());
  };
  const editStudent = (id: number) => {
    setIsNewStudent(false);
    setDialogOpen(true);
    setSelectedStudent(
      studentList.find((student) => student.id === id) || null
    );
  };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "hoc-sinh-toan-truong",
      "Danh sách học sinh",
      studentList
    );
  };

  const handleReload = async () => {
    dispatch(fetchStudents());
  };

  const options: OptionSelect[] = [
    { value: 1, label: "6" },
    { value: 2, label: "7" },
    { value: 3, label: "8" },
    { value: 4, label: "9" },
  ];

  const GradeOptions: OptionSelect[] = [
    { value: 1, label: "6A1" },
    { value: 2, label: "7A2" },
    { value: 3, label: "8B6" },
    { value: 4, label: "9B3" },
  ];

  const handleChangeFilter =
    (property: keyof GroupFilterSearch) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, [property]: event.target.value }));
    };

  useEffect(() => {
    dispatch(initializeState());
    dispatch(fetchStudents());
  }, []);

  return (
    <ContentLayout>
      <BreadcrumbsComponent
        breadcrumbs={breadcrumbStudentItems}
        haveAddButton={true}
        handleAddButton={addNewStudent}
      ></BreadcrumbsComponent>
      <Paper
        sx={{
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          marginTop: "15px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
        }}
      >
        <TableTitle
          title="Danh sách học sinh"
          handleExport={handleExport}
          reload={handleReload}
        />
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {role == Roles.ADMIN && (
              <>
                <SelectDropdown
                  id={"grade"}
                  label="Khối"
                  options={options}
                  value={filter.grade}
                  onChange={handleChangeFilter("grade")}
                />
                <SelectDropdown
                  id={"class"}
                  label="Lớp"
                  options={GradeOptions}
                  value={filter.class}
                  onChange={handleChangeFilter("class")}
                />
              </>
            )}

            <CustomInput
              label={"Họ và tên"}
              value={filter.name}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
            />
            {role == Roles.TEACHER && (
              <>
                <CustomInput
                  label={"Số điện thoại"}
                  value={filter.name}
                  onChange={handleChangeFilter("phone")}
                  placeholder={"Số điện thoại"}
                  fullWidth={false}
                />
              </>
            )}
          </Stack>
          <NavigationTable count={studentList.length} />
        </Stack>
        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerStudentTable} />
            {isLoading ? (
              <TableRowsLoader rowsNum={10} numColumns={7} />
            ) : (
              <TableRows
                rows={studentList.slice(
                  current * perPage,
                  current * perPage + perPage
                )}
                headers={headerStudentTable}
                onDeleteClick={onDeleteClick}
                onEditClick={editStudent}
              />
            )}
          </Table>
        </TableContainer>
      </Paper>

      <EditStudent
        isNew={isNew}
        isOpen={isDialogOpen}
        selectedStudent={selectedStudent}
        handleClose={handleClose}
        onClickEdit={handeSuccessEdit}
      />
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

export default StudentList;
