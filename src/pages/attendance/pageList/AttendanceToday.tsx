import {
  Button,
  Paper,
  SelectChangeEvent,
  Stack
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import SelectDropdown from "../../../components/common/Select/SelectDropdown";
import NavigationTable from "../../../components/common/Table/NavigationTable";
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
import { Search } from "@mui/icons-material";
import { FilterCriteria } from "../../../Type/Utils";
import TableList from "../../../components/common/Table/TableList";
import { setFilterAttendanceClasses } from "../../../store/attendances/slice";
import { filterClassesByGrade } from "../../../store/initdata/slice";
import AttendanceAllClass from "../edit/AttendanceAllClass";
import AttendanceClass from "./AttendanceClass";

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

  const [filter, setFilter] = useState<FilterCriteria>({
    gradeId: { value: "", strict: true },
    classId: { value: "", strict: true },
    homeroomTeacher: { value: "", strict: false },
  });
  const [selectedClassId, setSelectedClass] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onDetailClick = (id: number) => {
    navigate(`class/${id}`);
  };

  const onAttendanceAllClassClick = (id: number) => {
    setSelectedClass(id)
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSuccessEdit = async (isSuccess: boolean) => {
    if (isSuccess) {
      await dispatch(fetchStatisticsAttendance());
      setDialogOpen(false);
    }
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

    const filterData: AttendanceReport[] = CommonUtil.filterData(
      attendanceList,
      filter
    );
    dispatch(setFilterAttendanceClasses(filterData));
  };

  const handleExport = async () => {
    await CommonUtil.exportToExcel(
      "chuyen-can-cac-lop",
      "Chuyên cần các lớp",
      attendanceList
    );
  };

  const handleReload = () => {
    dispatch(fetchStatisticsAttendance());
  };
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
        <TableList
          isLoading={isLoading}
          headers={headerAttendanceTable}
          currentData={currentAttendanceClasses}
          onEditClick={onDetailClick}
          onAttendanceAllClassClick={onAttendanceAllClassClick}
        ></TableList>
        <AttendanceAllClass
          isOpen={isDialogOpen}
          classId={selectedClassId}
          handleClose={handleClose}
          onClickEdit={handleSuccessEdit}
        ></AttendanceAllClass>
      </Paper>
    </ContentLayout>
  );
};

const ContentLayout = styled("div")(() => ({
  padding: "15px 20px 0px 20px",
  overflowY: "auto",
}));

export default AttendanceToday;
