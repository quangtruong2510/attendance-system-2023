import {
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
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
import { breadcrumbTeacherItems } from "../../constant/breadcrums";
import { headerTeacherTable } from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { Teacher } from "../../models/teacher";
import { initializeState } from "../../store/common/pagination";
import { AppDispatch, useSelector } from "../../store/configstore";
import { } from "../../store/students/operation";
import {
  deleteTeacherById,
  fetchTeacher,
} from "../../store/teachers/operation";
import CommonUtil from "../../utils/export";
import TeacherEdit from "./TeacherEdit";
import TableRows from "./part/TableRows";

interface GroupFilterSearch {
  class: string;
  grade: string;
  name: string;
  phone: string;
}

const TeacherList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const teacherList: Teacher[] = useSelector((state) => state.teacher.data);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isNew, setIsNewTeacher] = useState(false);
  const { current, perPage } = useSelector((state) => state.pagination);
  const isLoading = useSelector((state) => state.teacher.isLoading);

  const [filter, setFilter] = useState<GroupFilterSearch>({
    class: "",
    grade: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(initializeState());
    // dispatch(fetchTeacher());
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

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "giao-vien",
      "Danh sách giáo viên",
      teacherList
    );
  };

  const handleReload = () => { };

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
            <CustomInput
              label={"Họ và tên"}
              value={filter.name}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
            />
          </Stack>

          <NavigationTable count={teacherList.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerTeacherTable} />
            <TableBody>
              {isLoading ? (
                <TableRowsLoader rowsNum={10} numColumns={5} />
              ) : (
                <TableRows
                  rows={teacherList.slice(
                    current * perPage,
                    current * perPage + perPage
                  )}
                  headers={headerTeacherTable}
                  onDeleteClick={onDeleteClick}
                  onEditClick={editTeacher}
                />
              )}
            </TableBody>
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
