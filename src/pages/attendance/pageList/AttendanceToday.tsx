import {
  Button,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import SelectDropdown from "../../../components/common/Select/SelectDropdown";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerAttendanceTable } from "../../../constant/headerTable";
import { OptionSelect } from "../../../models/Utils";
import { AppDispatch, useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TableTitle from "../../../components/common/Table/TableTitle";
import BreadcrumbsComponent from "../../../components/common/Utils";
import { breadcrumbAttendanceToday } from "../../../constant/breadcrums";
import { AttendanceReport } from "../../../models/attendance";
import { fetchStatisticsAttendance } from "../../../store/attendances/operation";
import { Roles } from "../../../utils/role";
// import TableRows from "../part/TableRows";
import AttendanceClass from "./AttendanceClass";
import TableRows from "../../../components/common/Table/TableRows";
import { FilterCriteria } from "../../../Type/Utils";
import { filterClassesByGrade } from "../../../store/initdata/slice";
import { Search } from "@mui/icons-material";
import { setFilterAttendanceClasses } from "../../../store/attendances/slice";
import TableRowsLoader from "../../../components/common/Table/TableRowsLoader";

const AttendanceToday = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  // const dispatch = useDispatch<AppDispatch>();
  const attendanceList: AttendanceReport[] = useSelector(
    (state) => state.attendance.attendanceClasses
  );
  const currentAttendanceClasses: AttendanceReport[] = useSelector(
    (state) => state.attendance.currentAttendanceClasses
  );
  const grades: OptionSelect[] = useSelector(
    (state) => state.initial.gradeList
  );
  let classes: OptionSelect[] = useSelector(
    (state) => state.initial.selectedClasses
  );
  const isLoading = useSelector((state) => state.attendance.isLoading);

  const role = useSelector((state) => state.authentication.role);
  if (role == Roles.TEACHER) {
    return <AttendanceClass></AttendanceClass>;
  }

  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<FilterCriteria>({
    gradeId: { value: "", strict: true },
    classId: { value: "", strict: true },
    homeroomTeacher: { value: "", strict: false },
  });

  const onDetailClick = (id: number) => {
    navigate(`class/${id}`);
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

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-cac-lop",
      "Chuyên cần các lớp",
      attendanceList
    );
  };

  const handleReload = () => { dispatch(fetchStatisticsAttendance()) };
  useEffect(() => {
    dispatch(fetchStatisticsAttendance());
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
          marginTop: "20px",
          boxShadow: "rgba(99, 99, 99, 0.4) 0px 2px 8px 0px",
        }}
      >
        <TableTitle
          title="Thống kê chuyên cần"
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
            <CustomInput
              label={"GVCN"}
              value={filter.homeroomTeacher.value}
              onChange={handleChangeFilter("homeroomTeacher")}
              placeholder={"Tên giáo viên"}
              fullWidth={false}
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
          <NavigationTable count={currentAttendanceClasses.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceTable} />
            {isLoading ? (
              <TableRowsLoader rowsNum={10} numColumns={7} />
            ) : (
              <TableRows
                rows={currentAttendanceClasses.slice(
                  current * perPage,
                  current * perPage + perPage
                )}
                headers={headerAttendanceTable}
                onEditClick={onDetailClick}
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

export default AttendanceToday;
