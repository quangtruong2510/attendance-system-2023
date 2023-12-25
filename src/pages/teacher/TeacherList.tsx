import { Search } from "@mui/icons-material";
import {
  Button,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { FilterCriteria } from "../../Type/Utils";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
import TableHeaders from "../../components/common/Table/TableHeader";
import TableRows from "../../components/common/Table/TableRows";
import TableRowsLoader from "../../components/common/Table/TableRowsLoader";
import TableTitle from "../../components/common/Table/TableTitle";
import BreadcrumbsComponent from "../../components/common/Utils";
import { breadcrumbTeacherItems } from "../../constant/breadcrums";
import { headerTeacherTable } from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { Teacher } from "../../models/teacher";
import { initializeState } from "../../store/common/pagination";
import { AppDispatch, useSelector } from "../../store/configstore";
import { filterClassesByGrade } from "../../store/initdata/slice";
import { } from "../../store/students/operation";
import {
  deleteTeacherById,
  fetchTeacher,
} from "../../store/teachers/operation";
import { setFilterTeacher } from "../../store/teachers/slice";
import CommonUtil from "../../utils/export";
import TeacherEdit from "./TeacherEdit";

const TeacherList = () => {
  const dispatch = useDispatch<AppDispatch>();
  let classes: OptionSelect[] = useSelector(
    (state) => state.initial.classSelectionList
  );

  console.log("classes", classes);

  const teacherList: Teacher[] = useSelector((state) => state.teacher.data);
  const currentData: Teacher[] = useSelector(
    (state) => state.teacher.currentData
  );

  const { current, perPage } = useSelector((state) => state.pagination);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isNew, setIsNewTeacher] = useState(false);
  const isLoading = useSelector((state) => state.teacher.isLoading);
  const [filter, setFilter] = useState<FilterCriteria>({
    classId: { value: "", strict: true },
    name: { value: "", strict: false },
  });

  useEffect(() => {
    dispatch(initializeState());
    dispatch(fetchTeacher());
  }, []);

  const addNewTeacher = async () => {
    setSelectedTeacher(null);
    setIsNewTeacher(true);
    setDialogOpen(true);
  };

  const handeSuccessEdit = (isSuccess: boolean) => {
    if (isSuccess) {
      dispatch(fetchTeacher());
    }
  };

  const onDeleteClick = async (id: number) => {
    await dispatch(deleteTeacherById(id));
    await dispatch(fetchTeacher());
  };
  const editTeacher = (id: number) => {
    setIsNewTeacher(false);
    setSelectedTeacher(
      teacherList.find((teacher) => teacher.id === id) || null
    );
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterTeacher(teacherList));
      return;
    }
    console.log("filter", filter);

    const filterData: Teacher[] = CommonUtil.filterData(teacherList, filter);
    dispatch(setFilterTeacher(filterData));
  };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "giao-vien",
      "Danh sách giáo viên",
      teacherList
    );
  };

  const handleReload = () => { dispatch(fetchTeacher()) };
  const handleChangeFilter =
    (property: keyof FilterCriteria) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        if (property === "grade") {
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

  return (
    <ContentLayout>
      <BreadcrumbsComponent
        breadcrumbs={breadcrumbTeacherItems}
        haveAddButton={true}
        handleAddButton={addNewTeacher}
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
          title="Danh sách giáo viên"
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
              id={"class"}
              label="Lớp"
              options={classes}
              value={filter.classId.value}
              onChange={handleChangeFilter("classId")}
            />
            <CustomInput
              label={"Họ và tên"}
              value={filter.name.value}
              onChange={handleChangeFilter("name")}
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
        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerTeacherTable} />
            {isLoading ? (
              <TableRowsLoader rowsNum={10} numColumns={7} />
            ) : (
              <TableRows
                rows={currentData.slice(
                  current * perPage,
                  current * perPage + perPage
                )}
                headers={headerTeacherTable}
                onDeleteClick={onDeleteClick}
                onEditClick={editTeacher}
              />
            )}
          </Table>
        </TableContainer>
      </Paper>
      <TeacherEdit
        isNew={isNew}
        isOpen={isDialogOpen}
        selectedTeacher={selectedTeacher}
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

export default TeacherList;
