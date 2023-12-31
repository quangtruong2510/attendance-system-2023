import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  SelectChangeEvent
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { StatusAttendanceType } from "../../../Type/Utils";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import { AppDispatch } from "../../../store/configstore";
import { updateAttendanceAllClass } from "../../../store/attendances/operation";

interface Props {
  isOpen: boolean;
  classId: number;
  handleClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

interface AttendanceAll {
  classId: number;
  status: number;
  note: string
}

const AttendanceAllClass: React.FC<Props> = ({
  isOpen,
  handleClose,
  classId,
  onClickEdit
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [attendanceAll, setAttendanceAll] = useState<AttendanceAll | null>({
    classId: classId,
    status: 1,
    note: ""
  });

  const handleEditAttendanceAll = () => {
    dispatch(updateAttendanceAllClass(attendanceAll)).unwrap()
      .then(() => {
        handleClose();
        onClickEdit(true);
      })
      .catch(() => {
        onClickEdit(false);
      });
  };
  const handleChangeData =
    (property: keyof AttendanceAll) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement> | any) => {
        setAttendanceAll((prev) => {
          if (!prev) {
            return { [property]: event.target.value } as AttendanceAll;
          }

          return {
            ...prev,
            [property]: event.target.value,
          };
        });
      };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>Duyệt tất cả</DialogTitle>
      <DialogContent>
        <RadioGroup
          aria-label="attendance"
          name="attendance"
          value={attendanceAll?.status}
          onChange={handleChangeData("status")}
          row
        >
          <FormControlLabel
            value={StatusAttendanceType.PRESENT}
            control={<Radio />}
            label="Có mặt"
          />
          <FormControlLabel
            value={StatusAttendanceType.ABSENCE_WITHOUT_PERMISSION}
            control={<Radio />}
            label="Vắng(KP)"
          />
          <FormControlLabel
            value={StatusAttendanceType.ABSENCE_WITH_PERMISSION}
            control={<Radio />}
            label="Vắng(CP)"
          />
          <FormControlLabel
            value={StatusAttendanceType.LATE}
            control={<Radio />}
            label="Đi trễ"
          />
        </RadioGroup>
        <FormControl fullWidth style={{ margin: "10px 0px" }}>
          <CustomInput
            id="outlined-multiline-flexible"
            label="Ghi chú"
            isMultiline={true}
            size="medium"
            maxRows={3}
            rows={2}
            fullWidth={true}
            value={attendanceAll?.note}
            onChange={handleChangeData("note")}
          />
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={handleClose}
        >
          Đóng
        </Button>
        <Button
          variant="contained"
          size="medium"
          onClick={handleEditAttendanceAll}
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceAllClass;
