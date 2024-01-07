import {
  Button,
  Paper,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
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
import {
  clearValidationErrors,
  setFilterStudent,
} from "../../store/students/slice";
import CommonUtil from "../../utils/export";
import { Roles } from "../../utils/role";
import EditStudent from "./StudentEdit";
import { Search } from "@mui/icons-material";
import { FilterCriteria } from "../../Type/Utils";
import TableList from "../../components/common/Table/TableList";
import {
  filterClassesByGrade,
  initializeClassState,
} from "../../store/initdata/slice";

const StudentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const studentList: Student[] = useSelector((state) => state.students.data);
  const currentData: Student[] = useSelector((state) => state.students.currentData);
  const grades: OptionSelect[] = useSelector((state) => state.initial.gradeList);
  const classes: OptionSelect[] = useSelector((state) => state.initial.selectedClasses);
  const isLoading: boolean = useSelector((state) => state.students.isLoading);
  const role = useSelector((state) => state.authentication.role);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isNew, setIsNewStudent] = useState(false);
  const [filter, setFilter] = useState<FilterCriteria>({
    classId: { value: "", strict: true },
    gradeId: { value: "", strict: true },
    name: { value: "", strict: false },
    phone: { value: "", strict: false },
  });

  const handleChangeFilter =
    (property: keyof FilterCriteria) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        if (property === "gradeId") {
          dispatch(filterClassesByGrade(event.target.value));
        }

        setFilter((prev) => ({
          ...prev,
          [property]: {
            value: event.target.value,
            strict: prev[property]?.strict ?? true,
          },
        }));
      };

  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterStudent(studentList));
      return;
    }

    const filterData: Student[] = CommonUtil.filterData(studentList, filter);
    dispatch(setFilterStudent(filterData));
  };

  const handleClose = () => {
    setDialogOpen(false);
    dispatch(clearValidationErrors());
  };

  const handleSuccessEdit = async (isSuccess: boolean) => {
    if (isSuccess) {
      await dispatch(fetchStudents());
      dispatch(clearValidationErrors());
      setDialogOpen(false);
      setSelectedStudent(null);
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

  useEffect(() => {
    dispatch(initializeClassState());
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
                  options={grades}
                  value={filter.gradeId.value}
                  onChange={handleChangeFilter("gradeId")}
                />
                <SelectDropdown
                  id={"class"}
                  label="Lớp"
                  options={classes}
                  value={filter.classId.value}
                  onChange={handleChangeFilter("classId")}
                />
              </>
            )}

            <CustomInput
              label={"Họ và tên"}
              value={filter.name.value}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
            />
            {role == Roles.TEACHER && (
              <>
                <CustomInput
                  label={"Số điện thoại"}
                  value={filter.phone.value}
                  onChange={handleChangeFilter("phone")}
                  placeholder={"Số điện thoại"}
                  fullWidth={false}
                />
              </>
            )}
            <Button
              style={{
                height: "35px",
                minWidth: "80px",
                textTransform: "none",
              }}
              size="small"
              component="label"
              variant="contained"
              startIcon={<Search />}
              onClick={handleFilterData}
            >
              Tìm kiếm
            </Button>
          </Stack>
          <NavigationTable count={currentData.length} />
        </Stack>
        <TableList
          isLoading={isLoading}
          headers={headerStudentTable}
          currentData={currentData}
          onEditClick={editStudent}
          onDeleteClick={onDeleteClick}
        ></TableList>
      </Paper>

      <EditStudent
        isNew={isNew}
        isOpen={isDialogOpen}
        selectedStudent={selectedStudent}
        handleClose={handleClose}
        onClickEdit={handleSuccessEdit}
      />
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

export default StudentList;
