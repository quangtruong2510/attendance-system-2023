import {
  Breadcrumbs,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerAttendanceClassPeriod } from "../../../constant/headerTable";
import { AppDispatch, useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import TableTitle from "../../../components/common/Table/TableTitle";
import { AttendanceClassPeriod } from "../../../models/attendance";
import DetailPeriodRows from "../part/DetailAttendanceClassPeriod";
import TableRows from "../../../components/common/Table/TableRows";

interface GroupFilterSearch {
  name: string;
  phone: string;
}

const PeriodAttendance = () => {
  const { id, from, to } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const studentAttendanceList: AttendanceClassPeriod[] = useSelector(
    (state) => state.attendancesPeriod.data
  );
  const className: string = useSelector(
    (state) => state.attendancesPeriod.nameClass
  );

  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<GroupFilterSearch>({
    phone: "",
    name: "",
  });

  const handleReload = () => {};

  useEffect(() => {
    const payload = {
      classId: id,
      from: from,
      to: to,
    };
    // dispatch(fetchPeriodAttendanceClass(payload));
  }, []);

  const onDetailClick = (idStudent: number) => {
    navigate(`/attendance/student/${idStudent}/${from}/${to}`);
  };

  const handleChangeFilter =
    (property: keyof GroupFilterSearch) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
      setFilter((prev) => ({ ...prev, [property]: event.target.value }));
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
          <Typography variant="h5" style={{ color: "rgb(0, 130, 146)" }}>
            Thống kê chuyên cần
          </Typography>
          <Typography color="textPrimary">{`(${from} ~ ${to})`}</Typography>
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
          title={`Lớp ${className}`}
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
              value={filter.name}
              onChange={handleChangeFilter("name")}
              placeholder={"Họ và tên"}
              fullWidth={false}
              style={{ maxWidth: "3000px" }}
            />
            <CustomInput
              label={"SĐT"}
              value={filter.name}
              onChange={handleChangeFilter("phone")}
              placeholder={"Số điện thoại"}
              fullWidth={false}
              style={{ maxWidth: "3000px" }}
            />
          </Stack>

          <NavigationTable count={studentAttendanceList.length} />
        </Stack>

        <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
          <Table
            className="border-collapse"
            stickyHeader
            aria-label="sticky table"
          >
            <TableHeaders headers={headerAttendanceClassPeriod} />
            <TableRows
              rows={studentAttendanceList.slice(
                current * perPage,
                current * perPage + perPage
              )}
              headers={headerAttendanceClassPeriod}
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

export default PeriodAttendance;
