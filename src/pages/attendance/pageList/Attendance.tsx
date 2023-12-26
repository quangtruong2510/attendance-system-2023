import { Search } from "@mui/icons-material";
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
import styled from "styled-components";
import SelectDropdown from "../../../components/common/Select/SelectDropdown";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerAttendanceReportTable } from "../../../constant/headerTable";
import { OptionSelect } from "../../../models/Utils";
import { AppDispatch, useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { format, subDays } from "date-fns";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FilterCriteria } from "../../../Type/Utils";
import DateRangePickerCommon from "../../../components/common/FormInput/SingleInputDateRangePickerWithAdornment";
import TableRows from "../../../components/common/Table/TableRows";
import TableRowsLoader from "../../../components/common/Table/TableRowsLoader";
import TableTitle from "../../../components/common/Table/TableTitle";
import { AttendanceReport } from "../../../models/attendance";
import { fetchAttendanceClassPeriod, fetchStatisticsAttendance } from "../../../store/attendances/operation";
import { setFilterAttendanceClasses } from "../../../store/attendances/slice";
import { initializeState } from "../../../store/common/pagination";
import { filterClassesByGrade, initializeClassState } from "../../../store/initdata/slice";
import { Roles } from "../../../utils/role";

interface GroupFilterSearch {
  from: string;
  to: string;
}

const AttendanceList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const attendanceList: AttendanceReport[] = useSelector(
    (state) => state.attendance.attendanceClasses
  );
  const currentaAtendanceList: AttendanceReport[] = useSelector(
    (state) => state.attendance.currentAttendanceClasses
  );
  const role = useSelector(
    (state) => state.authentication.role
  );
  let className = role === Roles.TEACHER ? useSelector((state) => state.authentication.className) : ""

  const isLoading = useSelector((state) => state.attendance.isLoading);
  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<FilterCriteria>({
    classId: { value: "", strict: true },
    gradeId: { value: "", strict: true },
  });
  const sevenDaysAgo = subDays(new Date(), 7);
  const [period, setPeriod] = useState<GroupFilterSearch>({
    from: format(sevenDaysAgo, 'dd-MM-yyyy'),
    to: CommonUtil.getCurrentDate(),
  })

  const grades: OptionSelect[] = useSelector(
    (state) => state.initial.gradeList
  );
  let classes: OptionSelect[] = useSelector(
    (state) => state.initial.selectedClasses
  );

  const handleDateUpdate = async (startDay: string, endDay: string) => {
    const period = {
      from: startDay,
      to: endDay,
    }
    await dispatch(fetchAttendanceClassPeriod(period))
    setPeriod((prev) => ({ ...prev, from: startDay, to: endDay }));

  };

  const onDetailClick = (idClass: number) => {
    navigate(
      `/attendance/class/${idClass}?start_date=${period.from}&end_date=${period.to}`
    );
  };

  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterAttendanceClasses(attendanceList));
      return;
    }

    const filterData: AttendanceReport[] = CommonUtil.filterData(attendanceList, filter);
    dispatch(setFilterAttendanceClasses(filterData));
  };

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

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-cac-lop",
      "Chuyên cần các lớp",
      attendanceList
    );
  };

  const handleReload = async () => {
    dispatch(fetchStatisticsAttendance());
  };

  useEffect(() => {
    dispatch(initializeClassState());
    dispatch(initializeState());
    dispatch(fetchStatisticsAttendance());
  }, []);

  return (
    <ContentLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Typography variant="h5" style={{ color: "rgb(0, 130, 146)" }}>
            Thống kê
          </Typography>
        </Breadcrumbs>
      </Stack>
      {role === Roles.ADMIN && (<Stack alignItems={"end"}>
        <DateRangePickerCommon onUpdateDateRange={handleDateUpdate} />
      </Stack>)}
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
          title={role === Roles.TEACHER ? `Thông tin chuyên cần lớp ${className}` : "Thông tin chuyên cần của các lớp"}
          handleExport={handleExport}
          reload={handleReload}
        />

        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
        >
          {role === Roles.ADMIN && (<Stack
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
            <SelectDropdown
              id={"class"}
              label="Lớp"
              options={classes}
              value={filter.classId.value}
              onChange={handleChangeFilter("classId")}
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
          </Stack>)}
          {role === Roles.TEACHER && (<Stack alignItems={"end"}>
            <DateRangePickerCommon onUpdateDateRange={handleDateUpdate} />
          </Stack>)}
          <NavigationTable count={currentaAtendanceList.length} />
        </Stack>
        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceReportTable} />
            {isLoading ? (
              <TableRowsLoader rowsNum={10} numColumns={8} />
            ) : (
              <TableRows
                rows={currentaAtendanceList.slice(
                  current * perPage,
                  current * perPage + perPage
                )}
                headers={headerAttendanceReportTable}
                onEditClick={onDetailClick}
              />
            )}
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

export default AttendanceList;
