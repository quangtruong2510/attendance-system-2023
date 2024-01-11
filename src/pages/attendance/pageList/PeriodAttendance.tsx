import {
  Breadcrumbs,
  Button,
  Link,
  Paper,
  SelectChangeEvent,
  Stack,
  Typography
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import { headerAttendanceClassPeriod } from "../../../constant/headerTable";
import { AppDispatch, useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FilterCriteria } from "../../../Type/Utils";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import TableList from "../../../components/common/Table/TableList";
import TableTitle from "../../../components/common/Table/TableTitle";
import { AttendanceClassPeriod } from "../../../models/attendance";
import { fetchPeriodAttendanceClass } from "../../../store/attendancesperiod/operation";
import { setFilterPeriodAttendanceClasses } from "../../../store/attendancesperiod/slice";

const PeriodAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const searchParams = new URLSearchParams(location.search);
  const startDate = searchParams.get("start_date");
  const endDate = searchParams.get("end_date");

  const studentAttendanceList: AttendanceClassPeriod[] = useSelector((state) => state.attendancesPeriod.data);
  const currentData: AttendanceClassPeriod[] = useSelector((state) => state.attendancesPeriod.currentData);
  const isLoading = useSelector((state) => state.attendancesPeriod.isLoading);

  const [filter, setFilter] = useState<FilterCriteria>({
    phone: { value: "", strict: false },
    name: { value: "", strict: false },
  });

  const handleReload = () => {
    const payload = {
      classId: id,
      from: startDate,
      to: endDate,
    };
    dispatch(fetchPeriodAttendanceClass(payload));
  };

  const handleFilterData = () => {
    const allValuesEmpty = Object.values(filter).every((filterItem) => {
      return filterItem.value === "";
    });

    if (allValuesEmpty) {
      dispatch(setFilterPeriodAttendanceClasses(studentAttendanceList));
      return;
    }

    const filterData: AttendanceClassPeriod[] = CommonUtil.filterData(studentAttendanceList, filter);
    dispatch(setFilterPeriodAttendanceClasses(filterData));
  };

  useEffect(() => {
    const payload = {
      classId: id,
      from: startDate,
      to: endDate,
    };
    dispatch(fetchPeriodAttendanceClass(payload));
  }, []);

  const onDetailClick = (idStudent: number) => {
    navigate(
      `/attendance/student?student_id=${idStudent}&start_date=${startDate}&end_date=${endDate}`
    );
  };

  const handleChangeFilter =
    (property: keyof FilterCriteria) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        setFilter((prev) => ({
          ...prev,
          [property]: {
            value: event.target.value,
            strict: false,
          },
        }));
      };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-cac-lop",
      "Chuyên cần các lớp",
      studentAttendanceList
    );
  };

  return (
    <ContentLayout>
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/attendance">
            <Typography variant="h5" style={{ color: "rgb(0, 130, 146)" }}>
              Thống kê
            </Typography>
          </Link>
          <Typography variant="h6" style={{ color: "rgb(0, 130, 146)" }}>
            {`Lớp ${studentAttendanceList[0].className}`}
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
          title={`Chuyên cần lớp ${studentAttendanceList[0].className}`}
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
            <CustomInput
              label={"Tên"}
              value={filter.name.value}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
              style={{ maxWidth: "3000px" }}
            />
            <CustomInput
              label={"SĐT"}
              value={filter.phone.value}
              onChange={handleChangeFilter("phone")}
              placeholder={"Số điện thoại"}
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

          <NavigationTable count={currentData.length} />
        </Stack>
        <TableList
          isLoading={isLoading}
          headers={headerAttendanceClassPeriod}
          currentData={currentData}
          onEditClick={onDetailClick}
        ></TableList>
      </Paper>
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

export default PeriodAttendance;
