import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Box, Divider, ListItemButton, Typography } from "@mui/material";
import List from "@mui/material/List";
import { styled } from "@mui/system";
import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import navigatorList from "../../../constant/navigator";
import NavigatorItemModel from "../../../models/navigator";
import NavigatorItem from "./NavigatorItem";

const NavigatorLayout = styled("div")(() => ({
  backgroundColor: "#FFFFFF",
  boxShadow:
    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "6px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f1f1f1",
  },
}));

const Navigation: React.FC = () => {
  const location = useLocation();
  return (
    <NavigatorLayout>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        pt="20px"
      >
        <img src="./src/assets/logo.svg" alt="My Icon" />
        <p>Điểm Danh Thông Minh</p>
      </Box>
      <List
        sx={{ width: "100%", maxWidth: 280 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <Divider></Divider>
        <Link className="no-underline" to={"/dashboard"}>
          <ListItemButton sx={{ pl: 2 }}>
            <HomeOutlinedIcon />
            <Typography
              className={`no-underline ${location.pathname === "/dashboard" && "active-navigation"
                }`}
              sx={{
                ml: 1,
                textDecoration: "none !important",
                fontWeight: "500",
                mt: 1,
                padding: 0,
              }}
              gutterBottom
            >
              Trang chủ
            </Typography>
          </ListItemButton>
        </Link>
        {navigatorList.map(
          (navigatorItem: NavigatorItemModel, index: number) => {
            return (
              <div key={index}>
                <Divider></Divider>
                <NavigatorItem groupItem={navigatorItem}></NavigatorItem>
              </div>
            );
          }
        )}
      </List>
    </NavigatorLayout>
  );
};

export default Navigation;
