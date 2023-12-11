import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../../components/common/FormInput/InputField";
import { AttendanceStudent } from "../../../models/attendance";
import { AppDispatch, useSelector } from "../../../store/configstore";

interface Props {
  isOpen: boolean;
  selectedAttendanceStudent: AttendanceStudent | null;
  handleClose: () => void;
}

const AttendanceStudentEdit: React.FC<Props> = ({
  isOpen,
  handleClose,
  selectedAttendanceStudent,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [attendanceStudent, setAttendanceStudent] =
    useState<AttendanceStudent | null>(null);

  useEffect(() => {
    setAttendanceStudent(selectedAttendanceStudent);
  }, [selectedAttendanceStudent]);

  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleEditStudent = () => {
    // if (!isNew) {
    //   dispatch(updateStudent({ id: editedStudent.id, payload: editedStudent }));
    //   return;
    // }
    // dispatch(addStudent({ student: editedStudent }));
  };

  const handleChangeData =
    (property: keyof AttendanceStudent) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
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
      <DialogTitle color={"rgb(65, 84, 241)"}>Chỉnh sửa thông tin</DialogTitle>
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
        <div>
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} color="primary" />}
            label="Có mặt"
          />
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} color="secondary" />}
            label="Vắng không phép"
          />
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} color="default" />}
            label="Vắng có phép"
          />
          <FormControlLabel
            control={<Checkbox checked={isChecked} onChange={handleChange} color="default" />}
            label="Đi trể"
          />
        </div>
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
        <Button variant="contained" size="medium" onClick={handleEditStudent}>
          Cập nhật
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendanceStudentEdit;
