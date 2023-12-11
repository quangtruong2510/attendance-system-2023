import { TableCell } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { Column } from "../../../constant/headerTable";

interface Props {
  headers: Column[];
}

const TableHeaders: React.FC<Props> = ({ headers }) => {
  return (
    <TableHead>
      <TableRow>
        {headers.map((column) => (
          <TableCell
            key={column.id}
            style={{
              textAlign: column.align,
              fontWeight: "bold",
              backgroundColor: "#F6F6FE",
              minWidth: column.minWidth
            }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeaders;
