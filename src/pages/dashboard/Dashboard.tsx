import {
  ClassOutlined,
  EmojiPeople,
  PersonAdd,
  PersonOff,
  PersonRemove,
  WatchLater,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import { StatusAttendanceType } from "../../Type/Utils";
import TableHeaders from "../../components/common/Table/TableHeader";
import BreadcrumbsComponent from "../../components/common/Utils";
import { breadcrumbDashboardItems } from "../../constant/breadcrums";
import { StatusAttendanceTypeList } from "../../constant/constant";
import {
  Column,
  headerAttendanceClassDashboardTable,
  headerDashboardTable,
} from "../../constant/headerTable";
import { AttendanceStudent } from "../../models/attendance";
import { useSelector } from "../../store/configstore";
import { Roles } from "../../utils/role";
import "./Dashboard.scss";
import CartReport from "./parts/Cart";

const Container = styled.div`
  padding: 10px 20px 0px 20px;
`;

const ReportLayout = styled.div`
  width: 100%;
`;

const ChartLayout = styled.div`
  display: flex;
  margin-top: 15px;
  height: calc(100vh - 300px);
  gap: 20px;
  margin-bottom: 30px;
`;

const iconStyle = {
  color: "green",
  width: "45px",
  height: "45px",
};

let headers: Column[] = [];
export default function Dashboard() {
  const data = useSelector((state) => state.dashBoard.data);
  const role = useSelector((state) => state.authentication.role);
  const attendanceStudent: AttendanceStudent[] = useSelector(
    (state) => state.attendance.attendanceClass.attendanceStudent
  );

  headers =
    role == Roles.TEACHER
      ? headerAttendanceClassDashboardTable
      : headerDashboardTable;

  const rows = role == Roles.TEACHER ? attendanceStudent : data;
  return (
    <Container>
      {/* <Breadcrumbs aria-label="breadcrumb">
        <Typography variant="h6" style={{ color: "#4154F1" }}>
          Trang chủ
        </Typography>
        <Typography color="text.primary">Phân tích</Typography>
      </Breadcrumbs> */}
      <BreadcrumbsComponent
        breadcrumbs={breadcrumbDashboardItems}
        haveAddButton={false}
      ></BreadcrumbsComponent>
      <Report></Report>
      <ChartLayout>
        <Chart />
        <TableReport rows={rows} />
      </ChartLayout>
    </Container>
  );
}

const Report = () => {
  return (
    <ReportLayout>
      <CartReport
        value="6"
        description="Tổng số lớp"
        icon={<ClassOutlined style={iconStyle} />}
      />
      <CartReport
        value="1350"
        description="Tổng số học sinh"
        icon={<EmojiPeople style={iconStyle} />}
      />
      <CartReport
        value="1300"
        description="Số lượng có mặt"
        icon={<PersonAdd style={iconStyle} />}
      />
      <CartReport
        value="20"
        description="Vắng có phép"
        icon={<PersonRemove style={iconStyle} />}
      />
      <CartReport
        value="30"
        description="Vắng không phép"
        icon={<PersonOff style={iconStyle} />}
      />
      <CartReport
        value="5"
        description="Số lượng đi trễ"
        icon={<WatchLater style={iconStyle} />}
      />
    </ReportLayout>
  );
};

const Chart = () => {
  const data = [
    { name: "6A1", uv: 400, pv: 2400, amt: 2400 },
    { name: "6A2", uv: 300, pv: 4567, amt: 2400 },
    { name: "7A1", uv: 200, pv: 1398, amt: 2400 },
    { name: "7A2", uv: 278, pv: 9800, amt: 2400 },
    { name: "8A1", uv: 189, pv: 3908, amt: 2400 },
    { name: "8A2", uv: 239, pv: 4800, amt: 2400 },
  ];
  return (
    <ResponsiveContainer className="chart">
      <BarChart data={data} margin={{ right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" label="Lớp" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TableReport = ({ rows }: { rows: any[] }) => {
  return (
    <Paper
      className="table"
      sx={{ overflow: "hidden", width: "50%", height: "100%" }}
    >
      <Typography variant="h6" style={{ color: "rgb(227, 113, 12)" }}>
        Thống kê
      </Typography>
      <TableContainer sx={{ maxHeight: 400, paddingBottom: "30px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHeaders headers={headers} />
          <TableBody>
            {rows.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.class}>
                {headers.map((column) => {
                  let value = row[column.id];
                  if (column.id === "status") {
                    const type: StatusAttendanceType =
                      value as StatusAttendanceType;
                    value = StatusAttendanceTypeList[type];
                  }
                  return (
                    <TableCell
                      style={{
                        minWidth: column.minWidth,
                        textAlign: column.align,
                        boxSizing: "border-box",
                        padding: "8px 16px",
                      }}
                    >
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
