import {
  AddCircleOutline,
  Cached,
  CloudUpload
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
import TableHeaders from "../../components/common/Table/TableHeader";
import {
  headerTeacherTable
} from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { Student } from "../../models/student";
import { Teacher } from "../../models/teacher";
import { AppDispatch, useSelector } from "../../store/configstore";
import {
  deleteStudentById,
  fetchStudents,
  getStudentById,
} from "../../store/students/operation";
import CommonUtil from "../../utils/export";
import TeacherEdit from "./TeacherEdit";
import TableRows from "./part/TableRows";
import { fetchTeacher } from "../../store/teachers/operation";

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
  const [filter, setFilter] = useState<GroupFilterSearch>({
    class: "",
    grade: "",
    name: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchTeacher());
  }, []);

  const addNewTeacher = () => {
    console.log("aaaaaaaaaaaaaaaaa");

    setIsNewTeacher(true);
    setDialogOpen(true);
  };

  const onDeleteClick = (id: number) => {
    dispatch(deleteStudentById({ id: id }));
    dispatch(fetchStudents());
  };
  const editTeacher = (id: number) => {
    setSelectedTeacher(teacherList.find((teacher) => teacher.id === id) || null);
    setIsNewTeacher(false);
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
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" style={{ color: "#4154F1" }}>
            Quản lý
          </Typography>
          <Typography color="text.primary">Giáo viên</Typography>
        </Breadcrumbs>
        <Button
          style={{
            textTransform: "none",
            height: "40px",
          }}
          component="label"
          variant="contained"
          onClick={addNewTeacher}
          startIcon={<AddCircleOutline />}
        >
          Thêm mới
        </Button>
      </Stack>
      <Paper
        sx={{
          width: "100%",
          padding: "10px",
          boxSizing: "border-box",
          marginTop: "15px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px"
        }}
      >
        <GroupFilter>
          <GroupFilter>
            <Typography
              sx={{ margin: "0" }}
              variant="h6"
              style={{ color: "rgb(227 113 12)" }}
            >
              Danh sách giáo viên
            </Typography>
          </GroupFilter>
          <Stack direction="row" spacing={2}>
            <Button
              style={{
                height: "35px",
                minWidth: "80px",
                textTransform: "none",
                backgroundColor: "#117957",
              }}
              size="small"
              component="label"
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={handleExport}
            >
              Xuất Excel
            </Button>
            <Button
              style={{
                height: "35px",
                minWidth: "80px",
                textTransform: "none",
              }}
              size="small"
              component="label"
              variant="contained"
              startIcon={<Cached />}

            >
              Làm mới
            </Button>
          </Stack>
        </GroupFilter>
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
            <TableRows
              rows={teacherList.slice(
                current * perPage,
                current * perPage + perPage
              )}
              headers={headerTeacherTable}
              onDeleteClick={onDeleteClick}
              onEditClick={editTeacher}
            />
          </Table>
        </TableContainer>
      </Paper>
      <TeacherEdit
        isNew={isNew}
        isOpen={isDialogOpen}
        selectedTeacher={selectedTeacher}
        handleClose={handleClose}
      />
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

const GroupFilter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export default TeacherList;
