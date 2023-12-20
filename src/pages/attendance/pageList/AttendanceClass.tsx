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
import { CustomInput } from "../../../components/common/FormInput/InputField";
import SelectDropdown from "../../../components/common/Select/SelectDropdown";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerAttendanceClassTable } from "../../../constant/headerTable";
import { AppDispatch, useSelector } from "../../../store/configstore";

import { useParams } from "react-router-dom";
import TableTitle from "../../../components/common/Table/TableTitle";
import BreadcrumbsComponent from "../../../components/common/Utils";
import { statusAttendace } from "../../../constant/Utils";
import { breadcrumbAttendanceToday } from "../../../constant/breadcrums";
import { AttendanceStudent } from "../../../models/attendance";
import { fetchAttendanceClass } from "../../../store/attendances/operation";
import { setSelectedStudent } from "../../../store/attendances/slice";
import CommonUtil from "../../../utils/export";
import AttendanceStudentEdit from "../edit/AttendanceStudent";
import DetailRows from "../part/DetailAttendanceClass";
import TableRows from "../../../components/common/Table/TableRows";

interface GroupFilterSearch {
  status: string;
  name: string;
  phone: string;
}

const AttendanceClass = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const attendanceStudent: AttendanceStudent[] = useSelector(
    (state) => state.attendanceClass.data
  );

  const { id } = useParams();

  const selectedAttendanceStudent: AttendanceStudent | null = useSelector(
    (state) => state.attendance.attendanceClass.selectedStudent
  );

  const className = useSelector(
    (state) => state.attendance.attendanceClass.nameClass
  );

  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<GroupFilterSearch>({
    phone: "",
    name: "",
    status: "",
  });

  const handleClose = () => {
    setDialogOpen(false);
  };
  const editStudent = (id: number) => {
    dispatch(setSelectedStudent(id));
    setDialogOpen(true);
  };

  const handleChangeFilter =
    (property: keyof GroupFilterSearch) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, [property]: event.target.value }));
    };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-lop-" + className,
      "Chuyên cần lớp " + className,
      attendanceStudent
    );
  };

  const handleReload = () => {};

  useEffect(() => {
    const idClass = id ? parseInt(id, 10) : 0;
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
              value={filter.status}
              onChange={handleChangeFilter("status")}
            />
            <CustomInput
              label={"Tên"}
              value={filter.name}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
              style={{ maxWidth: "3000px" }}
            />
          </Stack>

          <NavigationTable count={attendanceStudent.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceClassTable} />
            <TableRows
              rows={attendanceStudent.slice(
                current * perPage,
                current * perPage + perPage
              )}
              headers={headerAttendanceClassTable}
              onEditClick={editStudent}
            />
          </Table>
          <AttendanceStudentEdit
            isOpen={isDialogOpen}
            selectedAttendanceStudent={selectedAttendanceStudent}
            handleClose={handleClose}
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
