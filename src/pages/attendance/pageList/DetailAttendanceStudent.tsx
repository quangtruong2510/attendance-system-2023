import {
  Breadcrumbs,
  Paper,
  SelectChangeEvent,
  Stack,
  Table,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components";
import NavigationTable from "../../../components/common/Table/NavigationTable";
import TableHeaders from "../../../components/common/Table/TableHeader";
import { headerDetailAttendanceStudentPeriod } from "../../../constant/headerTable";
import { useSelector } from "../../../store/configstore";
import CommonUtil from "../../../utils/export";

import { useParams } from "react-router-dom";
import TableTitle from "../../../components/common/Table/TableTitle";
import { DetailAttendanceStudent } from "../../../models/attendance";
import DetailPeriodRows from "../part/DetailAttendanceClassPeriod";
import TableRows from "../../../components/common/Table/TableRows";

interface GroupFilterSearch {
  dayOfBirth: string;
}

const DetailAttendanceStudentPeriod = () => {
  const { id, from, to } = useParams();
  // const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  const studentAttendanceList: DetailAttendanceStudent[] = useSelector(
    (state) => state.detailAttendancesStudent.data
  );
  const studentName: string = useSelector(
    (state) => state.detailAttendancesStudent.nameStudent
  );

  const { current, perPage } = useSelector((state) => state.pagination);
  const [filter, setFilter] = useState<GroupFilterSearch>({
    dayOfBirth: "",
  });

  const handleReload = () => {};

  useEffect(() => {
    const payload = {
      studentId: id,
      from: from,
      to: to,
    };
    // dispatch(fetchPeriodAttendanceClass(payload));
  }, []);

  const onDetailClick = (idClass: number) => {
    // navigate(`/attendance/${idClass}/${filter.from}/${filter.to}`);
  };

  const handleFilterChange =
    (property: keyof GroupFilterSearch) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement> | any) => {
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
            {`Thống kê chuyên cần`}
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
              value={filter.dayOfBirth}
              InputLabelProps={{ shrink: true }}
              type="date"
              onChange={handleFilterChange("dayOfBirth")}
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
            <TableHeaders headers={headerDetailAttendanceStudentPeriod} />
            <TableRows
              rows={studentAttendanceList.slice(
                current * perPage,
                current * perPage + perPage
              )}
              headers={headerDetailAttendanceStudentPeriod}
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

export default DetailAttendanceStudentPeriod;
