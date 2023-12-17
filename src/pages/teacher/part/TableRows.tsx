import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import DeleteButton from "../../../components/common/Button/DeleteButton";
import EditIconButton from "../../../components/common/Button/EditIconButton";
interface Props {
  rows: Teacher[];
  headers: Column[];
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

import { Column } from "../../../constant/headerTable";
import { Teacher } from "../../../models/teacher";

const TableRows: React.FC<Props> = (props: Props) => {
  return (
    <>
      {props.rows.map((row, index) => (
        <TableRow key={index} hover role="checkbox" tabIndex={-1}>
          {props.headers
            .filter((column) => column.id !== "action")
            .map((column) => {
              let value = row[column.id];
              if (column.id == "id") {
                value = index + 1
              }
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
            <EditIconButton id={row.id ? row.id : 0} onIconClick={props.onEditClick} />
            <DeleteButton id={row.id ? row.id : 0} onIconClick={props.onDeleteClick} />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
};

export default TableRows;
