import { Table, TableBody, TableContainer } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Column } from "../../../constant/headerTable";
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
                style={{
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

export default TableCommon;
