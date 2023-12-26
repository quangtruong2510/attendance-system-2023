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
  SelectChangeEvent,
  Stack
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { StatusAttendanceType } from "../../../Type/Utils";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import { AttendanceStudent } from "../../../models/attendance";
import { updateAttendanceStudent } from "../../../store/attendances/operation";
import { AppDispatch } from "../../../store/configstore";

interface Props {
  isOpen: boolean;
  selectedAttendanceStudent: AttendanceStudent | null;
  handleClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

const AttendanceStudentEdit: React.FC<Props> = ({
  isOpen,
  handleClose,
  selectedAttendanceStudent,
  onClickEdit
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [attendanceStudent, setAttendanceStudent] = useState<AttendanceStudent | null>(selectedAttendanceStudent);

  useEffect(() => {
    setAttendanceStudent(selectedAttendanceStudent);
  }, [selectedAttendanceStudent, dispatch, attendanceStudent]);

  const handleEditAttendanceStudent = () => {
    dispatch(updateAttendanceStudent(attendanceStudent)).unwrap()
      .then(() => {
        handleClose();
        onClickEdit(true);
      })
      .catch(() => {
        onClickEdit(false);
      });
  };
  const handleChangeData =
    (property: keyof AttendanceStudent) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement> | any) => {
        setAttendanceStudent((prev) => {
          if (!prev) {
            return { [property]: event.target.value } as AttendanceStudent;
          }

          return {
            ...prev,
            [property]: event.target.value,
          };
        });
      };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>Chỉnh sửa thông tin</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            label="Họ và tên"
            type="text"
            fullWidth={true}
            size="small"
            isDisable={true}
            value={attendanceStudent?.name}
          />
        </FormControl>
        <Stack flexDirection={"row"} gap={2} paddingTop={2}>
          <FormControl fullWidth style={{ margin: "10px 0px" }}>
            <CustomInput
              label="Check in"
              type="text"
              fullWidth={true}
              size="medium"
              value={attendanceStudent?.timeCheckIn}
              isDisable={true}
            />
          </FormControl>

          <FormControl fullWidth style={{ margin: "10px 0px" }}>
            <CustomInput
              label="Check out"
              type="text"
              fullWidth={true}
              size="medium"
              isDisable={true}
              value={attendanceStudent?.timeCheckOut}
            />
          </FormControl>
        </Stack>
        <RadioGroup
          aria-label="attendance"
          name="attendance"
          value={() => { attendanceStudent?.status }}
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
            value={attendanceStudent?.note}
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
          onClick={handleEditAttendanceStudent}
        >
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceStudentEdit;
