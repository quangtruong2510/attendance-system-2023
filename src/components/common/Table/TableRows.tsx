import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import EditIconButton from "../../../components/common/Button/EditIconButton";

interface Props {
  rows: any[];
  headers: Column[];
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  onAttendanceAllClassClick?: (id: number) => void;
}

import { StatusAttendanceType } from "../../../Type/Utils";
import { RolesList, StatusAttendanceTypeList } from "../../../constant/constant";
import { Column } from "../../../constant/headerTable";
import AttendanceAll from "../Button/AttendanceAllCLass";
import DeleteButton from "../Button/DeleteButton";
import ConfirmDeleteDialog from "../Dialog/ConfirmDelete";
import { Roles } from "../../../utils/role";

const TableRows: React.FC<Props> = ({
  rows,
  headers,
  onEditClick,
  onDeleteClick,
  onAttendanceAllClassClick
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);

  const handleDeleteClick = (id: number) => {
    setSelectedRow(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteClick?.(selectedRow);
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow key={index} hover role="checkbox" tabIndex={-1}>
          {headers
            .filter((column) => column.id !== "action")
            .map((column) => {
              let value = row[column.id];
              if (column.id === "status") {
                const type: StatusAttendanceType =
                  value as StatusAttendanceType;
                value = StatusAttendanceTypeList[type];
              }
              if (column.id == "id") {
                value = index + 1;
              }
              if (column.id == "gender") {

                if (value == 1) {
                  value = "Nam"
                } else {
                  value = "Nữ"
                }
              }
              if (column.id == "role") {
                const role: Roles = value as Roles
                value = RolesList[role];
              }
              if (value == "" || value == null) value = "-"
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
          {(onEditClick || onDeleteClick || onAttendanceAllClassClick) && (
            <TableCell align="center" style={{ gap: "30px" }}>
              {onEditClick && (
                <EditIconButton
                  id={row.id}
                  onIconClick={() => onEditClick(row.id)}
                  tooltip="Xem chi tiết"
                />
              )}
              {onDeleteClick && (
                <DeleteButton
                  id={row.id}
                  onIconClick={() => handleDeleteClick(row.id)}
                />
              )}
              {onAttendanceAllClassClick && (
                <AttendanceAll
                  id={row.id}
                  onIconClick={() => onAttendanceAllClassClick(row.id)}
                />
              )}
            </TableCell>
          )}
        </TableRow>
      ))}
      {onDeleteClick && (
        <ConfirmDeleteDialog
          open={isDeleteDialogOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          message="Bạn có chắc chắn muốn xóa dữ liệu này không?"
          title="Xác nhận xóa dữ liệu"
        />
      )}
    </TableBody>
  );
};

export default TableRows;
