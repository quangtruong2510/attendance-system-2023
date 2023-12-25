import { Cached, CloudUpload } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  handleExport: () => void;
  reload: () => void;
}
const TableTitle: React.FC<Props> = ({ title, handleExport, reload }) => {
  return (
    <TitleTable>
      <Typography
        sx={{ margin: "0" }}
        variant="h6"
        style={{ color: "rgb(227 113 12)" }}
      >
        {title}
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          style={{
            height: "35px",
            minWidth: "80px",
            textTransform: "none",
            backgroundColor: "#117957",
          }}
          size="small"
          component="label"
          variant="contained"
          startIcon={<CloudUpload />}
          onClick={handleExport}
        >
          Xuất Excel
        </Button>
        <Button
          style={{
            height: "35px",
            minWidth: "80px",
            textTransform: "none",
          }}
          size="small"
          component="label"
          variant="contained"
          startIcon={<Cached />}
          onClick={reload}
        >
          Làm mới
        </Button>
      </Stack>
    </TitleTable>
  );
};

const TitleTable = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 10px;
`;
export default TableTitle;
