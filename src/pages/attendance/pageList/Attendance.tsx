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
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import SelectDropdown from "../../../components/common/Select/SelectDropdown";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerAttendanceReportTable } from "../../../constant/headerTable";
import { OptionSelect } from "../../../models/Utils";
import { useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { useNavigate } from "react-router-dom";
import DateRangePickerCommon from "../../../components/common/FormInput/SingleInputDateRangePickerWithAdornment";
import { AttendanceReport } from "../../../models/attendance";
import TableRows from "../../../components/common/Table/TableRows";
// import TableRows from "../part/TableRows";

interface GroupFilterSearch {
  class: string;
  grade: string;
  from: string;
  to: string;
}

const AttendanceList = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  const attendanceList: AttendanceReport[] = useSelector(
    (state) => state.attendance.attendanceClasses
  );

  const { current, perPage } = useSelector((state) => state.pagination);

  const [filter, setFilter] = useState<GroupFilterSearch>({
    class: "",
    grade: "",
    from: "3",
    to: "4",
  });

  const handleDateUpdate = (startDay: string, endDay: string) => {
    setFilter((prev) => ({ ...prev, from: startDay, to: endDay }));
  };

  const onDetailClick = (idClass: number) => {
    navigate(`/attendance/class/${idClass}/${filter.from}/${filter.to}`);
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

  return (
    <ContentLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" style={{ color: "rgb(0, 130, 146)" }}>
            Thống kê
          </Typography>
        </Breadcrumbs>
      </Stack>
      <Paper
        sx={{
          width: "100%",
          padding: "10px 10px 10px 10px",
          boxSizing: "border-box",
          marginTop: "20px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
        }}
      >
        <GroupFilter>
          <Typography
            sx={{ margin: "0" }}
            variant="h6"
            style={{ color: "rgb(227 113 12)" }}
          >
            Thông tin chuyên cần của các lớp
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
            <DateRangePickerCommon onUpdateDateRange={handleDateUpdate} />
          </Stack>

          <NavigationTable count={attendanceList.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceReportTable} />
            <TableRows
              rows={attendanceList.slice(
                current * perPage,
                current * perPage + perPage
              )}
              headers={headerAttendanceReportTable}
              onEditClick={onDetailClick}
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
