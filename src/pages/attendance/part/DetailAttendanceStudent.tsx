import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React from "react";
import EditIconButton from "../../../components/common/Button/EditIconButton";

interface Props {
  rows: AttendanceStudent[];
  headers: Column[];
  onEditClick: (id: number) => void;
}

import { StatusAttendanceType } from "../../../Type/Utils";
import { StatusAttendanceTypeList } from "../../../constant/constant";
import { Column } from "../../../constant/headerTable";
import { AttendanceStudent } from "../../../models/attendance";

const DetailRows: React.FC<Props> = (props: Props) => {
  return (
    <TableBody>
      {props.rows.map((row, index) => (
        <TableRow key={index} hover role="checkbox" tabIndex={-1}>
          {props.headers
            .filter((column) => column.id !== "action")
            .map((column) => {
              let value = row[column.id];
              if (column.id === "status") {
                const type: StatusAttendanceType =
                  value as StatusAttendanceType;
                value = StatusAttendanceTypeList[type];
              }
              return (
                <TableCell
                  style={{
                    maxWidth: column.maxWidth,
                    textAlign: column.align,
                    boxSizing: "border-box",
                    padding: "8px 0px",
                    minWidth: column.minWidth,
                    fontSize: 13,
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
            <EditIconButton
              id={row.id}
              onIconClick={props.onEditClick}
              tooltip="Xem chi tiết"
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default DetailRows;
