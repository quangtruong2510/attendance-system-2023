import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import DeleteButton from "../../../components/common/Button/DeleteButton";

interface Props {
  rows: Class[];
  headers: Column[];
  onDeleteClick: (id: number) => void;
}

import { Column } from "../../../constant/headerTable";
import { Class } from "../../../models/class";

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
                    maxWidth: column.maxWidth,
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
          <TableCell
            align="center"
            style={{
              gap: "30px",
            }}
          >
            <DeleteButton id={row.id} onIconClick={props.onDeleteClick} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default TableRows;
