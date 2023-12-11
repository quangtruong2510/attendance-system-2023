import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";

import React from "react";
import { Column } from "../../../constant/headerTable";
import TableHeader from "./TableHeader";

interface Props {
  children: React.ReactNode;
  headers: Column[];
  count: number;
}
export interface PaginationState {
  current: number;
  perPage: number;
}

const TableList: React.FC<Props> = (props: Props) => {
  return (
    <TableContainer sx={{ paddingBottom: "30px", width: "100%" }}>
      <Table className="border-collapse" stickyHeader aria-label="sticky table">
        {/* <TableHeader count={props.count}></TableHeader> */}

        <TableBody>{props.children}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableList;
