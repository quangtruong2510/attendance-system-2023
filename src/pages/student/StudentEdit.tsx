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
  Stack,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Gender } from "../../Type/Utils";
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import { OptionSelect } from "../../models/Utils";
import { Student } from "../../models/student";
import { AppDispatch, useSelector } from "../../store/configstore";
import { initStudent } from "../../store/students/initialize";
import { addStudent, updateStudent } from "../../store/students/operation";
import { clearValidationErrors } from "../../store/students/slice";

interface Props {
  isNew: boolean;
  isOpen: boolean;
  selectedStudent?: Student | null;
  handleClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

const EditStudent: React.FC<Props> = ({
  isNew,
  isOpen,
  selectedStudent,
  handleClose,
  onClickEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [student, setStudent] = useState<Student>(initStudent);
  const validationErrors = useSelector(
    (state) => state.students.validationErrors
  );

  const classes: OptionSelect[] = useSelector(
    (state) => state.initial.classSelectionList
  );

  const handleInputChange =
    (property: keyof Student) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement> | any) => {
      setStudent((prev) => ({ ...prev, [property]: event.target.value }));
    };

  const handleEditStudent = async () => {
    if (isNew) {
      dispatch(addStudent(student))
        .unwrap()
        .then(() => {
          handleClose();
          onClickEdit(true);
        })
        .catch(() => {
          onClickEdit(false);
        });
    } else {
      dispatch(updateStudent(student))
        .unwrap()
        .then(() => {
          handleClose();
          onClickEdit(true);
        })
        .catch(() => {
          onClickEdit(false);
        });
    }
  };

  useEffect(() => {
    dispatch(clearValidationErrors());
    if (!isNew) {
      setStudent(selectedStudent || initStudent);
    } else {
      setStudent(initStudent);
    }
  }, [selectedStudent, dispatch]);

  console.log("selectedStudent", selectedStudent);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>
        {`${isNew ? "Thêm mới " : "Chỉnh sửa thông tin"} học sinh`}
      </DialogTitle>
      <DialogContent
        style={{ height: "fit-content", width: "auto", maxWidth: "470px" }}
      >
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            id={"name"}
            value={student.name}
            label={"Họ và Tên"}
            onChange={handleInputChange("name")}
            messageError={
              validationErrors && validationErrors.name
                ? validationErrors.name
                : ""
            }
          />
        </FormControl>
        <Stack
          flexDirection={"row"}
          gap={2}
          marginTop={1}
          alignItems={"center"}
        >
          <FormControl
            error={
              validationErrors && validationErrors.dateOfBirth ? true : false
            }
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={student?.gender}
              onChange={handleInputChange("gender")}
            >
              <FormControlLabel
                value={Gender.MALE}
                control={<Radio size="small" />}
                label="Nam"
              />
              <FormControlLabel
                value={Gender.FEMALE}
                control={<Radio size="small" />}
                label="Nữ"
              />
            </RadioGroup>
          </FormControl>
        </Stack>

        <Stack
          flexDirection={"row"}
          gap={2}
          marginTop={1}
          style={{ maxWidth: "100%" }}
        >
          <SelectDropdown
            id={"class"}
            minWidth={120}
            label="Lớp"
            options={classes}
            value={student.classId}
            onChange={handleInputChange("classId")}
            errorMessage={
              validationErrors && validationErrors.classId
                ? validationErrors.classId
                : ""
            }
          />
          <TextField
            fullWidth={true}
            size="small"
            name="dateOfBirth"
            label="Ngày sinh"
            value={student.dateOfBirth}
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            onChange={handleInputChange("dateOfBirth")}
            error={
              validationErrors && validationErrors.dateOfBirth ? true : false
            }
            helperText={
              validationErrors && validationErrors.dateOfBirth
                ? validationErrors.dateOfBirth
                : ""
            }
            // defaultValue={"2000-10-25"}
          />
        </Stack>
        <FormControl fullWidth style={{ margin: "20px 0px" }}>
          <CustomInput
            id="phone"
            label="Số điện thoại"
            type="phone"
            fullWidth={true}
            size="small"
            placeholder="xxx-xxx-xxxx"
            value={student.phone}
            onChange={handleInputChange("phone")}
            messageError={
              validationErrors && validationErrors.phone
                ? validationErrors.phone
                : ""
            }
          />
        </FormControl>

        <FormControl fullWidth>
          <CustomInput
            label="Địa chỉ"
            type="text"
            fullWidth={true}
            size="small"
            value={student.address}
            onChange={handleInputChange("address")}
            style={{ width: "100%" }}
            messageError={
              validationErrors && validationErrors.address
                ? validationErrors.address
                : ""
            }
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
          Hủy
        </Button>
        <Button variant="contained" size="medium" onClick={handleEditStudent}>
          {isNew ? "Thêm mới" : "Cập nhật"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;
