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
import { CustomInput } from "../../../components/common/FormInput/InputField";
import SelectDropdown from "../../../components/common/Select/SelectDropdown";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerAttendanceClassTable } from "../../../constant/headerTable";
import { AppDispatch, useSelector } from "../../../store/configstore";

import { useParams } from "react-router-dom";
import TableRows from "../../../components/common/Table/TableRows";
import TableRowsLoader from "../../../components/common/Table/TableRowsLoader";
import TableTitle from "../../../components/common/Table/TableTitle";
import BreadcrumbsComponent from "../../../components/common/Utils";
import { statusAttendace } from "../../../constant/Utils";
import { breadcrumbAttendanceToday } from "../../../constant/breadcrums";
import { AttendanceStudent } from "../../../models/attendance";
import { fetchAttendanceClass } from "../../../store/attendances/operation";
import CommonUtil from "../../../utils/export";
import AttendanceStudentEdit from "../edit/AttendanceStudent";
import { FilterCriteria } from "../../../Type/Utils";
import { Search } from "@mui/icons-material";
import { setFilterAttendanceClasse } from "../../../store/attendancesclass/slice";
import { initSelectedStudent } from "../../../store/attendancesclass/initialize";

const AttendanceClass = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const attendanceStudent: AttendanceStudent[] = useSelector((state) => state.attendanceClass.data);
  const defaultClassId = useSelector((state) => state.authentication.classId);

  const curentData: AttendanceStudent[] = useSelector((state) => state.attendanceClass.curentData);
  const isLoading = useSelector((state) => state.attendanceClass.isLoading);
  const { id } = useParams();

  const [selectedAttendanceStudent, setSelectedAttendanceStudent] = useState<AttendanceStudent>(initSelectedStudent);

  const className = attendanceStudent[0]?.className || ""

  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<FilterCriteria>({
    status: { value: "", strict: true },
    name: { value: "", strict: false },
  });

  const handleClose = () => {
    setSelectedAttendanceStudent(initSelectedStudent)
    setDialogOpen(false);
  };
  const editStudent = (id: number) => {
    setDialogOpen(true);
    setSelectedAttendanceStudent(attendanceStudent.find((attendance) => attendance.id === id) || initSelectedStudent)
  };

  const handleChangeFilter =
    (property: keyof FilterCriteria) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({
          ...prev,
          [property]: {
            value: event.target.value,
            strict: prev[property]?.strict ?? true,
          },
        }));
      };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-lop-" + className,
      "Chuyên cần lớp " + className,
      attendanceStudent
    );
  };

  const handeSuccessEdit = async (isSuccess: boolean) => {
    if (isSuccess) {
      const idClass = id ? parseInt(id, 10) : defaultClassId;
      await dispatch(fetchAttendanceClass(idClass));
      setDialogOpen(false);
      setSelectedAttendanceStudent(initSelectedStudent)
    }
  };
  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterAttendanceClasse(attendanceStudent));
      return;
    }

    const filterData: AttendanceStudent[] = CommonUtil.filterData(attendanceStudent, filter);
    dispatch(setFilterAttendanceClasse(filterData));
  };

  const handleReload = () => { };

  useEffect(() => {
    const idClass = id ? parseInt(id, 10) : defaultClassId;
    dispatch(fetchAttendanceClass(idClass));
  }, []);
  return (
    <ContentLayout>
      <BreadcrumbsComponent
        breadcrumbs={breadcrumbAttendanceToday}
        haveAddButton={false}
      ></BreadcrumbsComponent>
      <Paper
        sx={{
          width: "100%",
          padding: "10px 10px 10px 10px",
          boxSizing: "border-box",
          marginTop: "30px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
        }}
      >
        <TableTitle
          title={`Chuyên cần lớp ${className}`}
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
              id={"status"}
              label="Trạng thái"
              minWidth={120}
              options={statusAttendace}
              value={filter.status.value}
              onChange={handleChangeFilter("status")}
            />
            <CustomInput
              label={"Tên"}
              value={filter.name.value}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
              style={{ maxWidth: "3000px" }}
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

          <NavigationTable count={curentData.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceClassTable} />
            {isLoading ? (
              <TableRowsLoader rowsNum={10} numColumns={7} />
            ) : (
              <TableRows
                rows={curentData.slice(
                  current * perPage,
                  current * perPage + perPage
                )}
                headers={headerAttendanceClassTable}
                onEditClick={editStudent}
              />
            )}
          </Table>
          <AttendanceStudentEdit
            isOpen={isDialogOpen}
            selectedAttendanceStudent={selectedAttendanceStudent}
            handleClose={handleClose}
            onClickEdit={handeSuccessEdit}
          ></AttendanceStudentEdit>
        </TableContainer>
      </Paper>
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

export default AttendanceClass;
