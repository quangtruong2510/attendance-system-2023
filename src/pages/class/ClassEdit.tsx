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
import { CustomInput } from "../../components/common/FormInput/InputField";
import SelectDropdown from "../../components/common/Select/SelectDropdown";
import { OptionSelect } from "../../models/Utils";
import { AppDispatch, useSelector } from "../../store/configstore";
import { useDispatch } from "react-redux";
import { addClass, fetchClasses } from "../../store/class/operation";
import { clearValidationErrors } from "../../store/teachers/slice";

interface AddClassDialogProps {
  open: boolean;
  onClose: () => void;
}

interface NewClass {
  gradeId: string;
  className: string;
  teacherId: string;
}

const ClassEditDialog: React.FC<AddClassDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [newClass, setNewClass] = useState<NewClass>({
    gradeId: "",
    className: "",
    teacherId: "",
  });

  const grades: OptionSelect[] = useSelector(state => state.initial.gradeList)
  const teachers: OptionSelect[] = useSelector(state => state.initial.unAssignedTeachers)
  const validationErrors = useSelector(state => state.class.validationErrors);

  const handleChangeFilter =
    (property: keyof NewClass) =>
      (event: SelectChangeEvent<any> | ChangeEvent<HTMLInputElement>) => {
        setNewClass((prev) => ({ ...prev, [property]: event.target.value }));
      };

  const handleAddClass = () => {
    dispatch(addClass(newClass)).unwrap()
      .then(() => {
        setNewClass({
          gradeId: "",
          className: "",
          teacherId: "",
        })
        onClose();
        dispatch(fetchClasses());
      })
      .catch(() => {
      })
  };

  useEffect(() => {
    dispatch(clearValidationErrors())
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle color={"rgb(65, 84, 241)"}>Thêm mới lớp học</DialogTitle>
      <DialogContent>
        <FormControl fullWidth style={{ margin: "5px 0px" }}>
          <CustomInput
            label="Tên lớp"
            type="text"
            fullWidth={true}
            size="small"
            value={newClass.className}
            onChange={handleChangeFilter("className")}
            messageError={validationErrors && validationErrors.className ? validationErrors.className : ''}
          />
        </FormControl>
        <Stack flexDirection={"row"} gap={2} paddingTop={2} marginTop={1}>
          <SelectDropdown
            id={"grade"}
            label="Khối"
            options={grades}
            value={newClass.gradeId}
            onChange={handleChangeFilter("gradeId")}
          />

          <SelectDropdown
            id={"teacher"}
            label="GVCN"
            options={teachers}
            value={newClass.teacherId}
            onChange={handleChangeFilter("teacherId")}
            width={200}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          size="medium"
          color="error"
          onClick={onClose}
        >
          Đóng
        </Button>
        <Button variant="contained" size="medium" onClick={handleAddClass}>
          THêm mới
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClassEditDialog;
