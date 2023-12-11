import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import EditIconButton from "../../../components/common/Button/EditIconButton";

interface Props {
  rows: AttendanceReport[];
  headers: Column[];
  onDetailClick: (id: number) => void;
}

import { Column } from "../../../constant/headerTable";
import { AttendanceReport } from "../../../models/attendance";

const TableRows: React.FC<Props> = (props: Props) => {
  return (
    <TableBody>
      {props.rows.map((row, index) => (
        <TableRow key={index} hover role="checkbox" tabIndex={-1}>
          {props.headers
            .filter((column) => column.id !== "action")
            .map((column) => {
              const value = row[column.id];
              return (
                <TableCell
                  style={{
                    // maxWidth: column.maxWidth,
                    textAlign: column.align,
                    boxSizing: "border-box",
                    // padding: "8px 16px",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.format && typeof value === "number"
                    ? column.format(value)
                    : value}
                </TableCell>
              );
            })}
          <TableCell
            align="center"
            style={{
              gap: "30px",
            }}
          >
            <EditIconButton id={row.id} onIconClick={props.onDetailClick} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableRows;
