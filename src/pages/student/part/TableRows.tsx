import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import EditIconButton from "../../../components/common/Button/EditIconButton";
import DeleteButton from "../../../components/common/Button/DeleteButton";
import { Student } from "../../../models/student";

interface Props {
  rows: Student[];
  headers: Column[];
  onEditClick: (id: number) => void;
  onDeleteClick: (id: number) => void;
}

import { Column } from "../../../constant/headerTable";
import ConfirmDeleteDialog from "../../../components/common/Dialog/ConfirmDelete";

const TableRows: React.FC<Props> = ({
  rows,
  headers,
  onEditClick,
  onDeleteClick,
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(0);

  const handleDeleteClick = (id: number) => {
    setSelectedStudent(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    onDeleteClick(selectedStudent);
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
            .map((column, key) => {
              let value = row[column.id];
              if (column.id == "id") {
                value = index + 1
              }
              return (
                <TableCell
                  key={key}
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
            <EditIconButton id={row.id ? row.id : 0} onIconClick={onEditClick} />
            <DeleteButton id={row.id ? row.id : 0} onIconClick={handleDeleteClick} />
          </TableCell>
        </TableRow>
      ))}

      <ConfirmDeleteDialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        message="Bạn có chắc chắn muốn xóa học sinh này không?"
        title="Xác nhận xóa học sinh"
      />
    </TableBody>
  );
};

export default TableRows;
