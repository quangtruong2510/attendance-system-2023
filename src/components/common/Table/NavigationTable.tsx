import TablePagination from "@mui/material/TablePagination";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  initializeState,
  setCurrentPage,
  setPerPage,
} from "../../../store/common/pagination";
import { useSelector } from "../../../store/configstore";
import TablePaginationActions from "./TablePaginationActions";
import { Stack } from "@mui/material";

interface Props {
  count: number;
}

const NavigationTable: React.FC<Props> = ({ count }) => {
  const dispatch = useDispatch();
  const { current, perPage } = useSelector((state) => state.pagination);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    dispatch(setCurrentPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setPerPage(parseInt(event.target.value, 10)));
  };

  useEffect(() => {
    dispatch(initializeState());
  }, []);

  return (
    <Stack>
      <></>
      <TablePagination
        sx={{
          width: "100%",
          display: "block",
          padding: "0px !important",
          borderBottom: "none",
        }}
        rowsPerPageOptions={[5, 10, 25, { label: "Tất cả", value: count }]}
        colSpan={3}
        count={count}
        rowsPerPage={perPage}
        page={current}
        SelectProps={{
          inputProps: {
            "aria-label": "rows per page",
          },
          native: true,
        }}
        labelRowsPerPage=""
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trên ${count !== -1 ? count : `nhiều`}`
        }
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Stack>
  );
};

export default NavigationTable;
