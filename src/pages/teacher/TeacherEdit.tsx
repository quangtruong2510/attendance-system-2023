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
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CustomInput } from "../../components/common/FormInput/InputField";
import { Teacher } from "../../models/teacher";
import { AppDispatch, useSelector } from "../../store/configstore";
import { initTeacher } from "../../store/teachers/initialize";
import { addTeacher, updateTeacher } from "../../store/teachers/operation";
import { clearValidationErrors } from "../../store/teachers/slice";

interface Props {
  isNew: boolean;
  isOpen: boolean;
  selectedTeacher?: Teacher | null;
  handleClose: () => void;
  onClickEdit: (isSuccess: boolean) => void;
}

const TeacherEdit: React.FC<Props> = ({
  isNew,
  isOpen,
  selectedTeacher,
  handleClose,
  onClickEdit,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const validationErrors = useSelector(
    (state) => state.teacher.validationErrors
  );

  const [teacher, setTeacher] = useState<Teacher>({
    homeroomClass: "",
    name: "",
    address: "",
    phone: "",
  });

  const handleInputChange =
    (property: keyof Teacher) =>
    (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
      setTeacher((prev) => ({ ...prev, [property]: event.target.value }));
    };
  const handleAddTeacher = async () => {
    if (isNew) {
      dispatch(addTeacher(teacher))
        .unwrap()
        .then(() => {
          handleClose();
          onClickEdit(true);
        })
        .catch(() => {
          onClickEdit(false);
        });
    } else {
      dispatch(updateTeacher(teacher))
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
      setTeacher(selectedTeacher || initTeacher);
    } else {
      setTeacher(initTeacher);
    }
  }, [selectedTeacher]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle color={"rgb(0, 130, 146)"}>
        {`${isNew ? "Thêm mới " : "Chỉnh sửa"} giáo viên`}
      </DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            id="name"
            label="Tên giáo viên"
            type="text"
            fullWidth={true}
            size="small"
            style={{ width: "300px" }}
            value={teacher.name}
            onChange={handleInputChange("name")}
            messageError={
              validationErrors && validationErrors.name
                ? validationErrors.name
                : ""
            }
          />
        </FormControl>
        <Stack flexDirection={"row"} gap={2} paddingTop={2}>
          <CustomInput
            id="phone"
            label="Số điện thoại"
            type="phone"
            fullWidth={true}
            size="small"
            value={teacher.phone}
            onChange={handleInputChange("phone")}
            messageError={
              validationErrors && validationErrors.phone
                ? validationErrors.phone
                : ""
            }
          />
        </Stack>
        <FormControl fullWidth style={{ margin: "20px 0px" }}>
          <CustomInput
            id="address"
            label="Địa chỉ"
            type="text"
            fullWidth={true}
            size="small"
            value={teacher.address}
            onChange={handleInputChange("address")}
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
          Đóng
        </Button>
        <Button variant="contained" size="medium" onClick={handleAddTeacher}>
          {isNew ? "Thêm mới " : "Cập nhật"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TeacherEdit;
