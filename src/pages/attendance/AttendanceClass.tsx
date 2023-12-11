import { Cached, CloudUpload } from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  Link,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
import TableHeaders from "../../components/common/Table/TableHeader";
import { headerAttendanceClassTable } from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { AppDispatch, useSelector } from "../../store/configstore";

import { useParams } from "react-router-dom";
import { StatusAttendanceType } from "../../Type/Utils";
import { StatusAttendanceTypeList } from "../../constant/constant";
import { AttendanceStudent } from "../../models/attendance";
import CommonUtil from "../../utils/export";
import AttendanceStudentEdit from "./edit/AttendanceStudent";
import DetailRows from "./part/DetailAttendanceClass";
import { setSelectedStudent } from "../../store/attendances/slice";

interface GroupFilterSearch {
  status: string;
  name: string;
  phone: string;
}

const AttendanceClass = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const attendanceStudent: AttendanceStudent[] = useSelector(
    (state) => state.attendance.attendanceClass.attendanceStudent
  );

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

  const status: OptionSelect[] = [
    {
      value: StatusAttendanceType.PRESENT,
      label: "Có mặt",
    },
    {
      value: StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION,
      label:
        StatusAttendanceTypeList[
          StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION
        ],
    },
    {
      value: StatusAttendanceType.ABSENCE_WITH_PERMISSION,
      label:
        StatusAttendanceTypeList[StatusAttendanceType.ABSENCE_WITH_PERMISSION],
    },
    {
      value: StatusAttendanceType.LATE,
      label: StatusAttendanceTypeList[StatusAttendanceType.LATE],
    },
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

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-lop-" + className,
      "Chuyên cần lớp " + className,
      attendanceStudent
    );
  };

  const today = new Date();
  const formattedDayName = format(today, "EEEE", { locale: vi });
  const formattedMonthName = format(today, "MMMM", { locale: vi });
  const dayValue = today.getDate();
  return (
    <ContentLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="#4154F1" href="/attendanceToday">
            <Typography variant="h5" style={{ color: "#4154F1" }}>
              Chuyên cần hôm nay
            </Typography>
          </Link>
          <Typography color="text.primary">
            {formattedDayName} ngày {dayValue} {formattedMonthName} năm{" "}
            {today.getFullYear()}
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Paper
        sx={{
          width: "100%",
          padding: "10px 10px 10px 10px",
          boxSizing: "border-box",
          marginTop: "30px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
        }}
      >
        <GroupFilter>
          <Typography
            sx={{ margin: "0" }}
            variant="h6"
            style={{ color: "rgb(227 113 12)" }}
          >
            Chuyên cần lớp {className}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent={"end"}>
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
              id={"status"}
              label="Trạng thái"
              minWidth={120}
              options={status}
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
            <DetailRows
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

const GroupFilter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export default AttendanceClass;
