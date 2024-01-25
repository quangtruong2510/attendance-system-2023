import { Search } from "@mui/icons-material";
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
import BreadcrumbsComponent from "../../components/common/Utils";
import { breadcrumbClassItems } from "../../constant/breadcrums";
import { headerClassTable } from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { Class } from "../../models/class";
import { deleteClassById, fetchClasses } from "../../store/class/operation";
import { initializeState } from "../../store/common/pagination";
import { AppDispatch, useSelector } from "../../store/configstore";
import CommonUtil from "../../utils/export";
import ClassEditDialog from "./ClassEdit";
// import TableRows from "./part/TableRows";
import { FilterCriteria } from "../../Type/Utils";
import TableList from "../../components/common/Table/TableList";
import TableTitle from "../../components/common/Table/TableTitle";
import { clearValidationErrors, setFilterClass } from "../../store/class/slice";
import { filterClassesByGrade, setCurrentTeacher } from "../../store/initdata/slice";

const StudentList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const classList: Class[] = useSelector((state) => state.class.data);
  const currentData: Class[] = useSelector((state) => state.class.currentData);
  const isLoading = useSelector((state) => state.class.isLoading);
  const teachers: OptionSelect[] = useSelector(
    (state) => state.initial.unAssignedTeachers
  );

  const [IsOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [isNew, setIsNewClass] = useState(false);
  const [filter, setFilter] = useState<FilterCriteria>({
    gradeId: { value: "", strict: true },
    homeroomTeacher: { value: "", strict: false },
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

  useEffect(() => {
    dispatch(initializeState());
    dispatch(fetchClasses());
  }, []);

  const addNewClass = () => {
    setIsNewClass(true);
    setIsOpenEditDialog(true);
  };

  const onDeleteClick = async (id: number) => {
    await dispatch(deleteClassById(id));
    await dispatch(fetchClasses());
  };

  const handleClose = () => {
    setIsOpenEditDialog(false);
  };

  const grades: OptionSelect[] = useSelector(
    (state) => state.initial.gradeList
  );

  const editCLass = (id: number) => {
    setIsNewClass(false);
    setIsOpenEditDialog(true);
    const teacher = classList.find((classRoom) => classRoom.id === id) || null
    setSelectedClass(teacher);
    const teacherNew: OptionSelect = {
      value: teacher?.teacher_id as number,
      label: teacher?.homeroomTeacher as string
    }
    dispatch(setCurrentTeacher([...teachers, teacherNew]))
  };

  const handleSuccessEdit = async (isSuccess: boolean) => {
    if (isSuccess) {
      await dispatch(fetchClasses());
      dispatch(clearValidationErrors());
      setIsOpenEditDialog(false);
      setSelectedClass(null);
    }
  };

  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterClass(classList));
      return;
    }

    const filterData: Class[] = CommonUtil.filterData(classList, filter);
    dispatch(setFilterClass(filterData));
  };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "danh_sach_lop_hoc",
      "Danh sách lớp học",
      classList
    );
  };

  const handleReload = async () => {
    dispatch(fetchClasses());
  };

  return (
    <ContentLayout>
      <BreadcrumbsComponent
        breadcrumbs={breadcrumbClassItems}
        haveAddButton={true}
        handleAddButton={addNewClass}
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
          title="Danh sách lớp học"
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
            <SelectDropdown
              id={"grade"}
              label="Khối"
              options={grades}
              value={filter.gradeId.value}
              onChange={handleChangeFilter("gradeId")}
            />
            <CustomInput
              label={"GVCN"}
              value={filter.homeroomTeacher.value}
              onChange={handleChangeFilter("homeroomTeacher")}
              placeholder={"Họ và tên"}
              fullWidth={false}
            />
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
          headers={headerClassTable}
          currentData={currentData}
          onDeleteClick={onDeleteClick}
          onEditClick={editCLass}
        ></TableList>
      </Paper>
      <ClassEditDialog
        selectedClass={selectedClass}
        isNew={isNew}
        open={IsOpenEditDialog}
        onClickEdit={handleSuccessEdit}
        onClose={handleClose}
      />
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

export default StudentList;
