import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import React, { ReactNode } from "react";
import { Column } from "../../../constant/headerTable";
import TableHeaders from "./TableHeader";
import TableRowsLoader from "./TableRowsLoader";

interface Props {
  children: ReactNode;
  headers: Column[];
  isLoading: boolean;
}
export interface PaginationState {
  current: number;
  perPage: number;
}

const TableList: React.FC<Props> = ({ headers, isLoading, children }) => {
  return (
    <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
      <Table className="border-collapse" stickyHeader aria-label="sticky table">
        <TableHeaders headers={headers} />
        <TableBody>
          {isLoading ? (
            <TableRowsLoader rowsNum={10} numColumns={5} />
          ) : (
            <>{children}</>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
