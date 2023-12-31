import { AddCircleOutline } from "@mui/icons-material";
import { Breadcrumbs, Button, Link, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  breadcrumbs: any;
  haveAddButton: boolean;
  handleAddButton?: () => void;
}
const BreadcrumbsComponent: React.FC<Props> = ({
  breadcrumbs,
  haveAddButton,
  handleAddButton,
}) => {
  return (
    <Stack flexDirection={"row"} justifyContent={"space-between"}>
      <Breadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((item: any, index: number) => {
          const isLastItem = index === breadcrumbs.length - 1;

          return isLastItem ? (
            <Typography key={index} color="textPrimary">
              {item.label}
            </Typography>
          ) : (
            <Link underline="hover" color="#008292" href="/attendanceToday">
              <Typography variant="h5" style={{ color: "#008292" }}>
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Breadcrumbs>
      {haveAddButton && (
        <Button
          style={{
            textTransform: "none",
            height: "40px",
          }}
          component="label"
          variant="contained"
          onClick={handleAddButton}
          startIcon={<AddCircleOutline />}
        >
          Thêm mới
        </Button>
      )}
    </Stack>
  );
};

export default BreadcrumbsComponent;
