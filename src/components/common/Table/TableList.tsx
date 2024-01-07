import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import React from "react";
import { Column } from "../../../constant/headerTable";
import { useSelector } from "../../../store/configstore";
import TableHeaders from "./TableHeader";
import TableRows from "./TableRows";
import TableRowsLoader from "./TableRowsLoader";
import { Box, TableCell, TableRow, Typography } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";


interface Props {
  headers: Column[];
  isLoading: boolean;
  currentData: any;
  onEditClick?: (id: number) => void;
  onDeleteClick?: (id: number) => void;
  onAttendanceAllClassClick?: (id: number) => void;
}

const TableList: React.FC<Props> = ({
  headers,
  isLoading,
  currentData,
  onEditClick,
  onDeleteClick,
  onAttendanceAllClassClick,
}) => {
  const { current, perPage } = useSelector((state) => state.pagination);

  const NoDataFound = () => (
    <TableRow>
      <TableCell colSpan={12}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <ErrorOutlineIcon fontSize="large" color="disabled" />
          <Typography variant="subtitle1" color="textSecondary">
            No Data found
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );
  return (
    <TableContainer sx={{ width: "100%", maxHeight: "400px" }}>
      <Table className="border-collapse" stickyHeader aria-label="sticky table">
        <TableHeaders headers={headers} />
        {isLoading ? (
          <TableRowsLoader rowsNum={10} numColumns={headers.length - 1} />
        ) : currentData.length === 0 ? (
          <NoDataFound></NoDataFound>
        ) : (
          <TableRows
            rows={currentData.slice(
              current * perPage,
              current * perPage + perPage
            )}
            headers={headers}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onAttendanceAllClassClick={onAttendanceAllClassClick}
          />
        )}
      </Table>
    </TableContainer>
  );
};

export default TableList;