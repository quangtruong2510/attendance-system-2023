import { Logout, PersonAdd } from "@mui/icons-material";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import {
  Box,
  Divider,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "../../../store/configstore";
import { Navigate, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const userName = useSelector((state) => state.authentication.name);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log("logged out");

    navigate(`login`);
  }
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#4D5966",
        height: "43px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <AppsOutlinedIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ width: "400px" }}>
          Attendance System
        </Typography>

        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Typography sx={{ minWidth: 100 }}>Xin chào {userName}</Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Hồ sơ
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Thêm mới account
            </MenuItem>
            {/* <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem> */}
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Đăng xuất
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
