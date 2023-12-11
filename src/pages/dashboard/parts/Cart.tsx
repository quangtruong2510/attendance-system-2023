import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Card, Stack } from "@mui/material";
import React from "react";

interface Props {
  value: string;
  description: string;
  icon: any;
}

const CartReport: React.FC<Props> = ({ icon, value, description }) => {
  return (
    <Card
      sx={{
        backgroundColor: "white",
        minWidth: "270px",
        height: "70px",
        display: "inline-block",
        margin: "10px 20px 0px 0px",
        width: "calc((100% - 60px) / 3)",
        flexGrow: 1,
        textAlign: "center",
        border: "0px solid gray",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px 0px",
      }}
    >
      <CardContent style={{ padding: "5px" }}>
        <Stack alignItems={"center"} direction={"row"} gap={2.1}>
          {icon}
          <Stack>
            <Typography variant="h6" style={{ color: "black" }} align="left">
              {value}
            </Typography>
            <Typography variant="body1" style={{ color: "gray" }}>
              {description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CartReport;
