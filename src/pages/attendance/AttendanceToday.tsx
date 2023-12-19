import { Cached, CloudUpload } from "@mui/icons-material";
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
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import NavigationTable from "../../components/common/Table/NavigationTable";
import TableHeaders from "../../components/common/Table/TableHeader";
import { headerAttendanceTable } from "../../constant/headerTable";
import { OptionSelect } from "../../models/Utils";
import { AppDispatch, useSelector } from "../../store/configstore";
import CommonUtil from "../../utils/export";

import { useNavigate } from "react-router-dom";
import { AttendanceReport } from "../../models/attendance";
import TableRows from "./part/TableRows";
import { Roles } from "../../utils/role";
import AttendanceClass from "./AttendanceClass";
import { fetchStatisticsAttendance } from "../../store/attendances/operation";
import { initializeState } from "../../store/common/pagination";
import { useDispatch } from "react-redux";

interface GroupFilterSearch {
  class: string;
  grade: string;
  name: string;
  phone: string;
}

const AttendanceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const dispatch = useDispatch<AppDispatch>();
  const attendanceList: AttendanceReport[] = useSelector(
    (state) => state.attendance.attendanceClasses
  );
  // const selectedStudent: Student = useSelector(
  //   (state) => state.students.selectedStudent
  // );

  const role = useSelector((state) => state.authentication.role);
  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<GroupFilterSearch>({
    class: "",
    grade: "",
    name: "",
    phone: "",
  });

  const onDetailClick = (id: number) => {
    console.log("onDetailClick", id);

    navigate(`class/${id}`);
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

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-cac-lop",
      "Chuyên cần các lớp",
      attendanceList
    );
  };

  const today = new Date();
  const formattedDayName = format(today, "EEEE", { locale: vi });
  const formattedMonthName = format(today, "MMMM", { locale: vi });
  const dayValue = today.getDate();

  useEffect(() => {
    dispatch(fetchStatisticsAttendance());
  }, []);

  if (role == Roles.TEACHER) {
    return <AttendanceClass></AttendanceClass>
  }

  return (
    <ContentLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" style={{ color: "#4154F1" }}>
            Chuyên cần hôm nay
          </Typography>
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
          marginTop: "20px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px"
        }}
      >
        <GroupFilter>
          <Typography
            sx={{ margin: "0" }}
            variant="h6"
            style={{ color: "rgb(227 113 12)" }}
          >
            Thống kê chuyên cần
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
              label={"GVCN"}
              value={filter.name}
              onChange={handleChangeFilter("name")}
              placeholder={"Tên giáo viên"}
              fullWidth={false}
            />
          </Stack>
          <NavigationTable count={attendanceList.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceTable} />
            <TableRows
              rows={attendanceList.slice(
                current * perPage,
                current * perPage + perPage
              )}
              headers={headerAttendanceTable}
              onDetailClick={onDetailClick}
            />
          </Table>
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

export default AttendanceList;
