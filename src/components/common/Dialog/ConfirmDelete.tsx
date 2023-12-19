import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  title: string;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  message,
  title,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle fontSize={18} fontWeight={600}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            height: "30px",
            border: "none !important",
            // fontWeight: "bold",
            borderColor: "none",
            color: "#000000",
            boxShadow:
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
          }}
          variant="outlined"
          onClick={onClose}
          color="primary"
        >
          Hủy
        </Button>
        <Button
          sx={{ height: "30px" }}
          variant="contained"
          onClick={onConfirm}
          color="error"
          autoFocus
        >
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
