import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import DialogHead from "../../components/common/Dialog/DialogHead";
import {
  DateTimeInputField,
  SelectInputField,
  TextInputField,
} from "../../components/common/FormInput/InputField";
import { genders } from "../../constant/constant";
import Payload from "../../models/Utils";
import { Student } from "../../models/student";
import { AppDispatch } from "../../store/configstore";
import { addStudent, updateStudent } from "../../store/students/operation";

interface Props {
  isNew: boolean;
  isOpen: boolean;
  student: Student;
  handleClose: () => void;
}

// interface GroupFilterSearch {
//   class: string;
//   grade: string;
//   name: string;
//   phone: string;
// }

const EditStudent: React.FC<Props> = ({
  isNew,
  isOpen,
  student,
  handleClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const [editedStudent, setEditedStudent] = useState(student);

  const setValue = (payload: Payload) => {
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [payload.key]: payload.key,
    }));
  };

  const handleEditStudent = () => {
    if (!isNew) {
      dispatch(updateStudent({ id: editedStudent.id, payload: editedStudent }));
      return;
    }
    dispatch(addStudent({ student: editedStudent }));
  };
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogHead onClose={handleClose} isNew={isNew}></DialogHead>
      <DialogContent style={{ height: "fit-content", width: "auto" }}>
        <TextInputField
          id={"mssv"}
          value={editedStudent.studentCode}
          label={"Mã Sinh Viên*"}
          name={"studentCode"}
          onChange={setValue}
        />
        <TextInputField
          id={"name"}
          value={editedStudent.name}
          label={"Họ Tên*"}
          name={"name"}
          onChange={setValue}
        />
        <SelectInputField
          id={"gender"}
          options={genders}
          value={editedStudent.gender}
          label={"Giới tính*"}
          name={"gender"}
          onChange={setValue}
        ></SelectInputField>
        <DateTimeInputField
          id={"birth-day"}
          value={editedStudent.dateOfBirth}
          label={"Ngày Sinh*"}
          name={"dateOfBirth"}
          onChange={setValue}
        ></DateTimeInputField>
        <TextInputField
          id={"address"}
          value={editedStudent.address}
          label={"Địa chỉ*"}
          name={"address"}
          onChange={setValue}
        />
        <TextInputField
          id={"phone-number"}
          value={editedStudent.phone}
          label={"Số điện thoại*"}
          name={"phone"}
          onChange={setValue}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button variant="contained" size="medium" onClick={handleEditStudent}>
          {isNew ? "Create" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;
