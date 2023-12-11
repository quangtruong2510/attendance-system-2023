import React, { useEffect } from "react";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  initializeState,
  setCurrentPage,
  setPerPage,
} from "../../../store/common/pagination";
import { useSelector } from "../../../store/configstore";
import TablePaginationActions from "./TablePaginationActions";
import { Column } from "../../../constant/headerTable";
import { Table, TableBody, TableContainer } from "@mui/material";
import NavigationTable from "./NavigationTable";

interface Props {
  headers: Column[];
  children: React.ReactNode;
  count: number;
}

const TableCommon: React.FC<Props> = ({ headers, count, children }) => {
  return (
    <TableContainer
      sx={{ maxHeight: 560, paddingBottom: "30px", width: "100%" }}
    >
      <NavigationTable count={count} />
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {headers.map((column) => (
              <TableCell
                key={column.id}
                // align={column.align}
                style={{
                  // minWidth: column.minWidth,
                  fontWeight: "bold",
                  boxSizing: "border-box",
                  padding: "8px",
                }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};

const StyledTableHead = styled(TableRow)`
  background-color: #a5adb7;
`;

export default TableCommon;
