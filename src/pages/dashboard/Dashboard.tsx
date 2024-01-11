import {
  ClassOutlined,
  EmojiPeople,
  PersonAdd,
  PersonOff,
  PersonRemove,
  WatchLater,
} from "@mui/icons-material";
import { Tab, Tabs, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { format, subDays } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
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
import TableList from "../../components/common/Table/TableList";
import BreadcrumbsComponent from "../../components/common/Utils";
import { breadcrumbDashboardItems } from "../../constant/breadcrums";
import {
  headerDashboardTable
} from "../../constant/headerTable";
import { AttendanceReport } from "../../models/attendance";
import { fetchAttendanceClassPeriod } from "../../store/attendances/operation";
import { AppDispatch, useSelector } from "../../store/configstore";
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

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  // const attendanceClass = useSelector((state) => state.dashBoard.data);
  const role = useSelector((state) => state.authentication.role);
  const attendanceClasses: AttendanceReport[] = useSelector(
    (state) => state.attendance.attendanceClasses
  );
  const isLoading = useSelector((state) => state.attendance.isLoading);
  const summary = useSelector((state) => state.attendance.summary);

  useEffect(() => {
    let period = {
      from: format(new Date(), 'dd-MM-yyyy'),
      to: format(new Date(), 'dd-MM-yyyy'),
    }
    dispatch(fetchAttendanceClassPeriod(period));
  }, []);

  return (
    <Container>
      <BreadcrumbsComponent
        breadcrumbs={breadcrumbDashboardItems}
        haveAddButton={false}
      ></BreadcrumbsComponent>
      <Report summary={summary} role={role}></Report>
      <ChartLayout>
        <Chart />
        <TableReport rows={attendanceClasses} isLoading={isLoading} />
      </ChartLayout>
    </Container>
  );
}

const Report = ({ summary, role }: { summary: any, role: any }) => {
  return (
    <ReportLayout>
      <CartReport
        value={summary.total_classes}
        description={role === Roles.TEACHER ? "Tên lớp" : "Tổng số lớp"}
        icon={<ClassOutlined style={iconStyle} />}
      />
      <CartReport
        value={summary.total_students}
        description="Tổng số học sinh"
        icon={<EmojiPeople style={iconStyle} />}
      />
      <CartReport
        value={summary.total_present}
        description="Số lượng có mặt"
        icon={<PersonAdd style={iconStyle} />}
      />
      <CartReport
        value={summary.total_absence_with_permission}
        description="Vắng có phép"
        icon={<PersonRemove style={iconStyle} />}
      />
      <CartReport
        value={summary.total_absence_without_permission}
        description="Vắng không phép"
        icon={<PersonOff style={iconStyle} />}
      />
      <CartReport
        value={summary.total_late}
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

interface Props {
  rows: any,
  isLoading: boolean
}

const TableReport: React.FC<Props> = ({ rows, isLoading }) => {
  const [value, setValue] = React.useState("today");
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = async (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(event);

    let period = {
      from: "",
      to: "",
    }
    if (newValue == "today") {
      period.from = format(new Date(), 'dd-MM-yyyy');
      period.to = format(new Date(), 'dd-MM-yyyy');
    } else if (newValue == "week") {
      const sevenDaysAgo = subDays(new Date(), 7);
      period.from = format(sevenDaysAgo, 'dd-MM-yyyy')
      period.to = format(new Date(), 'dd-MM-yyyy');
    } else {
      const oneMonthAgo = subDays(new Date(), 30);
      period.from = format(oneMonthAgo, 'dd-MM-yyyy')
      period.to = format(new Date(), 'dd-MM-yyyy');
    }
    dispatch(fetchAttendanceClassPeriod(period))

  };
  const TabDay = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;
  return (
    <Paper
      className="table"
      sx={{ overflow: "hidden", width: "50%", height: "100%" }}
    >
      <TabDay >
        <Typography variant="h6" style={{ color: "rgb(227, 113, 12)" }}>
          Thống kê
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="today" label="Hôm nay" />
          <Tab value="week" label="Tuần" />
          <Tab value="month" label="Tháng" />
        </Tabs>
      </TabDay>

      <TableList
        isLoading={isLoading}
        headers={headerDashboardTable}
        currentData={rows}
      ></TableList>
    </Paper>
  );


};
