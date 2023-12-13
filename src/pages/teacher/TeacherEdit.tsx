import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { CustomInput } from "../../components/common/FormInput/InputField";
import { OptionSelect } from "../../models/Utils";
import { Teacher } from "../../models/teacher";
import { addTeacher } from "../../store/teachers/operation";
import { AppDispatch } from "../../store/configstore";
import { useDispatch } from "react-redux";

interface Props {
  isNew: boolean
  isOpen: boolean
  selectedTeacher?: Teacher | null
  handleClose: () => void;
}

const TeacherEdit: React.FC<Props> = ({ isNew, isOpen, selectedTeacher, handleClose }) => {

  const dispatch = useDispatch<AppDispatch>();
  const teacher: Teacher = selectedTeacher || {
    homeroomClass: "",
    name: "",
    address: "",
    phone: "",
  };
  const [newTeacher, setnewTeacher] = useState<Teacher>(teacher);

  const handleChangeFilter =
    (property: keyof Teacher) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        setnewTeacher((prev) => ({ ...prev, [property]: event.target.value }));
      };

  const handleAddTeacher = () => {
    if (isNew) {
      dispatch(addTeacher(newTeacher))
    }

    handleClose();
  };

  const grades: OptionSelect[] = [
    { value: 1, label: "6" },
    { value: 2, label: "7" },
    { value: 3, label: "8" },
    { value: 4, label: "9" },
  ];

  const teachers: OptionSelect[] = [
    { value: 1, label: "Nguyễn Văn A" },
    { value: 2, label: "Nguyễn Văn B" },
    { value: 3, label: "Nguyễn Văn C" },
    { value: 4, label: "Nguyễn Văn D" },
  ];

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(65, 84, 241)"}>Thêm mới giáo viên</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            label="Tên giáo viên"
            type="text"
            fullWidth={true}
            size="small"
            style={{ width: "300px" }}
            value={newTeacher.name}
            onChange={handleChangeFilter("name")}
          />
        </FormControl>
        <Stack flexDirection={"row"} gap={2} paddingTop={2}>
          <CustomInput
            id="phone"
            label="Số điện thoại"
            type="phone"
            fullWidth={true}
            size="small"
            value={newTeacher.phone}
            onChange={handleChangeFilter("phone")}
          />
        </Stack>
        <FormControl fullWidth style={{ margin: "20px 0px" }}>
          <CustomInput
            label="Địa chỉ"
            type="text"
            fullWidth={true}
            size="small"
            value={newTeacher.address}
            onChange={handleChangeFilter("address")}
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
        <Button variant="contained" size="medium" onClick={handleAddTeacher}>
          THêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherEdit;
