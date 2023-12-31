import {
  Breadcrumbs,
  Button,
  Paper,
  Stack,
  Table,
  TableContainer,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerDetailAttendanceStudentPeriod } from "../../../constant/headerTable";
import { AppDispatch, useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { FilterCriteria } from "../../../Type/Utils";
import TableRows from "../../../components/common/Table/TableRows";
import TableRowsLoader from "../../../components/common/Table/TableRowsLoader";
import TableTitle from "../../../components/common/Table/TableTitle";
import { DetailAttendanceStudent } from "../../../models/attendance";
import { fetchDetailAttendanceStudent } from "../../../store/detailAttendanceStudent/operation";
import { setFilterDetailAttendanceStudent } from "../../../store/detailAttendanceStudent/slice";

const DetailAttendanceStudentPeriod = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");
  const studentId = searchParams.get("student_id");

  const dispatch = useDispatch<AppDispatch>();
  const studentAttendanceList: DetailAttendanceStudent[] = useSelector((state) => state.detailAttendancesStudent.data);
  const currentData: DetailAttendanceStudent[] = useSelector((state) => state.detailAttendancesStudent.currentData);

  const studentName: string = useSelector((state) => state.detailAttendancesStudent.nameStudent);
  const isLoading = useSelector((state) => state.detailAttendancesStudent.isLoading);

  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<FilterCriteria>({
    day: { value: "", strict: true },
  });

  const handleReload = () => {
    const payload = {
      studentId: studentId,
      from: startDate,
      to: endDate,
    };
    dispatch(fetchDetailAttendanceStudent(payload));
  };

  useEffect(() => {
    const payload = {
      studentId: studentId,
      from: startDate,
      to: endDate,
    };
    dispatch(fetchDetailAttendanceStudent(payload));
  }, []);

  const handleChangeFilter =
    (property: keyof FilterCriteria) =>
      (event: any) => {
        setFilter((prev) => ({
          ...prev,
          [property]: {
            value: (event.target as HTMLInputElement).value,
            strict: false,
          },
        }));
      };
  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterDetailAttendanceStudent(studentAttendanceList));
      return;
    }

    const filterData: DetailAttendanceStudent[] = CommonUtil.filterData(studentAttendanceList, filter);
    dispatch(setFilterDetailAttendanceStudent(filterData));
  };
  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      `chuyen-can-${studentName}-${startDate} ~ ${endDate})`,
      `Chuyên cần ${studentName}`,
      studentAttendanceList
    );
  };

  return (
    <ContentLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" style={{ color: "rgb(0, 130, 146)" }}>
            {`Thống kê chuyên cần`}
          </Typography>
          <Typography color="textPrimary">{`(${startDate} ~ ${endDate})`}</Typography>
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
        <TableTitle
          title={studentName}
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
            <TextField
              fullWidth={true}
              size="small"
              name="dateOfBirth"
              label="Ngày"
              inputProps={{
                min: CommonUtil.formatDate(
                  startDate ? startDate : CommonUtil.getCurrentDate()
                ),
                max: CommonUtil.formatDate(
                  endDate ? endDate : CommonUtil.getCurrentDate()
                ),
                pattern: "\\d{2}-\\d{2}-\\d{4}",
              }}
              InputLabelProps={{ shrink: true }}
              type="date"
              onChange={handleChangeFilter("day")}
            />

            <Button
              style={{
                height: "40px",
                minWidth: "100px",
                width: 150,
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
            <TableHeaders headers={headerDetailAttendanceStudentPeriod} />
            {isLoading ? (
              <TableRowsLoader rowsNum={10} numColumns={7} />
            ) : (
              <TableRows
                rows={currentData.slice(
                  current * perPage,
                  current * perPage + perPage
                )}
                headers={headerDetailAttendanceStudentPeriod}
              />)}
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

export default DetailAttendanceStudentPeriod;
